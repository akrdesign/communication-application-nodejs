import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header";
import ModalComponent from "../../components/ModalComponent";

import styles from "./styles.module.scss";
import { allUsers, deleteUserAsync } from "../../redux/users/usersSlice";
import { selectLoggedInUser } from "../../redux/auth/authSlice";

const ModalBody = () => {
  return <h4>Are you sure?</h4>;
};

const ManageUsers = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const users = useSelector(allUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const currentUser = users.find((u) => u.id === loggedInUser.id);

  const handleDelete = () => {
    dispatch(deleteUserAsync(selectedUser));
    setSelectedUser(null);
  };

  const openModalHandler = (id) => {
    setSelectedUser(id);
  };

  const closeModalHandler = () => {
    setSelectedUser(null);
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>User Email ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.email}>
                  <td>{user.fullname}</td>
                  <td className={styles.email}>{user.email}</td>
                  <td>
                    <span className={styles.button}>
                      <Link to={`/edit-user/${user.id}`}>Edit</Link>
                    </span>
                    {currentUser.email !== user.email && (
                      <>
                        <span> | </span>
                        <span
                          className={styles.button}
                          onClick={() => openModalHandler(user.id)}
                        >
                          Delete
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <ModalComponent
          confirmHandler={handleDelete}
          handleClose={closeModalHandler}
          heading="Confirm user deletion?"
          ModalBody={() => <ModalBody />}
          footerVisible={true}
        />
      )}
    </>
  );
};

export default ManageUsers;

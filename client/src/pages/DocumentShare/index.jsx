import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";

import Header from "../../components/Header";
import Button from "../../components/common/Button";
import ModalComponent from "../../components/ModalComponent";

import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/users/usersSlice";
import {
  addShareUpload,
  createSharedUploadAsync,
  deleteSharedUploadAsync,
  fetchAllUploads,
  fetchSharedUploadsAsync,
  getSharedUploads,
} from "../../redux/uploads/uploadsSlice";
import { selectLoggedInUser } from "../../redux/auth/authSlice";

const ModalBody = () => {
  return <h4>Are you sure?</h4>;
};

const DocumentShare = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(allUsers);
  const loggedInUser = useSelector(selectLoggedInUser);
  const sharedUploads = useSelector(getSharedUploads);

  const [selectedUser, setSelectedUser] = useState("");
  const uploads = useSelector(fetchAllUploads);
  const upload = uploads.find((u) => u.id === id);
  const [removedUser, setRemovedUser] = useState(null);
  const [errors, setErrors] = useState({});

  
  const currentSharedUploads = sharedUploads.filter((u) => u.items?.id === id)

  useEffect(() => {
    if (!upload) {
      navigate("/*");
    }
  }, [upload, navigate]);

  useEffect(() => {
    dispatch(fetchSharedUploadsAsync())
  }, [dispatch])

  const removeUserHandler = () => {
    const updatedUploads = uploads.map((u) => {
      if (u.id === id) {
        const updatedUpload = { ...u };
        updatedUpload.shared = updatedUpload?.shared.filter(
          (share) => share.id !== removedUser
        );
        return updatedUpload;
      }
      return u;
    });

    dispatch(deleteSharedUploadAsync({id: removedUser}));
    setRemovedUser(null);
  };

  const openModalHandler = (id) => {
    setRemovedUser(id);
  };

  const closeModalHandler = () => {
    setRemovedUser(null);
  };

  const validation = () => {
    const error = {};

    if (selectedUser.trim() === "") {
      error.selectedUser = "Please select at least one user!!";
    }

    setErrors(error);
    return error;
  };

  const addShareHandler = () => {
    const formErrors = validation();

    if (Object.keys(formErrors).length === 0) {
      const [selectedId, selectedFullName, selectedEmail] = selectedUser.split(",");

      const u = {
        items: upload,
        user: selectedId,
        username: selectedFullName,
        sharedBy: loggedInUser.email,
        sharedTo: selectedEmail,
      };

      dispatch(createSharedUploadAsync(u));
      setSelectedUser("");
      setErrors({});
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Upload sharing: {upload.description}</h2>
        {currentSharedUploads.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Shared user</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentSharedUploads.map((share) => {
                return (
                  <tr key={share.id}>
                    <td>{share.username}</td>
                    <td>
                      <span
                        className={styles.button}
                        onClick={() => openModalHandler(share.id)}
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h5 className="mt-3">This file is not shared with any user</h5>
        )}
        <h2 className="mt-5">Add Sharing</h2>
        <div className={`${styles.add_share} mt-3`}>
          <h2>Choose user : </h2>
          <div className={styles.dropdown}>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setSelectedUser(e.target.value)}
              value={selectedUser}
              className="text-capitalize"
            >
              <option value="">Select User</option>
              {users.map((user) => {
                // Filter out loggedInUser from dropdown options
                if (user.email !== loggedInUser.email) {
                  return (
                    <option
                      key={user.id}
                      value={`${user.id},${user.fullname},${user.email}`}
                      className="text-capitalize"
                    >
                      {user.fullname}
                    </option>
                  );
                }
                return null;
              })}
            </Form.Select>
            {errors && <p style={{ color: "red" }}>{errors.selectedUser}</p>}
          </div>
          <Button onClick={addShareHandler}>Add share</Button>
        </div>
      </div>
      {removedUser && (
        <ModalComponent
          confirmHandler={removeUserHandler}
          handleClose={closeModalHandler}
          heading="Confirm user deletion?"
          ModalBody={() => <ModalBody />}
          footerVisible={true}
        />
      )}
    </>
  );
};

export default DocumentShare;

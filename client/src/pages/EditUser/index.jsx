import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/Header";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import styles from "./styles.module.scss";
import { emailRegex } from "../../utils/index";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserByIdAsync,
  getFetchedUser,
  updateUserAsync,
} from "../../redux/users/usersSlice";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchedUser = useSelector(getFetchedUser);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchUserByIdAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
      setFullName(fetchedUser.fullname);
      setEmail(fetchedUser.email);
    } else {
      // User not found
      navigate("/*");
    }
  }, [fetchedUser]);

  const validateForm = () => {
    let error = {};

    // Validate full name
    if (!fullName.trim()) {
      error.fullName = "Full Name is required";
    }

    // Validate email
    if (!email.trim() || !emailRegex.test(email)) {
      error.email = "Invalid email address";
    }
    setErrors(error);
    return error;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      dispatch(updateUserAsync({ id: user.id, fullname: fullName, email }))
      navigate("/manage-users");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Edit user information</h2>
        <form onSubmit={submitHandler}>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            id="fullName"
            name="fullName"
            label="Full Name"
            className={styles.inputs__wrapper}
            error={errors.fullName}
          />

          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            name="email"
            label="Email"
            className={styles.inputs__wrapper}
            error={errors.email}
          />
          <Button type="submit">Save</Button>
        </form>
      </div>
    </>
  );
};

export default EditUser;

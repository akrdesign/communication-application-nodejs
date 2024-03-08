import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import { emailRegex } from "../../utils/index";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAsync, selectAuthErrors, selectLoggedInUser } from "../../redux/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const loginError = useSelector(selectAuthErrors);
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const validateForm = () => {
    const errors = {};

    // Validate email
    if (!email.trim() || !emailRegex.test(email)) {
      errors.email = "Invalid email address";
    }

    setErrors(errors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      dispatch(checkUserAsync({email, password}))
    }
  };

  return (
    <>
      {loggedInUser && <Navigate to="/login-success" replace={true}></Navigate>}
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            label="Email"
            required={true}
            className={styles.inputs__wrapper}
            error={errors.email}
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            label="Password"
            required={true}
            className={styles.inputs__wrapper}
          />
          {loginError && <p className={styles.error}>{loginError}</p>}
          <Button type="submit">Login</Button>
        </form>
      </div>
    </>
  );
};

export default Login;

import React from "react";
import Button from "../../components/common/Button";

import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../redux/auth/authSlice";
import { Navigate } from "react-router-dom";

const Welcome = () => {
  sessionStorage.removeItem("isRegistered");
  const loggedInUser = useSelector(selectLoggedInUser);
  return (
    <>
    {loggedInUser && <Navigate to='/' replace={true} />}
      <div className={styles.container}>
        <h2>Welcome to users module</h2>
        <div className={styles.wrappers}>
          <h3>Existing users</h3>
          <Button link="/auth/login">Login</Button>
        </div>
        <div className={styles.wrappers}>
          <h3>New users</h3>
          <Button link="/auth/register">Resigner</Button>
        </div>
      </div>
    </>
  );
};

export default Welcome;

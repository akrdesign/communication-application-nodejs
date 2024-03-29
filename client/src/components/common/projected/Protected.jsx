import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser, verifyUserAsync } from "../../../redux/auth/authSlice";
import { fetchUsersAsync } from "../../../redux/users/usersSlice";

const Protected = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verifyUserAsync())
    dispatch(fetchUsersAsync())
  }, [dispatch])

  if (!loggedInUser) {
    return <Navigate to="/welcome" replace={true}></Navigate>;
  }

  return children;
};

export default Protected;

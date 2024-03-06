import BaseAPI from "../../utils/BaseAPI";

export const createUser = async (userData) => {
  try {
    const response = await BaseAPI.post("/auth/register", userData, {withCredentials: true});
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const checkUser = async (loginInfo) => {
  try {
    const response = await BaseAPI.post("/auth/login", loginInfo, {withCredentials: true});
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const verifyUser = async () => {
  try {
    const response = await BaseAPI.get("/auth/verify", {withCredentials: true});
    return response;
  } catch (error) {
    return error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await BaseAPI.get("/auth/logout", {withCredentials: true});
    return response.data;
  } catch (error) {
    return error;
  }
};



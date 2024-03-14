import BaseAPI from "../../utils/BaseAPI";

export const createChat = async (chatData) => {
  try {
    const response = await BaseAPI.post("/chats", chatData);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchChats = async () => {
  try {
    const response = await BaseAPI.get("/chats");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createChat, fetchChats } from "./chatsAPI";

const initialState = {
  chats: [],
  status: "idle",
};

export const fetchChatsAsync = createAsyncThunk(
  "chat/fetchChats", async () => {
  const response = await fetchChats();
  return response;
});

export const createChatAsync = createAsyncThunk(
  "chat/createChat", async (chat) => {
  const response = await createChat(chat);
  return response;
});

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, action) => {
      state.chats.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchChatsAsync.pending, (state, action) => {
      state.status = "loading"
    })
    .addCase(fetchChatsAsync.fulfilled, (state, action) => {
      state.status = "idle",
      state.chats = action.payload;
    })
    .addCase(createChatAsync.pending, (state, action) => {
      state.status = "loading"
    })
    .addCase(createChatAsync.fulfilled, (state, action) => {
      state.status = "idle",
      state.chats.push(action.payload);
    })
  }
});

export const fetchAllChats = (state) => state.chats.chats;

export default chatSlice.reducer;

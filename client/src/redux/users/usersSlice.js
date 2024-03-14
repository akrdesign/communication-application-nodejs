import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUser, fetchUploadsByUser, fetchUserById, fetchUsers, updateUser } from "./userAPI";

const initialState = {
  users: [],
  usersUploads: [],
  fetchedUser: {},
  error: null,
  status: "idle",
};

export const fetchUsersAsync = createAsyncThunk(
  "user/fetchUsers", async () => {
  const response = await fetchUsers();
  return response;
});

export const fetchUserByIdAsync = createAsyncThunk(
  "user/fetchUserById", async (id) => {
  const response = await fetchUserById(id);
  return response;
});

export const updateUserAsync = createAsyncThunk(
  "user/updateUser", async (user) => {
  const response = await updateUser(user);
  return response;
});

export const deleteUserAsync = createAsyncThunk(
  "user/deleteUser", async (id) => {
  const response = await deleteUser(id);
  return response;
});

export const fetchUploadsByUserAsync = createAsyncThunk(
  'user/fetchUploadsByUser',
  async (userId) => {
    const response = await fetchUploadsByUser(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsersAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(fetchUsersAsync.fulfilled, (state, action) => {
      state.status = "idle"
      state.users = action.payload
    })
    .addCase(fetchUserByIdAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
      state.status = "idle"
      state.fetchedUser = action.payload
    })
    .addCase(updateUserAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(updateUserAsync.fulfilled, (state, action) => {
      state.status = "idle"
      const index = state.users.findIndex(
        (u) => u.id === action.payload.id
      );
      state.users[index] = action.payload;
    })
    .addCase(deleteUserAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(deleteUserAsync.fulfilled, (state, action) => {
      state.status = "idle"
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      state.users.splice(index, 1);
    })
    .addCase(fetchUploadsByUserAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(fetchUploadsByUserAsync.fulfilled, (state, action) => {
      state.status = "idle"
      state.usersUploads = action.payload
    })
  }
});

export const selectLoggedInUser = (state) => state.user.loggedInUser;
export const allUsers = (state) => state.users.users;
export const getFetchedUser = (state) => state.users.fetchedUser;
export const getUsersError = (state) => state.users.error;
export const getUsersUploads = (state) => state.users.usersUploads;

export default userSlice.reducer;

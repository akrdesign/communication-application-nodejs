import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, logoutUser, verifyUser } from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (userData) => {
    const response = await checkUser(userData);
    return response;
  }
);

export const verifyUserAsync = createAsyncThunk("auth/verifyUser", async () => {
  const response = await verifyUser();
  return response;
});

export const logoutUserAsync = createAsyncThunk("auth/logoutUser", async () => {
  const response = await logoutUser();
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = action.payload.data?.errors;
      })
      .addCase(verifyUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.response?.status !== 200) {
          state.loggedInUser = null;
        }
        if(action.payload?.status === 200) {
            state.loggedInUser = action.payload.data;
        }
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload?.data?.errors) {
          state.error = action.payload.data.errors;
          state.loggedInUser = null;
        }
        if (action.payload?.user) {
          state.loggedInUser = action.payload.user;
          state.error = null;
        }
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        // console.log("action", action)
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectAuthErrors = (state) => state.auth.error;

export default authSlice.reducer;

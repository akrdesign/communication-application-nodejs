import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSharedUpload, createUpload, deleteSharedUpload, deleteUpload, fetchSharedUploads, fetchUploadById, fetchUploads, updateUpload } from "./uploadsAPI";

const initialState = {
  uploads: [],
  sharedUploads: [],
  fetchedUpload: null,
  status: "idle"
};

export const createUploadAsync = createAsyncThunk(
  "upload/createUpload", async (upload) => {
  const response = await createUpload(upload);
  return response;
});

export const fetchUploadsAsync = createAsyncThunk(
  "upload/fetchUploads", async () => {
  const response = await fetchUploads();
  return response;
});

export const fetchUploadByIdAsync = createAsyncThunk(
  "upload/fetchUploadById", async (id) => {
  const response = await fetchUploadById(id);
  return response;
});

export const updateUploadAsync = createAsyncThunk(
  "upload/updateUpload", async (upload) => {
  const response = await updateUpload(upload);
  return response;
});

export const deleteUploadAsync = createAsyncThunk(
  "upload/deleteUpload", async (upload) => {
  const response = await deleteUpload(upload);
  return response;
});

export const createSharedUploadAsync = createAsyncThunk(
  "upload/createSharedUpload", async (upload) => {
  const response = await createSharedUpload(upload);
  return response;
});

export const fetchSharedUploadsAsync = createAsyncThunk(
  "upload/fetchSharedUploads", async () => {
  const response = await fetchSharedUploads();
  return response;
});

export const deleteSharedUploadAsync = createAsyncThunk(
  "upload/deleteSharedUpload", async (upload) => {
  const response = await deleteSharedUpload(upload);
  return response;
});


export const uploadSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {
    // deleteUpload: (state, action) => {
    //   const index = state.uploads.findIndex((d) => d.id === action.payload.id);
    //   state.uploads.splice(index, 1);
    // },
    resetFetchedUpload: (state, action) => {
      state.fetchedUpload = null
    },
    // updateUpload: (state, action) => {
    //   const {description, uploadIndex} = action.payload;
    //   const updatedUploads = [...state.uploads];
    //   updatedUploads[uploadIndex].description = description;
    // },
    addShareUpload: (state, action) => {
      state.uploads = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createUploadAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(createUploadAsync.fulfilled, (state, action) => {
      state.status = "idle"
      state.uploads.push(action.payload.data)
    })
    .addCase(fetchUploadsAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(fetchUploadsAsync.fulfilled, (state, action) => {
      state.status = "idle"
      state.uploads = action.payload;
    })
    .addCase(fetchUploadByIdAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(fetchUploadByIdAsync.fulfilled, (state, action) => {
      state.status = "idle"
      state.fetchedUpload = action.payload
    })
    .addCase(updateUploadAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(updateUploadAsync.fulfilled, (state, action) => {
      state.status = "idle"
      const index = state.uploads.findIndex(
        (u) => u.id === action.payload.id
      );
      state.uploads[index] = action.payload;
    })
    .addCase(deleteUploadAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(deleteUploadAsync.fulfilled, (state, action) => {
      state.status = "idle"
      const index = state.uploads.findIndex((u) => u.id === action.payload.id);
      state.uploads.splice(index, 1);
    })
    .addCase(createSharedUploadAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(createSharedUploadAsync.fulfilled, (state, action) => {
      state.status = "idle"
      state.sharedUploads.push(action.payload)
    })
    .addCase(fetchSharedUploadsAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(fetchSharedUploadsAsync.fulfilled, (state, action) => {
      state.status = "idle"
      state.sharedUploads = action.payload
    })
    .addCase(deleteSharedUploadAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(deleteSharedUploadAsync.fulfilled, (state, action) => {
      state.status = "idle"
      const index = state.sharedUploads.findIndex((u) => u.id === action.payload.id);
      state.sharedUploads.splice(index, 1);
    })
  }
});

export const { addShareUpload, resetFetchedUpload } = uploadSlice.actions;
export const fetchAllUploads = (state) => state.uploads.uploads;
export const getSharedUploads = (state) => state.uploads.sharedUploads;
export const getFetchedUpload = (state) => state.uploads.fetchedUpload;

export default uploadSlice.reducer;

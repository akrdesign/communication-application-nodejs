import BaseAPI from "../../utils/BaseAPI";

export const createUpload = async (uploadData) => {
  try {
    const response = await BaseAPI.post("/uploads", uploadData);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchUploads = async () => {
  try {
    const response = await BaseAPI.get("/uploads");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchUploadById = async (id) => {
  try {
    const response = await BaseAPI.get("/uploads/"+id);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const updateUpload = async (upload) => {
  try {
    const response = await BaseAPI.patch("/uploads/"+upload.id, upload);
    return response.data;
  } catch (error) {
    return error.response;
  }
};



export const deleteUpload = async (upload) => {
  try {
    const response = await BaseAPI.delete("/uploads/"+upload.id);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const createSharedUpload = async (sharedData) => {
  try {
    const response = await BaseAPI.post("/shareduploads", sharedData);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchSharedUploads = async () => {
  try {
    const response = await BaseAPI.get("/shareduploads");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const deleteSharedUpload = async (upload) => {
  try {
    const response = await BaseAPI.delete("/shareduploads/"+upload.id);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
const express = require("express");

const { createUpload, fetchUploads, updateUpload, fetchUploadById, deleteUpload } = require("../controller/uploads");
const { upload } = require("../services/uploads");

const router = express.Router();

router
    .post("/", upload.single("file"), createUpload)
    .get("/", fetchUploads)
    .get("/:id", fetchUploadById)
    .patch("/:id", updateUpload)
    .delete("/:id", deleteUpload)

exports.router = router;

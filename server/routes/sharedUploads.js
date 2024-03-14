const express = require("express");

const { fetchSharedUploads, deleteSharedUpload, createSharedUpload, fetchSharedUploadsByUser } = require("../controller/sharedUploads");

const router = express.Router();

router
    .post("/", createSharedUpload)
    .get("/", fetchSharedUploads)
    .get('/user/:userId', fetchSharedUploadsByUser)
    .delete("/:id", deleteSharedUpload)

exports.router = router;

const express = require("express");
const { createChat, fetchChats } = require("../controller/chat");

const router = express.Router();

router
  .post("/", createChat)
  .get("/", fetchChats)

exports.router = router;

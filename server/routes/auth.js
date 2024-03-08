const express = require("express");
const { register, login, logout, verify } = require("../controller/auth");

const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .get("/verify", verify)
  .get("/logout", logout);

exports.router = router;

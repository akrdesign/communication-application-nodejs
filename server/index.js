const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const cookieParser = require('cookie-parser')

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const uploadsRouter = require("./routes/uploads");
const sharedUploadsRouter = require("./routes/sharedUploads");

const PORT = process.env.PORT || 8080

const server = express()

var corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
}

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.static("public"));
server.use(cookieParser());
server.use("/auth", authRouter.router);
server.use("/users", userRouter.router);
server.use("/chats", chatRouter.router);
server.use("/uploads", uploadsRouter.router);
server.use("/shareduploads", sharedUploadsRouter.router);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/dashboard");
  console.log("database connected");
}

server.listen(PORT, () => {
  console.log(`Server running... ${PORT}`);
});
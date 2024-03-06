const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/auth")

const PORT = process.env.PORT || 8080

const server = express()

var corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
}

server.use(cors(corsOptions))
server.use(express.json())
server.use(cookieParser())
server.use("/auth", authRouter.router)

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/dashboard");
  console.log("database connected");
}

server.listen(PORT, () => {
  console.log(`Server running... ${PORT}`);
});
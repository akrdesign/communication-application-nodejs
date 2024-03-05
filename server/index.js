const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080

const server = express()

server.use(express.json())

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/dashboard");
  console.log("database connected");
}

server.listen(PORT, () => {
  console.log(`Server running... ${PORT}`);
});
const express = require("express");
const server = express();
const PORT = 3000;

server.get("/authenticate", (req, res) => {
  res.send("Beginning the Assignment...");
});

server.listen(PORT, () => {
  console.log("Server is running...");
});

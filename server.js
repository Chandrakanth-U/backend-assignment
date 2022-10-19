const express = require("express");
const server = express();
const PORT = 3000;

const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://uppula_chandu:CNtYD8QufZtRiNR5@cluster0.hjaul8i.mongodb.net/?retryWrites=true&w=majority";

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URI, config);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb server");
});
mongoose.connection.on("error", () => {
  console.log("Not connected to mongodb server");
});

require("./models/User");
require("./models/post");
server.use(express.json());

server.use(require("./routes/Authenticate"));
server.use(require("./routes/post"));
server.use(require("./routes/User"));

server.get("/authenticate", (req, res) => {
  res.send("Beginning the Assignment...");
});

server.listen(PORT, () => {
  console.log("Server is running...");
});

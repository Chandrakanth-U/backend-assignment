const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://uppula_chandu:CNtYD8QufZtRiNR5@cluster0.hjaul8i.mongodb.net/?retryWrites=true&w=majority";

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URI, config);

module.exports = mongoose;

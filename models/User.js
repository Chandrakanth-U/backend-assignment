const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  followers: [{ type: ObjectId, ref: "user" }],
  following: [{ type: ObjectId, ref: "user" }],
});

const user = mongoose.model("user", userSchema);

module.exports = user;

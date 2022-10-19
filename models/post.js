const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [
    {
      text: String,
      postedby: { type: ObjectId, ref: "user" },
    },
  ],
  likes: [
    {
      type: ObjectId,
      ref: "user",
    },
  ],
  postedby: {
    type: ObjectId,
    ref: "user",
  },
});

mongoose.model("Post", postSchema);

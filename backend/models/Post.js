const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    description: { Type: String, default: "" },
    image: { Type: String, required: true },
    comments: [
      {
        user: { Type: mongoose.Schema.Types.ObjectId, ref: "users" },
        date: { Type: String, required: true },
        comment: { Type: String, required: true },
      },
    ],
    likes: [
      {
        user: { Type: mongoose.Schema.Types.ObjectId, ref: "users" },
        date: { Type: String, required: true },
      },
    ],

    user: { Type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("posts", postSchema);

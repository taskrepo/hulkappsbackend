const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  comments: [
    { type: mongoose.Schema.Types.ObjectId, 
      ref: "Comments" 
    }
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

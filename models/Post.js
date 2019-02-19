const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Post Schema
// user have many posts and comments
// post has many comments
const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  text: {
    type: String,
    require: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  // user cannot like a comment more than once, user can dislike a comment, dislike removes user id from the array
  likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        // comment date
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    // post date
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);

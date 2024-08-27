const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  container: {
    type: Schema.Types.ObjectId,
    ref: "Container"
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },
  comment: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: false
  },
  createdBy: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String,
  }
}, 
{ timestamps: true });

const Comment = mongoose.model.Comment || mongoose.model("Comment", commentSchema);

module.exports = Comment;

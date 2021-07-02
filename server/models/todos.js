const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = TodoModel;

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      index: true,
    },
    Image: {
      type: String,
    },
    Password: {
      type: String,
      required: true,
    },
    Cart: { type: Array, default: [] },
    Balance: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

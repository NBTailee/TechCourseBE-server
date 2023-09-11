const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "must contain username"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "must contain username"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "must contain username"],
      trim: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

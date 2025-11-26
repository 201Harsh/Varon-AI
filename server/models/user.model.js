import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.JwtGenToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN 
  });
};

userSchema.methods.ComparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.HashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model("user", userSchema);

export default UserModel; 

import mongoose from "mongoose";

const TempuserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  otp: {
    type: String,
    required: true,
  },
  otpExpiry: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

TempuserSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

const TempUserModel = mongoose.model("tempuser", TempuserSchema);

export default TempUserModel;

import TempUserModel from "../models/tempuser.model.js";
import UserModel from "../models/user.model.js";

export const CreateTempUser = async ({
  name,
  email,
  password,
  otp,
  otpExpiry,
}) => {
  if (!name || !email || !password || !otp || !otpExpiry) {
    throw new Error("All Values are required to create a user.");
  }

  const tempuser = await TempUserModel.create({
    name,
    email,
    password,
    otp,
    otpExpiry,
  });
  return tempuser;
};

export const VerifyUserOtp = async ({ email, otp }) => {
  if (!email || !otp) {
    throw new Error("Proper Values are required to verify a user.");
  }

  const tempuser = await TempUserModel.findOne({ email }).select("+password");

  if (!tempuser) {
    throw new Error("User not found.");
  }

  if (tempuser.otp !== otp) {
    throw new Error("Invalid OTP.");
  }

  if (tempuser.otpExpiry < Date.now()) {
    throw new Error("OTP Expired.");
  }

  const user = await UserModel.create({
    name: tempuser.name,
    email: tempuser.email,
    password: tempuser.password,
  });

  await tempuser.deleteOne();

  return user;
};

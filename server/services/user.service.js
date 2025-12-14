import TempUserModel from "../models/tempuser.model.js";
import UserModel from "../models/user.model.js";

const createError = (message, statusCode) => {
  const err = new Error(message); // ✅ correct — no recursion
  err.statusCode = statusCode;
  return err;
};

export const CreateTempUser = async ({
  name,
  email,
  password,
  otp,
  otpExpiry,
}) => {
  if (!name || !email || !password || !otp || !otpExpiry) {
    throw createError("All Values are required to create a user.", 406);
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
    throw createError("Proper Values are required to verify a user.", 406);
  }

  const tempuser = await TempUserModel.findOne({ email }).select("+password");

  if (!tempuser) {
    throw createError("User not found.", 404);
  }

  if (tempuser.otp !== otp) {
    throw createError("Invalid OTP.", 400);
  }

  if (tempuser.otpExpiry < Date.now()) {
    throw createError("OTP Expired.", 404);
  }

  const user = await UserModel.create({
    name: tempuser.name,
    email: tempuser.email,
    password: tempuser.password,
  });

  await tempuser.deleteOne();

  return user;
};

export const ResendUserOtplogic = async ({ email, otp }) => {
  if (!email) {
    throw createError("Proper Values are required to resend a user otp.", 406);
  }

  if (!otp) {
    throw createError("Proper Values are required to resend a user otp.", 406);
  }

  const tempuser = await TempUserModel.findOne({ email });

  if (!tempuser) {
    throw createError("User not found.", 404);
  }

  tempuser.otp = otp;
  tempuser.otpExpiry = Date.now() + 5 * 60 * 1000;
  await tempuser.save();

  return tempuser;
};

export const LoginUserCheck = async ({ email, password }) => {
  if (!email || !password) {
    throw createError("Proper Values are required to login a user.", 406);
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    throw createError("Invalid Credentials.", 404);
  }

  if (!user.password) {
    throw createError(
      "This account uses Google Login. Please click 'Continue with Google'.",
      404
    );
  }

  const isPasswordMatch = await user.ComparePassword(password);

  if (!isPasswordMatch) {
    throw createError("Invalid Credentials.", 404);
  }

  return user;
};

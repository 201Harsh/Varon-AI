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

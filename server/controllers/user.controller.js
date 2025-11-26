import TempUserModel from "../models/tempuser.model.js";
import UserModel from "../models/user.model.js";
import { CreateTempUser } from "../services/user.service.js";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(406).json({
        error: "Invalid request data. Please Only String Data is allowed!",
      });
    }

    const ValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!ValidEmail.test(email)) {
      return res.status(406).json({
        message: "Invalid Email Address!",
      });
    }

    const AllowedEmails = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "live.com",
      "icloud.com",
      "mail.com",
      "protonmail.com",
    ];

    if (!AllowedEmails.includes(email.split("@")[1])) {
      return res.status(406).json({
        message: "Invalid Email Address!",
      });
    }

    const ifTempUserExists = await TempUserModel.findOne({ email });

    if (ifTempUserExists) {
      return res.status(202).json({
        error: "Just Verfy Your Email Via OTP.",
      });
    }

    const ifUserExists = await UserModel.findOne({ email });

    if (ifUserExists) {
      return res.status(400).json({
        error: "User Already Exists.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const hashedPassword = await UserModel.HashPassword(password);

    const tempUser = await CreateTempUser({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    return res.status(201).json({
      message: "Verify Your Email via OTP. To Register.",
      tempUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

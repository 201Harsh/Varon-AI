import express from "express";
import {
  LoginUser,
  RegisterUser,
  VerifyUser,
} from "../controllers/user.controller.js";
import { body } from "express-validator";
import ValidateData from "../middlewares/validated.middleware.js";

const UserRouter = express.Router();

UserRouter.post(
  "/register",
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long!"),
    body("email").trim().isEmail().withMessage("Invalid email!"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long!"),
  ],
  ValidateData,
  RegisterUser
);

UserRouter.post(
  "/verify",
  [
    body("email").trim().isEmail().withMessage("Invalid email!"),
    body("otp").trim().isNumeric().withMessage("Invalid OTP!"),
  ],
  ValidateData,
  VerifyUser
);

UserRouter.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Invalid email!"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long!"),
  ],
  ValidateData,
  LoginUser
);

export default UserRouter;

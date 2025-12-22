import express from "express";
import {
  GetUser,
  LoginUser,
  LogoutUser,
  RegisterAndLoginUsingGoogle,
  RegisterUser,
  ResendUserOtp,
  VerifyUser,
} from "../controllers/user.controller.js";
import { body } from "express-validator";
import ValidateData from "../middlewares/validated.middleware.js";
import AuthUser from "../middlewares/auth.middleware.js";
import passport from "passport";
import {
  GlobalLimit,
  loginLimit,
  logoutLimit,
  registerLimit,
  verifyOtpLimit,
} from "../middlewares/rate-limit.middleware.js";

const UserRouter = express.Router();

UserRouter.post(
  "/register",
  registerLimit,
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
  verifyOtpLimit,
  [
    body("email").trim().isEmail().withMessage("Invalid email!"),
    body("otp").trim().isNumeric().withMessage("Invalid OTP!"),
  ],
  ValidateData,
  VerifyUser
);

UserRouter.post(
  "/resend",
  GlobalLimit,
  [body("email").trim().isEmail().withMessage("Invalid email!")],
  ValidateData,
  ResendUserOtp
);

UserRouter.post(
  "/login",
  loginLimit,
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

UserRouter.post("/logout", logoutLimit, AuthUser, LogoutUser);

UserRouter.get("/get", GlobalLimit, AuthUser, GetUser);

UserRouter.get(
  "/google",
  GlobalLimit,
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

UserRouter.get(
  "/google/callback",
  GlobalLimit,
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  RegisterAndLoginUsingGoogle
);

export default UserRouter;

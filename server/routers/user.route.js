import express from "express";
import { RegisterUser } from "../controllers/user.controller.js";
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

export default UserRouter;

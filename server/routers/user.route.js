import express from "express";
import { RegisterUser } from "../controllers/user.controller.js";

const UserRouter = express.Router();

UserRouter.post("/register", RegisterUser);

export default UserRouter;

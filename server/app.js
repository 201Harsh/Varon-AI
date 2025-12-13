import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "./routers/user.route.js";

const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_SIDE_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/users", UserRouter);

export default app;

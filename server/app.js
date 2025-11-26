import express from "express";
import UserRouter from "./routers/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

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

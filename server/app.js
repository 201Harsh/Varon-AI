import express from "express";
import UserRouter from "./routers/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", UserRouter)

export default app;

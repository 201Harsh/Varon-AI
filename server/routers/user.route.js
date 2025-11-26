import express from "express";

const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.send("User Router hello Test!!");
});

export default UserRouter;

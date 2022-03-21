import express  from "express";
import { UserModel } from "../schemas/user.schema.js";

export const userRouter = express.Router()

userRouter.post("/create-user", function (req, res) {
    const {username, password, age} = req.body;
    const user = new UserModel({
      username,
      password,
      age
    });
    user
      .save()
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => {
        res.status(501);
        res.json({ errors: err });
      });
  });
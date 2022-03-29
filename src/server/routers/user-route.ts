import express from "express";
import { UserModel } from "../schemas/user.schema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { authHandler } from "../middleware/auth.middleware.js";

dotenv.config();

export const userRouter = express.Router();
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;

const saltRounds = 10;

userRouter.post("/create-user", function (req, res) {
  const { username, password, age } = req.body;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      const user = new UserModel({
        username,
        password: hash,
        age,
      });
      user
        .save()
        .then((data) => {
          res.json({ message: "Account created Successfully", data });
        })
        .catch((err) => {
          res.status(501);
          res.json(err);
        });
    });
  });
});

userRouter.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  UserModel
  .findOne({ username })
  .then((user) => {
    if (!user) {
      res.status(401).send("Invalid username");
      return;
    } else {
      bcrypt.compare(password, `${user?.password}`, function (err, result) {
        if (result) { 
        const accessToken = jwt.sign({ user }, access_secret);
        console.log("Token", accessToken);
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        });
        res.json({ message: "Successfully Logged In", user });
        } else {
          res.status(401).send("Invalid password");
        }
      })
    }
  })
    
    .catch((err) => {
      res.status(501).json(err);
    });
});

userRouter.get("/logout", function (req, res){
res.cookie("jwt", "", {
  httpOnly: true,
  maxAge: 60*60*1000,
});
res.json({ message: "Successfully Logged Out"})
});



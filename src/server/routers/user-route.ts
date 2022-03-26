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

  userRouter.get("/login",function(req,res){
    const username = req.body.username
    const password = req.body.password
    UserModel
    .findOne({ username })
    .then(user => {
      if(!user) {
        res.status(401).send("Invalid username");
        return;
      }
      else {
        if(user?.password == password) {
          res.json(user);
        }
        else {
          res.status(401).send("Invalid password");
        }
      }
    })
    .catch((err) => {
      res.status(501).json({ errors: err });
    });
   });
  
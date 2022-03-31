import express from "express";
import { QuizModel } from "../schemas/quiz.schema.js";

export const quizRouter = express.Router();

quizRouter.post("/create-quiz", function (req, res) {
    const {title} = req.body;

    const quiz = new QuizModel({
        title
      });
    quiz
    .save()
    .then((data) => {
        res.json({ message: "Quiz created Successfully", data });
      })
    .catch((err) => {
        res.status(501).json(err);
      });
});

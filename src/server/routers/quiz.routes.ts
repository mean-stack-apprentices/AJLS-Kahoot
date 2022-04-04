import express from "express";
import { QuestionModel } from "../schemas/question.schema.js";
import { QuizModel } from "../schemas/quiz.schema.js";
import * as QuizProcess from "./../middleware/quiz.middleware.js";

export const quizRouter = express.Router();

quizRouter.post("/create-quiz-title", function (req, res) {
    const {title} = req.body;

    const quiz = new QuizModel({
        title
      });
    quiz
    .save()
    .then((data) => {
        res.json({ message: "Quiz title created Successfully", data });
      })
    .catch((err) => {
        res.status(501).json(err);
      });
});

quizRouter.post('/create-quiz-question',QuizProcess.createQuestionAndUpdateQuiz);


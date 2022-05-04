import express from "express";
import { authHandler } from "../middleware/auth.middleware.js";
import { QuestionModel } from "../schemas/question.schema.js";
import { QuizModel } from "../schemas/quiz.schema.js";
import * as QuizProcess from "./../middleware/quiz.middleware.js";

export const quizRouter = express.Router();

quizRouter.post("/create-quiz-title", function (req, res) {
  const { title } = req.body;

  const quiz = new QuizModel({
    title,
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

quizRouter.get("/quiz/:id", async function (req: any, res) {
  await QuizModel.findById(req.params.id)

    .populate("questions")
    .lean()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => res.status(501).json(err));
});

quizRouter.post(
  "/create-quiz-question/:quizId",
  QuizProcess.createQuestionAndUpdateQuiz
);

// delete quiz and its contents
quizRouter.delete("/delete-quiz/:id", function (req, res) {
  const _id = req.params.id;
  QuizModel.findByIdAndDelete(_id)
    .then((data) => {
      console.log(data);
      res.json({ data });
    })
    .catch((err) => res.status(501).json(err));
});

quizRouter.get("/", function (req, res) {
  QuizModel.find()
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

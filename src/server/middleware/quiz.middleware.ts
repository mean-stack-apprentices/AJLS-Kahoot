import { NextFunction, Request, Response } from "express";
import { QuestionModel } from "../schemas/question.schema.js";
import { QuizModel } from "../schemas/quiz.schema.js";

export function createQuestionAndUpdateQuiz( req: Request, res: Response, next: NextFunction ){
  const question = new QuestionModel({
    question_title : req.body.question_title,
    answers: req.body.answers
  });
  question
  .save()
  .then(data => {
      console.log("question created");
      QuizModel
      .findByIdAndUpdate(
          {
            _id: req.params.quizId
          },
          {
            $push: { questions: data._id }
          },
          {
              new: true
          },
          function(err, updateQuiz) {
              if(err) {
                console.log("error updating quiz", err);
                res.send("Error updating quiz");
                return; 
              }
              else {
                console.log("quiz updated:",updateQuiz);
                res.json({data:updateQuiz});
                return;
              }
          }
      )
  })
  .catch(err => {
      res.status(501).json(err)
      return;
    })
}
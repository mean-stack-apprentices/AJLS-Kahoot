import express, { NextFunction, Request, Response } from "express";
import { quizRouter } from "./quiz-route.js";
import { userRouter } from "./user-route.js";


export const apiRouter = express.Router();

// Routes go here
apiRouter.use('/users',userRouter);
apiRouter.use('/quizzes',quizRouter);


// response handler
apiRouter.use((req,res,next) => {
    if(res.locals.data) {
        res.status(200).json({data: res.locals.data})
    }
    else {
        next();
    }
})

// express error handling middleware
apiRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err.name == "ValidationError") {
        res.status(400).send(err);
    }
    console.log(Object.keys(err));
    res.status(500).send(err);
})


apiRouter.all('/*',function (req,res) {
    console.log(" NOT FOUND");
    res.sendStatus(404);
})

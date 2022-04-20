import * as mongoose from 'mongoose';

export interface Question {
    _id?: {type: mongoose.Types.ObjectId}, 
    question_title: string,
    completed?: boolean,
    answers: [
        {option: string, correct: boolean}
    ]
}
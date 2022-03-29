import mongoose from 'mongoose';
import { Question } from '../../shared/models/question.model.js';
const {model, Schema} = mongoose;

const questionSchema = new Schema<Question>({
    question_title: {type: String, required: true},
    completed: {type: Boolean, default: false},
    answers: [
        {
            option:{type: String, required: true},
            correct:{type: Boolean, required: true}
        }
    ]
});

export const QuestionModel = model<Question>('Question',questionSchema);
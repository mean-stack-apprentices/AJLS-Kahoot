import mongoose from "mongoose";
import type {Quiz} from "../../shared/models/quiz.model.js";
const {Schema, model} = mongoose;

const quizSchema = new Schema<Quiz>({
    title: {type: String, required: true},
    questions:[
        {type: mongoose.Types.ObjectId, ref: 'Question' }
    ],
    category: {type: String}
});

export const QuizModel = model<Quiz>('Quiz', quizSchema);
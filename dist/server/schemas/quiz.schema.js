import mongoose from "mongoose";
const { Schema, model } = mongoose;
const quizSchema = new Schema({
    title: { type: String, required: true },
    questions: [
        { type: mongoose.Types.ObjectId, ref: 'Question' }
    ],
    category: { type: String }
});
export const QuizModel = model('Quiz', quizSchema);
//# sourceMappingURL=quiz.schema.js.map
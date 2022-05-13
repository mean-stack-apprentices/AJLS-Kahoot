import mongoose from 'mongoose';
import '../../shared/models/question.model.js';
const { model, Schema } = mongoose;
const questionSchema = new Schema({
    question_title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    answers: [
        {
            option: { type: String, required: true },
            correct: { type: Boolean, required: true },
            _id: false
        }
    ]
});
export const QuestionModel = model('Question', questionSchema);
//# sourceMappingURL=question.schema.js.map
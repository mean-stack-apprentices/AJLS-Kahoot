import * as mongoose from "mongoose";
import { Question } from "./question.model.js";

export interface Quiz {
    _id?: {type: mongoose.Types.ObjectId},
    title: string,
    questions?: Question[],
    category?: string,
}
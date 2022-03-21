import * as mongoose from 'mongoose';
export interface User {
    _id?:{type: mongoose.Types.ObjectId}
    username: string,
    password?: string,
    age?: number,
}
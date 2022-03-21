import mongoose from 'mongoose';
import type { User } from '../../shared/models/user.model.js';
const {Schema, model} = mongoose

const userSchema = new Schema<User>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
});

export const UserModel = model<User>('User',userSchema)

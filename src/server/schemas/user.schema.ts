import mongoose from 'mongoose';
import type { User } from '../../shared/models/user.model.js';
const {Schema, model} = mongoose

const userSchema = new Schema<User>({
    username: {type: String, required: [true, "username is required"]},
    password: {type: String, required: [true, "password is required"]},
    age: {type: Number, required: [true, "age is required"]},
});

export const UserModel = model<User>('User',userSchema);

userSchema.path('username').validate(async function (username: string) {
    const usernameCount = await mongoose.models.User?.countDocuments({ username })
    return !usernameCount
},'Username already exists!');



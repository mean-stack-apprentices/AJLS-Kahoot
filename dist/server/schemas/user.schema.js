import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const userSchema = new Schema({
    username: { type: String, required: [true, "username is required"] },
    password: { type: String, required: [true, "password is required"] },
    age: { type: Number, required: [true, "age is required"] },
});
export const UserModel = model('User', userSchema);
userSchema.path('username').validate(async function (username) {
    const usernameCount = await mongoose.models.User?.countDocuments({ username });
    return !usernameCount;
}, 'Username already exists!');
//# sourceMappingURL=user.schema.js.map
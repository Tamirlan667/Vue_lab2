import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String},
    surname: { type: String},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {type: String },
    age: { type: Number},
    avatarPath: { type: String },
    location: { type: String },
    activity: { type: Date, default: Date.now },
    followersId: { type: [Number], default: [] },
    friendsId: { type: [Number], default: [] },
    postsId: { type: [Number], default: [] },
    chatsId: { type: [Number], default: [] },
    rating: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

export default User;
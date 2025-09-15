import mongoose from "mongoose";

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface Task {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    status: string;
}
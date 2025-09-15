import mongoose from "mongoose";
import {Task} from "../types";

const TaskSchema = new mongoose.Schema<Task>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "in_progress", "complete"],
        default: "new"
    }
});

const TrackHistory = mongoose.model('Task', TaskSchema);
export default TrackHistory;
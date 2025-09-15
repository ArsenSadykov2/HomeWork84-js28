import express from "express";
import User from "../models/User";
import Task from "../models/Task";

const tasksRouter = express.Router();

tasksRouter.post('/', async (req, res, next) => {
    try {
        const token = req.get('Authorization');

        if (!token) {
            res.status(401).send({ error: 'Authorization token required' });
            return;
        }

        const userId = await User.findById({_id: req.body.user})
        if (!userId) {
            res.status(401).send({ error: 'User not found' });
            return;
        }

        const task = new Task({
            user: userId,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        });

        await task.save();

        res.status(201).send({
            message: 'Task saved successfully',
            task
        });
        return;
    } catch (error) {
        next(error);
    }
});

tasksRouter.get('/', async (req, res, next) => {
    try {
        const user_id = req.query._id as string;
        const filter: {user?: string} = {};

        if (user_id) filter.user = user_id;

        const tasks = await Task.find(filter);
        res.send({tasks});
    } catch (e) {
        next(e);
    }
});


export default tasksRouter;
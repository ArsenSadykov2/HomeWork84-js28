import express from "express";
import User from "../models/User";
import {UserFields} from "../types";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {randomUUID} from "node:crypto";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        next (e);
    }
})

usersRouter.post("/", async (req, res, next) => {
    const userData: UserFields = {
        username: req.body.username,
        password: req.body.password,
        token: randomUUID(),
    };


    try {
        const user = new User(userData);
        await user.save();
        res.send(user);
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send({error: error.message});
        }
        next(error);
    }
});

usersRouter.post("/sessions", async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(404).send({error: "User not found"});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(400).send({error: "Password does not match"});
    }

    user.token = randomUUID();
    await user.save();

    res.send({message: 'Username and Password is correct', user});
});

export default usersRouter;
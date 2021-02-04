import express from 'express';
import expressAsyncHandler from 'express-async-handler';
// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { data } from '../data.js';
import Task from '../models/taskModel.js';
import { decodeJWT, isAuth } from '../utils.js';

const taskRouter = express.Router();

taskRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;

    const sortTasks = req.query.sortBy || 'userName';

    const order = req.query.order || 'lowest';
    const sortOrder = order === 'lowest' ? 1 : order === 'highest' ? -1 : 1;

    const sort = { [sortTasks]: sortOrder };

    const count = await Task.count({});

    const tasks = await Task.find({})
      .populate()
      .sort(sort)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.send({ tasks, page, pages: Math.ceil(count / pageSize) });
  }),
);

taskRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    console.log('task list of a seed');
    const createdTasks = await Task.insertMany(data.tasks);
    res.send({ createdTasks });
  }),
);

taskRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const authorization = req.headers.authorization;
    let newTask;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(token, process.env.JWT_SECRET || 'secretWord', (err, decode) => {
        req.user = decode;
      });
    }

    if (req.user && req.user._id) {
      newTask = {
        createdUser: req.user._id,
        userName: req.user.name,
        email: req.user.email,
        text: req.body.text,
      };
    } else {
      newTask = {
        userName: req.body.userName,
        email: req.body.email,
        text: req.body.text,
      };
    }

    const task = new Task(newTask);
    const createdTask = await task.save();
    res.send({
      message: 'Task created',
      task: createdTask,
    });
  }),
);

taskRouter.put(
  '/:id/status',
  decodeJWT,
  expressAsyncHandler(async (req, res) => {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    let status;

    if (req.user && req.user.isAdmin) {
      status = req.body.status === 0 ? 1 : req.body.status === 1 ? 11 : task.status;
    } else {
      status = req.body.status === 0 ? 0 : req.body.status === 1 ? 10 : task.status;
    }

    task.status = status;

    const updatedTask = await task.save();
    res.send({ message: 'Status Updated', task: updatedTask });
  }),
);

export default taskRouter;

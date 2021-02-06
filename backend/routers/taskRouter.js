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

    const count = await Task.countDocuments({});

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
    const createdTasks = await Task.insertMany(data.tasks);
    res.send({ createdTasks });
  }),
);

taskRouter.post(
  '/',
  decodeJWT,
  expressAsyncHandler(async (req, res) => {
    let newTask;

    if (req.user && req.user.isAdmin) {
      newTask = {
        status: req.body.status,
        createdUser: req.user._id,
        userName: req.body.userName,
        email: req.body.email,
        text: req.body.text,
      };
    } else {
      newTask = {
        status: req.body.status,
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
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (req.user && req.user.isAdmin) {
      task.status = req.body.status;
      task.userName = req.body.userName || task.userName;
      task.email = req.body.email || task.email;
      task.text = req.body.text || task.text;

      const updatedTask = await task.save();

      res.send({ message: 'Task Updated', task: updatedTask });
    } else {
      res.status(403).send({ message: 'You dont have an access to edit a task' });
    }
  }),
);

export default taskRouter;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTask, createTask } from '../reducer/actions/taskActions';

import { statuses } from '../data.js';
import {
  CHANGE_TASK_RESET,
  CREATE_TASK_RESET,
  RESET_EDIT_TASK,
} from '../reducer/constants/taskListConstants';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

import './TaskForm.scss';

const TaskForm = () => {
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state.editTask);
  const { userInfo } = useSelector((state) => state.userSignin);

  const {
    loading: loadingChangeTask,
    success: successChangeTask,
    error: errorChangeTask,
  } = useSelector((state) => state.changeTask);

  const {
    loading: loadingcreateTask,
    success: successCreateTask,
    error: errorChreateTask,
  } = useSelector((state) => state.createTask);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [showSelecterStatus, setShowSelecterStatus] = useState(false);

  useEffect(() => {
    if (task) {
      setName(task.userName);
      setEmail(task.email);
      setText(task.text);
      setStatus(task.status);

      switch (task.status) {
        case 0 || 1:
          setStatusIndex(0);
          break;
        case 10 || 11:
          setStatusIndex(1);
          break;
        default:
          setStatusIndex(0);
          break;
      }
    } else {
      setName('');
      setEmail('');
      setText('');
      setStatusIndex(0);
      setStatus(0);
    }
  }, [dispatch, task, successCreateTask, successChangeTask]);

  const selector = (index) => {
    if (userInfo && userInfo.isAdmin) {
      if (task) {
        //  Admin and Edit Task
        const convertIndex = index === 0 ? 1 : index === 1 ? 11 : statusIndex;
        setStatusIndex(index);
        setStatus(convertIndex);
      } else {
        //  Admin and Create Taskk
        const convertIndex = index === 0 ? 0 : index === 1 ? 10 : statusIndex;
        setStatus(convertIndex);
        setStatusIndex(index);
      }
    } else {
      // No Admin
      const convertIndex = index === 0 ? 0 : index === 1 ? 10 : statusIndex;
      setStatus(convertIndex);
      setStatusIndex(index);
    }

    setShowSelecterStatus(false);
  };

  const switcheToTaskCreator = () => {
    dispatch({ type: RESET_EDIT_TASK });
    dispatch({ type: CREATE_TASK_RESET });
    dispatch({ type: CHANGE_TASK_RESET });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (task) {
      dispatch(
        changeTask({
          status: status,
          _id: task._id,
          userName: name,
          email: email,
          text: text,
        }),
      );
    } else {
      dispatch(
        createTask({
          status: status,
          userName: name,
          email: email,
          text: text,
        }),
      );
    }
  };

  return (
    <form id="edit" className="form" onSubmit={submitHandler}>
      <div>
        <div className="row space-btw">
          <div>
            <h1>{task ? 'Edit a task' : 'Create your task'}</h1>
          </div>
          {task && (
            <div>
              <label />
              <button className="secondary" type="button" onClick={switcheToTaskCreator}>
                SWITCH TO CREATOR A TASK
              </button>
            </div>
          )}
        </div>
      </div>
      {loadingChangeTask && <LoadingBox />}
      {errorChangeTask ? (
        <MessageBox variant="danger">{errorChangeTask}</MessageBox>
      ) : (
        successChangeTask && <MessageBox variant="success">{successChangeTask.message}</MessageBox>
      )}
      {loadingcreateTask && <LoadingBox />}
      {errorChreateTask ? (
        <MessageBox variant="danger">{errorChreateTask}</MessageBox>
      ) : (
        successCreateTask && <MessageBox variant="success">{successCreateTask.message}</MessageBox>
      )}
      <div>
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          required
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="task">New Task </label>
        <textarea
          required
          row="2"
          type="text"
          id="task"
          placeholder="Enter your new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="selector pointer">
        <div className="row">
          <div
            className={`selected-status ${statuses[statusIndex]} full-width`}
            onClick={() => setShowSelecterStatus(!showSelecterStatus)}>
            {statuses[statusIndex]}
            <div onClick={() => setShowSelecterStatus(!showSelecterStatus)}>
              <svg
                className={showSelecterStatus ? 'rotared' : ''}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
                />
              </svg>
            </div>
          </div>
        </div>
        <ul className={showSelecterStatus ? '' : 'show'}>
          {statuses.map((status, index) => (
            <li
              className={statuses[statusIndex] === status ? 'active' : ''}
              onClick={() => selector(index)}>
              {status}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label />
        <button className="primary" type="submit">
          {task ? 'EDIT TASK' : 'ADD NEW TASK'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;

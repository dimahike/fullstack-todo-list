import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../reducer/actions/taskActions';

const CreatorTask = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('work sumit');
    dispatch(createTask({ userName: name, email, text }));
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div>
        <h1>Create your task</h1>
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="task">New Task </label>
        <textarea
          row="2"
          type="text"
          id="task"
          placeholder="Enter your new task"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <label />
        <button className="primary" type="submit">
          ADD NEW TASK
        </button>
      </div>
    </form>
  );
};

export default CreatorTask;

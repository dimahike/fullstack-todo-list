import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { statuses } from '../data.js';
import './Task.scss';
import { EDIT_TASK } from '../reducer/constants/taskListConstants';

const Task = ({ task, admin }) => {
  const dispatch = useDispatch();
  const [statusIndex, setStatusIndex] = useState(task.status);

  useEffect(() => {
    let index =
      task.status === 0 || task.status === 1 ? 0 : task.status === 10 || task.status === 11 ? 1 : 0;

    setStatusIndex(index);
  }, [task.status]);

  const editTask = () => {
    dispatch({ type: EDIT_TASK, payload: task });
  };

  return (
    <div className="task">
      <div className="row space-btw">
        <div className="row left">
          {admin && (
            <div>
              <a href="#edit">
                <button className=" primary" onClick={editTask}>
                  <i class="fas fa-edit"></i>
                </button>
              </a>
            </div>
          )}
          <div className="selector">
            <button className={`row ${statuses[statusIndex]}`}>
              {(task.status === 1 || task.status === 11) && <i class="fas fa-edit"></i>}
              {statuses[statusIndex]}
            </button>
          </div>

          <div className="user-name">
            <span>{task.userName}</span>
          </div>
        </div>

        <div className="email">
          <span>{task.email}</span>
        </div>
      </div>
      <div className="row right text">
        <span>{task.text} </span>
      </div>
    </div>
  );
};

export default Task;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeStatus } from '../reducer/actions/taskActions';

import './Task.scss';

const statuses = ['processing', 'complete'];

const Task = ({ task }) => {
  const dispatch = useDispatch();

  let convertedStatus;

  switch (task.status) {
    case 0 || 1:
      convertedStatus = 0;
      break;
    case 10 || 11:
      convertedStatus = 1;
      break;
    default:
      convertedStatus = 0;
      break;
  }

  const [selectedStatus, setSelectedStatus] = useState(convertedStatus);
  const [showSelecterStatus, setShowSelecterStatus] = useState(false);

  const selector = (index) => {
    setSelectedStatus(index);
    setShowSelecterStatus(false);

    dispatch(changeStatus(index, task._id));
  };
  return (
    <div className="row task cteator-task">
      <div className="row left">
        <div className="selector pointer">
          <div className="row">
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
            <span
              className={`selected-status ${statuses[selectedStatus]}`}
              onClick={() => setShowSelecterStatus(!showSelecterStatus)}>
              {statuses[selectedStatus]}
            </span>
          </div>
          <ul className={showSelecterStatus ? '' : 'show'}>
            {statuses.map((status, index) => (
              <li
                className={statuses[selectedStatus] === status ? 'active' : ''}
                onClick={() => selector(index)}>
                {status}
              </li>
            ))}
          </ul>
        </div>

        <div className="user-name">
          <span>{task.userName}</span>
        </div>
        <div className="email">
          <span>{task.email}</span>
        </div>
      </div>
      <div className="row center right">
        <span>{task.text} </span>
      </div>
    </div>
  );
};

export default Task;

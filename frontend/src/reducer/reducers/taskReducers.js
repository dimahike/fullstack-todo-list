import {
  CHANGE_TASK_FAIL,
  CHANGE_TASK_REQUEST,
  CHANGE_TASK_SUCCESS,
  CHANGE_TASK_RESET,
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_RESET,
  EDIT_TASK,
  RESET_EDIT_TASK,
  TASK_LIST_FAIL,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
} from '../constants/taskListConstants';

export const taskListReducer = (state = { loading: true, tasks: [] }, action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { loading: true };
    case TASK_LIST_SUCCESS:
      return {
        loading: false,
        tasks: action.payload.tasks,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case TASK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const changeTaskReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case CHANGE_TASK_REQUEST:
      return { loading: true };
    case CHANGE_TASK_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case CHANGE_TASK_FAIL:
      return { loading: false, error: action.payload };
    case CHANGE_TASK_RESET:
      return { loading: false };
    default:
      return state;
  }
};

export const createTaskReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return { loading: true };
    case CREATE_TASK_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case CREATE_TASK_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_TASK_RESET:
      return { loading: false };
    default:
      return state;
  }
};

export const editTaskReducer = (state = false, action) => {
  switch (action.type) {
    case EDIT_TASK:
      return { task: action.payload };
    case RESET_EDIT_TASK:
      return false;
    default:
      return state;
  }
};

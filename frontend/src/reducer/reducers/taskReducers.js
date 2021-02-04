import {
  CHANGE_STATUS_FAIL,
  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
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

export const changeStatusReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case CHANGE_STATUS_REQUEST:
      return { loading: true };
    case CHANGE_STATUS_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case CHANGE_STATUS_FAIL:
      return { loading: false, error: action.payload };
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
    default:
      return state;
  }
};

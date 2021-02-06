import Axios from 'axios';
import {
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  CHANGE_TASK_REQUEST,
  CHANGE_TASK_SUCCESS,
  CHANGE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  CHANGE_TASK_RESET,
  RESET_EDIT_TASK,
} from '../constants/taskListConstants.js';

export const taskList = ({ pageNumber = 1, sort = 'userName', order = 'lowest' }) => async (
  dispatch,
) => {
  dispatch({
    type: TASK_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/tasks/?pageNumber=${pageNumber}&sortBy=${sort}&order=${order}`,
    );

    dispatch({
      type: TASK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const changeTask = (task) => async (dispatch, getState) => {
  dispatch({ type: CHANGE_TASK_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await Axios.put(`/api/tasks/${task._id}`, task, {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    });

    dispatch({
      type: CHANGE_TASK_SUCCESS,
      payload: data,
    });
    dispatch({ type: CHANGE_TASK_RESET });
    dispatch({ type: RESET_EDIT_TASK });
  } catch (error) {
    dispatch({
      type: CHANGE_TASK_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createTask = (task) => async (dispatch, getState) => {
  dispatch({ type: CREATE_TASK_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await Axios.post(`/api/tasks`, task, {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    });

    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: data,
    });
    dispatch({ type: CHANGE_TASK_RESET });
    dispatch({ type: RESET_EDIT_TASK });
  } catch (error) {
    dispatch({
      type: CREATE_TASK_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

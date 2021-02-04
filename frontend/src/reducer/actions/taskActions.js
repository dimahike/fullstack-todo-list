import Axios from 'axios';
import {
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
} from '../constants/taskListConstants.js';

export const taskList = ({ pageNumber = 1, sort = 'userName', order = 'lowest' }) => async (
  dispatch,
) => {
  console.log({ pageNumber, sort, order });
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

export const changeStatus = (status, taskId) => async (dispatch, getState) => {
  dispatch({ type: CHANGE_STATUS_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await Axios.put(
      `/api/tasks/${taskId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      },
    );

    console.log('Changed status from reuest', data);

    dispatch({
      type: CHANGE_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_STATUS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createTask = (task) => async (dispatch) => {
  dispatch({ type: CREATE_TASK_REQUEST });

  try {
    const { data } = await Axios.post(`/api/tasks`, task);

    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_TASK_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

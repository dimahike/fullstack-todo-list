import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  changeStatusReducer,
  createTaskReducer,
  taskListReducer,
} from './reducers/taskReducers.js';
import { userRegisterReducer, userSigninReducer } from './reducers/userReaducers.js';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
};

const reducer = combineReducers({
  taskList: taskListReducer,
  changeStatus: changeStatusReducer,
  createTask: createTaskReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;

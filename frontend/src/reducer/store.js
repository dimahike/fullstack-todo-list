import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import {withExtraArgument} from 'redux-thunk';
import {
  changeTaskReducer,
  createTaskReducer,
  editTaskReducer,
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
  changeTask: changeTaskReducer,
  createTask: createTaskReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  editTask: editTaskReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(withExtraArgument())));

export default store;

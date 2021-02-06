import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskList } from '../reducer/actions/taskActions';
import SortPopup from '../components/SortPopup';
import Task from '../components/Task';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import CreatorTask from '../components/TaskForm';
import Pagination from '../components/Pagination';
import { sortItems } from '../data.js';

const HomePage = () => {
  const [selectedPage, setSelectedPage] = useState();
  const [sortBy, setSortBy] = useState('userName');
  const [orderDicrIncr, setOrderDicrIncr] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const { loading, tasks, page, pages, error } = useSelector((state) => state.taskList);
  const { success: successCreateTask } = useSelector((state) => state.createTask);
  const { success: successChangeStatus } = useSelector((state) => state.changeTask);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskList({ pageNumber: selectedPage, sort: sortBy, order: orderDicrIncr }));
  }, [dispatch, successCreateTask, selectedPage, sortBy, orderDicrIncr, successChangeStatus]);

  const selectPage = (page) => {
    setSelectedPage(page);
  };

  const onSelectSortPopup = React.useCallback((sort) => {
    setSortBy(sort);
  }, []);

  const decrIncrOrder = React.useCallback((decrIncr) => {
    setOrderDicrIncr(decrIncr);
  }, []);

  return (
    <div className="paper">
      <div>
        <CreatorTask />
        <div className="row space-btw mt-4">
          <h1>Task list</h1>
          <SortPopup
            onClickSortPopup={onSelectSortPopup}
            activeSortType={sortBy}
            items={sortItems}
            decrIncr={decrIncrOrder}
          />
        </div>

        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          tasks.map((task) => (
            <Task key={task._id} task={task} admin={userInfo && userInfo.isAdmin} />
          ))
        )}
        <Pagination page={page} pages={pages} selectPage={selectPage} />
      </div>
    </div>
  );
};

export default HomePage;

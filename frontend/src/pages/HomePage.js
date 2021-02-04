import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskList } from '../reducer/actions/taskActions';
import SortPopup from '../components/SortPopup';
import Task from '../components/Task';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import CreatorTask from '../components/CreatorTask';
import Pagination from '../components/Pagination';
import { sortItems } from '../data.js';

const HomePage = () => {
  const [selectedPage, setSelectedPage] = useState();
  const [sortBy, setSortBy] = useState('userName');
  const [orderDicrIncr, setOrderDicrIncr] = useState('');
  const { loading: loadingStatus, success: successStatus, error: errorStatus } = useSelector(
    (state) => state.changeStatus,
  );

  const { loading, tasks, page, pages, error } = useSelector((state) => state.taskList);
  const { success: successCreateTask } = useSelector((state) => state.createTask);
  const { success: successChangeStatus } = useSelector((state) => state.changeStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskList({ pageNumber: selectedPage, sort: sortBy, order: orderDicrIncr }));
  }, [dispatch, successCreateTask, successChangeStatus, selectedPage, sortBy, orderDicrIncr]);

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
        <div className="row space-btw">
          <h1>Task list</h1>
          <SortPopup
            onClickSortPopup={onSelectSortPopup}
            activeSortType={sortBy}
            items={sortItems}
            decrIncr={decrIncrOrder}
          />
        </div>
        {loadingStatus && <LoadingBox />}
        {errorStatus ? (
          <MessageBox variant="danger">{errorStatus}</MessageBox>
        ) : (
          successStatus && <MessageBox variant="success">{successStatus.message}</MessageBox>
        )}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          tasks.map((task) => <Task key={task._id} task={task} />)
        )}
        <Pagination page={page} pages={pages} selectPage={selectPage} />
      </div>
    </div>
  );
};

export default HomePage;

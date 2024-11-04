import React, { useEffect, useState } from 'react';
import Column from './Column';
import { fetchTasks } from '../utils/api';
import { loadState, saveState } from '../utils/storage';
import { groupTasks } from '../utils/helpers';
import { DragDropContext } from 'react-beautiful-dnd';

const LOCAL_STORAGE_KEY = "kanbanBoardState";

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    const storedState = loadState(LOCAL_STORAGE_KEY);
    if (storedState) {
      setTasks(storedState);
    } else {
      fetchTasks().then(data => setTasks(data));
    }
  }, []);

  useEffect(() => {
    saveState(LOCAL_STORAGE_KEY, tasks);
  }, [tasks]);

  const onGroupChange = (e) => setGroupBy(e.target.value);
  const onSortChange = (e) => setSortBy(e.target.value);

  const groupedTasks = groupTasks(tasks, groupBy, sortBy);

  return (
    <div>
      <div className="controls">
        <label>
          Group by:
          <select value={groupBy} onChange={onGroupChange}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <label>
          Sort by:
          <select value={sortBy} onChange={onSortChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>
      <DragDropContext>
        <div className="board">
          {Object.entries(groupedTasks).map(([group, groupTasks]) => (
            <Column key={group} id={group} tasks={groupTasks} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;

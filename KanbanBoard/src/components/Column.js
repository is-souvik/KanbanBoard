import React from 'react';
import Task from './Task';

const Column = ({ id, tasks }) => (
  <div className="column">
    <h2>{id}</h2>
    {tasks.map(task => (
      <Task key={task.id} task={task} />
    ))}
  </div>
);

export default Column;

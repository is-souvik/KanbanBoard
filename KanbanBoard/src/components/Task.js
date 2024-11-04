import React from 'react';

const Task = ({ task }) => (
  <div className="task">
    <h3>{task.title}</h3>
    <p>Priority: {task.priority}</p>
  </div>
);

export default Task;

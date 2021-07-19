import React, { useContext } from 'react';
import TodoCtx from '../store/todo-context';

import classes from './Task.module.css';

const Task = (props) => {
  const todoCtx = useContext(TodoCtx);

  return (
    <div className={classes.task} onClick={() => todoCtx.deleteTask(props.id)}>
      <span>{props.content}</span>{' '}
      <span className={classes.date}>
        {props.date + ' '} {props.time}
      </span>
    </div>
  );
};

export default Task;

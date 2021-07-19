import React, { useContext } from 'react';
import Card from '../UI/Card';
import Task from './Task';
import TodoCtx from '../store/todo-context';

import classes from './TodoList.module.css';

const TodoList = () => {
  const todoCtx = useContext(TodoCtx);

  const tasks = todoCtx.tasks.map((task) => {
    return (
      <li key={task.id}>
        <Task {...task}></Task>
      </li>
    );
  });
  return (
    <Card>
      <div className={classes['todo-list']}>
        <ul>{tasks}</ul>
      </div>
    </Card>
  );
};

export default TodoList;

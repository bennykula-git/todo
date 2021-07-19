import React from 'react';

import classes from './Todo.module.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Todo = () => {
  return (
    <div className={classes.todo}>
      <h2>To Do List</h2>
      <TodoForm></TodoForm>
      <TodoList></TodoList>
    </div>
  );
};

export default Todo;

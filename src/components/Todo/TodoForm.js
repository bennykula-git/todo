import React, { useRef, useEffect, useContext } from 'react';
import Card from '../UI/Card';
import TodoCtx from '../store/todo-context';

import classes from './TodoForm.module.css';

const TodoForm = () => {
  const todoCtx = useContext(TodoCtx);
  const inputRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [todoCtx.tasks]);

  const addTaskHandler = (event) => {
    event.preventDefault();

    if (inputRef.current.value.trim().length === 0) {
      inputRef.current.focus();
      return;
    }
    if (dateRef.current.value.trim().length === 0) {
      dateRef.current.focus();
      return;
    }
    if (timeRef.current.value.trim().length === 0) {
      timeRef.current.focus();
      return;
    }

    const newTask = {
      content: inputRef.current.value,
      date: dateRef.current.value,
      time: timeRef.current.value,
    };
    todoCtx.addTask(newTask);

    inputRef.current.value = '';
    dateRef.current.value = '';
    timeRef.current.value = '';
  };

  return (
    <Card>
      <form className={classes['my-form']} onSubmit={addTaskHandler}>
        <input type='text' ref={inputRef} placeholder='Enter Task'></input>
        <input type='date' ref={dateRef}></input>
        <input type='time' ref={timeRef}></input>
        <button type='submit'>Add</button>
      </form>
    </Card>
  );
};

export default TodoForm;

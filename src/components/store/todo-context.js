import React, { useReducer, useEffect } from 'react';

const server = 'http://localhost:8080';

const TodoCtx = React.createContext({
  tasks: [],
  addTask: (task) => {},
  deleteTask: (id) => {},
});

export default TodoCtx;

const initState = {
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH':
      return { tasks: action.tasks };
    case 'ADD':
      const newStasks = [action.task, ...state.tasks];
      newStasks.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        }
        if (b.date > a.date) {
          return -1;
        }
        if (a.time > b.time) {
          return 1;
        }
        if (b.time > a.time) {
          return -1;
        }
        return 0;
      });
      return { tasks: newStasks };
    case 'DELETE':
      return { tasks: state.tasks.filter((task) => task.id !== action.id) };
    default:
      return initState;
  }
};

export const TodoCtxProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const addTaskHandler = (task) => {
    sendToServerAndSave(task);
  };
  const deleteTaskHandler = (id) => {
    deleteFromServer(id);
    dispatch({ type: 'DELETE', id: id });
  };

  useEffect(() => {
    fetchFromServer();
  }, []);

  const sendToServerAndSave = async (newTask) => {
    try {
      const response = await fetch(server + '/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error('Unable to add new task');
      }
      const id = await response.json();
      newTask.id = id;
      dispatch({ type: 'ADD', task: newTask });
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteFromServer = async (id) => {
    try {
      const respnse = await fetch(server + '/api/' + id, {
        method: 'DELETE',
      });
      if (!respnse.ok) {
        throw new Error('unable to delete');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchFromServer = async () => {
    try {
      const response = await fetch(server + '/api');
      if (!response.ok) {
        throw new Error('unable to fetch');
      }
      const tasks = await response.json();
      dispatch({ type: 'FETCH', tasks: tasks });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TodoCtx.Provider
      value={{
        tasks: state.tasks,
        addTask: addTaskHandler,
        deleteTask: deleteTaskHandler,
      }}
    >
      {props.children}
    </TodoCtx.Provider>
  );
};

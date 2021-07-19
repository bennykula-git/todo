import { TodoCtxProvider } from './components/store/todo-context';
import Todo from './components/Todo/Todo';

function App() {
  return (
    <TodoCtxProvider>
      <Todo></Todo>
    </TodoCtxProvider>
  );
}

export default App;

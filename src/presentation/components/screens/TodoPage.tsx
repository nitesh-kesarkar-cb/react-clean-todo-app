import { useState } from 'react';
import { useTodoViewModel } from '../../../hooks/useTodoViewModel';
import TodoItem from '../../components/TodoItem';

const TodoPage = () => {
  const { todos, loading, addTodo, toggleTodo } = useTodoViewModel();
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (title.trim()) {
      addTodo(title);
      setTitle('');
    }
  };

  return (
    <div>
      <h1>ToDo App</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={() => toggleTodo(todo.id)} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoPage;

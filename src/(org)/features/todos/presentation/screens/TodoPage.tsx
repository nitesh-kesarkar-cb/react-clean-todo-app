import { useState } from 'react';
import { useTodoViewModel } from '../../hooks/useTodoViewModel';
import TodoItem from '../_components/TodoItem';
import './TodoPage.css';

const TodoPage = () => {
  const { todos, loading, addTodo, toggleTodo, clearTodos } = useTodoViewModel();
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (title.trim()) {
      addTodo(title);
      setTitle('');
      // throw new Error('Simulated error for testing Sentry');
    }
  };

  return (
    <div className="todo-app">
      <div className="todo-header">
        <h1>Organisation ToDo App</h1>
        <button onClick={clearTodos} className="clear-button">Clear All</button>
      </div>
      <div className="todo-controls">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter a task..."
          onKeyDown={e => {
            if (e.key === 'Enter') handleAdd();
          }}
        />
        <button onClick={handleAdd}>Add</button>
        
      </div>

       {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p className="empty-message">No todos found.</p>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={() => toggleTodo(todo.id)} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoPage;

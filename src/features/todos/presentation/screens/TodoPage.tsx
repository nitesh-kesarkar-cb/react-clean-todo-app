import { useEffect, useState } from 'react';
import { useTodoViewModel } from '../../hooks/useTodoViewModel';
import TodoItem from '../TodoItem';
import './TodoPage.css';
import { useFlags } from 'flagsmith/react';
import { useNavigate } from '@tanstack/react-router';

const TodoPage = () => {
  const { todos, loading, addTodo, toggleTodo, clearTodos } = useTodoViewModel();
  const [title, setTitle] = useState('');
  const flags = useFlags(['todo']);
  const navigate = useNavigate();
 
   useEffect(() => {
     if (!flags.todo?.enabled) {
        console.warn('Todo feature is disabled. Redirecting to login.');
        navigate({ to: '/login' });
    }
   }, [flags]);

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
        <h1>ToDo App</h1>
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

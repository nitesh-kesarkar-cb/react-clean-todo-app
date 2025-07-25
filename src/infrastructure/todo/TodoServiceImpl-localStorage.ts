import type { Todo } from '../../domain/models/Todo';
import type { TodoService } from '../../domain/services/TodoService';

const STORAGE_KEY = 'clean_todo_list';

let todos: Todo[] = [];

const loadFromStorage = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      todos = JSON.parse(raw);
    } catch {
      todos = [];
    }
  }
};

const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

loadFromStorage();

export const TodoServiceImpl: TodoService = {
  async getTodos() {
    return todos;
  },

  async addTodo(title) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    todos.push(newTodo);
    saveToStorage();
    return newTodo;
  },

  async toggleTodo(id) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveToStorage();
  },

  async clearTodos() {
    todos = [];
    saveToStorage();
  }
};

import type { Todo } from '../../domain/models/Todo';
import type { TodoService } from '../../domain/services/TodoService';

let todos: Todo[] = [];

export const TodoServiceImpl: TodoService = {
  async getTodos() {
    console.log('Fetching todos...', todos);
    return todos;
  },
  async addTodo(title) {
    const newTodo: Todo = { id: crypto.randomUUID(), title, completed: false };
    todos.push(newTodo);
    console.log('newTodo...', newTodo);
    return newTodo;
  },
  async toggleTodo(id) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    console.log('Updated todos...', todos);
  },
};

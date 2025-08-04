import type { TodoService } from '../../domain/services/TodoService';

const API_KEY = import.meta.env.VITE_CRUDCRUD_API_KEY;
const BASE_URL = `https://crudcrud.com/api/${API_KEY}/todos`;

export type ApiTodo = {
  _id: string;
  title: string;
  completed: boolean;
};

export const TodoServiceImpl: TodoService = {
  async getTodos() {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return data.map((todo: ApiTodo) => ({
      id: todo._id,
      title: todo.title,
      completed: todo.completed,
    }));
  },
  async addTodo(title: string) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false }),
    });
    const data = await res.json();
    return {
      id: data._id,
      title: data.title,
      completed: data.completed,
    };
  },
  async toggleTodo(id: string) {
    const res = await fetch(`${BASE_URL}/${id}`);
    const todo = await res.json();
   const updated = {
    title: todo.title,
    completed: !todo.completed,
  };
    await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
  },

  async clearTodos() {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    await Promise.all(
      data.map((todo: any) =>
        fetch(`${BASE_URL}/${todo._id}`, { method: 'DELETE' })
      )
    );
  }
};

import type { TodoService } from '../../domain/services/TodoService';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_CRUDCRUD_API_KEY;
const BASE_URL = `https://crudcrud.com/api/${API_KEY}/todos`;

export type ApiTodo = {
  _id: string;
  title: string;
  completed: boolean;
};

export const TodoServiceImpl: TodoService = {
  async getTodos() {
    const res = await axios.get(BASE_URL);
    const data = res.data;
    return data.map((todo: ApiTodo) => ({
      id: todo._id,
      title: todo.title,
      completed: todo.completed,
    }));
  },
  async addTodo(title: string) {
    const res = await axios.post(BASE_URL, { title, completed: false });
    const data = res.data;
    return {
      id: data._id,
      title: data.title,
      completed: data.completed,
    };
  },
  async toggleTodo(id: string) {
    const res = await axios.get(`${BASE_URL}/${id}`);
    const todo = res.data;
    const updated = {
      title: todo.title,
      completed: !todo.completed,
    };
    await axios.put(`${BASE_URL}/${id}`, updated);
  },

  async clearTodos() {
    const res = await axios.get(BASE_URL);
    const data = res.data;
    await Promise.all(
      data.map((todo: unknown) =>
        axios.delete(`${BASE_URL}/${(todo as { _id: string })._id}`)
      )
    );
  }
};

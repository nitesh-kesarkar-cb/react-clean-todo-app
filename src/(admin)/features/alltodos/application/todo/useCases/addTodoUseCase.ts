import { container } from '../../../di/container';

export const addTodoUseCase = {
  execute: (title: string) => {
    return container.todoService.addTodo(title);
  },
};
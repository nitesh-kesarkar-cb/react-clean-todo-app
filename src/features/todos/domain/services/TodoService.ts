import type { Todo } from '../models/Todo'

export interface TodoService {
    getTodos(): Promise<Todo[]>
    addTodo(title: string): Promise<Todo>
    toggleTodo(id: string): Promise<void>
    clearTodos(): Promise<void>
}

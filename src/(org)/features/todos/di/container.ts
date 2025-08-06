import type { TodoService } from '../domain/services/TodoService'
import { TodoServiceImpl as MemoryService } from '../infrastructure/todo/TodoServiceMemory'
import { TodoServiceImpl as LocalStorageService } from '../infrastructure/todo/TodoServiceLocalStorage'
import { TodoServiceImpl as CrudCrudService } from '../infrastructure/todo/TodoServiceCrudCrud'

const backend = import.meta.env.VITE_TODO_BACKEND

let todoService: TodoService

switch (backend) {
    case 'crudcrud':
        todoService = CrudCrudService
        break
    case 'local':
        todoService = LocalStorageService
        break
    case 'memory':
    default:
        todoService = MemoryService
        break
}

export const container = {
    todoService,
}

import { container } from '../../../di/container'

export const toggleTodoUseCase = {
    execute: (id: string) => {
        return container.todoService.toggleTodo(id)
    },
}

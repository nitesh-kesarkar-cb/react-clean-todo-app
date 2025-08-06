// hooks/useTodoViewModel.ts
import { useEffect, useState } from 'react'
import type { Todo } from '../domain/models/Todo'
import { container } from '../di/container'
import { addTodoUseCase } from '../application/todo/useCases/addTodoUseCase'
import { toggleTodoUseCase } from '../application/todo/useCases/toggleTodoUseCase'

export const useTodoViewModel = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(true)

    const fetchTodos = async () => {
        const list = await container.todoService.getTodos()
        setTodos(list)
        setLoading(false)
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    const addTodo = async (title: string) => {
        await addTodoUseCase.execute(title)
        await fetchTodos()
    }

    const toggleTodo = async (id: string) => {
        await toggleTodoUseCase.execute(id)
        await fetchTodos()
    }

    const clearTodos = async () => {
        await container.todoService.clearTodos()
        await fetchTodos()
    }

    return { todos, loading, addTodo, toggleTodo, clearTodos }
}

import { useState } from 'react'
import { useTodoViewModel } from '../../hooks/useTodoViewModel'
import TodoItem from '../_components/TodoItem'
import IdleTimerContainer from '../../../../../shared/components/IdleTimerContainer'
import Navbar from '@/shared/components/Navbar'
const TodoPage = () => {
    const { todos, loading, addTodo, toggleTodo, clearTodos } =
        useTodoViewModel()
    const [title, setTitle] = useState('')
    const menuItems = [{ label: 'Todos', href: '/org/todos' }]

    const handleAdd = () => {
        if (title.trim()) {
            addTodo(title)
            setTitle('')
        }
    }

    return (
        <>
            <IdleTimerContainer />
            <div>
                <Navbar menuItems={menuItems} />
            </div>
            <div className="todo-app">
                <div className="todo-header">
                    <h1>ToDo App</h1>
                    <button onClick={clearTodos} className="clear-button">
                        Clear All
                    </button>
                </div>
                <div className="todo-controls">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter a task..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAdd()
                        }}
                    />
                    <button onClick={handleAdd}>Add</button>
                </div>

                {(() => {
                    if (loading) {
                        return <p>Loading...</p>
                    }

                    if (todos.length === 0) {
                        return <p className="empty-message">No todos found.</p>
                    }

                    return (
                        <ul className="todo-list">
                            {todos.map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onToggle={() => toggleTodo(todo.id)}
                                />
                            ))}
                        </ul>
                    )
                })()}
            </div>
        </>
    )
}

export default TodoPage

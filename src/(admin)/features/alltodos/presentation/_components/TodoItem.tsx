import type { Todo } from '../../domain/models/Todo'

type Props = {
    todo: Todo
    onToggle: () => void
}

const TodoItem = ({ todo, onToggle }: Props) => (
    <li className="todo-item">
        <button
            type="button"
            className="todo-toggle-btn"
            onClick={onToggle}
            aria-pressed={todo.completed}
        >
            <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                tabIndex={-1}
            />
            <span className={todo.completed ? 'completed' : ''}>
                {todo.title}
            </span>
        </button>
    </li>
)

export default TodoItem

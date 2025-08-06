import type { Todo } from '../../domain/models/Todo';

type Props = {
    todo: Todo
    onToggle: () => void
}

const TodoItem = ({ todo, onToggle }: Props) => (
    <li className="todo-item" onClick={onToggle}>
        <input type="checkbox" checked={todo.completed} readOnly />
        <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
    </li>
)

export default TodoItem

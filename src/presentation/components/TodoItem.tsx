import type { Todo } from '../../domain/models/Todo';

type Props = {
  todo: Todo;
  onToggle: () => void;
};

const TodoItem = ({ todo, onToggle }: Props) => (
  <li onClick={onToggle} style={{ cursor: 'pointer' }}>
    <input type="checkbox" checked={todo.completed} readOnly />
    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {todo.title}
    </span>
  </li>
);

export default TodoItem;

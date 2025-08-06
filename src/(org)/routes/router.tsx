import {
  createRoute,
} from '@tanstack/react-router';

import TodoPage from '../features/todos/presentation/screens/TodoPage';
import { orgRoute, RequireAuth } from '../../routes/router';

const todosRoute = createRoute({
  getParentRoute: () => orgRoute,
  path: 'todos',
  component: () => (
    <RequireAuth allowedRoles={['org']}>
      <TodoPage />
    </RequireAuth>
  ),
});

export { todosRoute, }
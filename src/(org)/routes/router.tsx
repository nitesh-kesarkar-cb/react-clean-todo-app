import {
  createRouter,
  createRoute,
  Outlet,
  createRootRoute,
} from '@tanstack/react-router';

import TodoPage from '../features/todos/presentation/screens/TodoPage';
import { RequireAuth } from '../../routes/router';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const adminRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'admin',
  component: () => (
    <RequireAuth allowedRoles={['admin']}>
      <Outlet />
    </RequireAuth>
  ),
});
const todosRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: 'todos',
  component: () => (
    <RequireAuth allowedRoles={['admin']}>
      <TodoPage />
    </RequireAuth>
  ),
});

const routeTree = rootRoute.addChildren([adminRootRoute.addChildren([todosRoute])]);

export const adminRouter = createRouter({ routeTree });
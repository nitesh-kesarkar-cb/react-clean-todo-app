import {
  createRoute,
  Outlet,
  createRootRoute,
} from '@tanstack/react-router';

import TodoPage from '../features/alltodos/presentation/screens/TodoPage';
import { RequireAuth } from '../../routes/router';
import { rootRoute } from '../../routes/router';

// const rootRoute = createRootRoute({
//   component: () => <Outlet />,
// });

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
  path: 'alltodos',
  component: () => (
    <RequireAuth allowedRoles={['admin']}>
      <TodoPage />
    </RequireAuth>
  ),
});

export const adminRouteTree = rootRoute.addChildren([adminRootRoute.addChildren([todosRoute])]);
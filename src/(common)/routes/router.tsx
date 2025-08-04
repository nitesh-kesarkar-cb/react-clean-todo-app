import {
  createRouter,
  createRoute,
  Outlet,
  createRootRoute,
} from '@tanstack/react-router';
import LoginPage from '../features/auth/presentation/screens/LoginPage';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const commonRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'common',
  component: () => (
      <Outlet />
  ),
});
const todosRoute = createRoute({
  getParentRoute: () => commonRootRoute,
  path: 'login',
  component: () => (
      <LoginPage />
  ),
});

export const commonRouteTree = rootRoute.addChildren([commonRootRoute.addChildren([todosRoute])]);


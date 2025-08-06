import {
  createRouter,
  createRoute,
  Outlet,
  Navigate,
  createRootRoute,
} from '@tanstack/react-router';
import { allTodosRoute } from '../(admin)/routes/router';
import { loginRoute } from '../(common)/routes/router';
import { todosRoute } from '../(org)/routes/router';
import { useStorage } from '../shared/hoc/useStorageContext';
import type { UserProfile } from '../(common)/features/user/di/UserInterface';

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
  errorComponent: ({ error, reset }) => {
    return (
      <div>
        {error.message}
        <button
          onClick={() => {
            reset
          }}
        >
          Retry
        </button>
      </div>
    )
  },
});

export const RequireAuth = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const storage = useStorage();
  const user = storage.getItem<UserProfile>("user-profile");
  const userRole = user?.role;

  console.log('User:', user);

  if (!userRole) {
    return <Navigate to="/common/login" />;
  }
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <div>Not authorized</div>;
  }
  return <>{children}</>;
};

// Index route: redirect to login if not logged in, or to role dashboard if logged in
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    const storage = useStorage();
    const user = storage.getItem<UserProfile>("user-profile");
    const userRole = user?.role;
      console.log('User:', user);
    if (!userRole) {
      return <Navigate to="/common/login" />;
    }
    switch (userRole) {
      case 'admin':
        return <Navigate to="/admin/alltodos" />;
      case 'org':
        return <Navigate to="/org/todos" />;
      default:
        return <Navigate to="/common/login" />;
    }
  },
});

// Login route
export const commonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'common',
});

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'admin',
  component: () => (
    <RequireAuth allowedRoles={['admin']}>
      <Outlet />
    </RequireAuth>
  ),
});

export const orgRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'org',
  component: () => (
    <RequireAuth allowedRoles={['org']}>
      <Outlet />
    </RequireAuth>
  ),
});

// Build route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  commonRoute.addChildren([
    loginRoute
  ]),
  adminRoute.addChildren([
    allTodosRoute
  ]),
  orgRoute.addChildren([
    todosRoute
  ]),
]);

export const router = createRouter({ routeTree });
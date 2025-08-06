import {
  createRouter,
  createRoute,
  Outlet,
  Navigate,
  createRootRoute,
} from '@tanstack/react-router';
import { allTodosRoute } from '../(admin)/routes/router';
import { loginRoute, userDetailsRoute } from '../(common)/routes/router';
import { todosRoute } from '../(org)/routes/router';
import { useAuthContext } from '../shared/hoc/useAuthContext';

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
  const { getUserProfile } = useAuthContext();
  const user = getUserProfile();
  const userRole = user?.role;

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
    const { getUserProfile } = useAuthContext();
    const user = getUserProfile();
    const userRole = user?.role;
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
    loginRoute,
    userDetailsRoute,
  ]),
  adminRoute.addChildren([
    allTodosRoute
  ]),
  orgRoute.addChildren([
    todosRoute
  ]),
]);

export const router = createRouter({ routeTree });
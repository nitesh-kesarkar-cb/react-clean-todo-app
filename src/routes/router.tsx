import {
  createRouter,
  createRoute,
  Outlet,
  Navigate,
  createRootRoute,
} from '@tanstack/react-router';
import LoginPage from '../(common)/features/auth/presentation/screens/LoginPage';
import { adminRouteTree } from '../(admin)/routes/router';

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
});
// Dummy auth function (replace with your real auth logic)
const getUser = () => {
  try {
    console.log('Fetching user role from localStorage', localStorage.getItem('role'));
    return JSON.parse(localStorage.getItem('role') || 'null');
  } catch {
    return null;
  }
};

getUser(); // Call to initialize user role
export const RequireAuth = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const userRole = getUser();
  if (!userRole) {
    return <Navigate to="/login" />;
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
    const userRole = getUser();
    console.log('User role:', userRole);
    if (!userRole) {
      return <Navigate to="/login" />;
    }
    switch (userRole) {
      case 'admin':
        return <Navigate to="/admin" />;
      case 'org':
        return <Navigate to="/org" />;
      case 'common':
        return <Navigate to="/common" />;
      default:
        return <Navigate to="/login" />;
    }
  },
});

// Login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'login',
  component: LoginPage,
});

// Admin root and dashboard
// const adminRootRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: 'admin',
//   component: () => (
//     <RequireAuth allowedRoles={['admin']}>
//       <Outlet />
//     </RequireAuth>
//   ),
// });
// const adminDashboardRoute = createRoute({
//   getParentRoute: () => adminRootRoute,
//   path: '/',
//   component: Alltodos,
// });

// Org root and dashboard
const orgRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'org',
  component: () => (
    <RequireAuth allowedRoles={['org']}>
      <Outlet />
    </RequireAuth>
  ),
});
// const orgDashboardRoute = createRoute({
//   getParentRoute: () => orgRootRoute,
//   path: '/',
//   component: OrgDashboard,
// });

// // Common root and dashboard
// const commonRootRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: 'common',
//   component: () => (
//     <RequireAuth allowedRoles={['common']}>
//       <Outlet />
//     </RequireAuth>
//   ),
// });
// const commonDashboardRoute = createRoute({
//   getParentRoute: () => commonRootRoute,
//   path: '/',
//   component: CommonDashboard,
// });



// Build route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  adminRouteTree,
    // adminRootRoute.addChildren([adminDashboardRoute]),
  // orgRootRoute.addChildren([orgDashboardRoute]),
  // commonRootRoute.addChildren([commonDashboardRoute]),
]);

export const router = createRouter({ routeTree });
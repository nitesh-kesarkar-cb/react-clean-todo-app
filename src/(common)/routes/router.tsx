import {
  createRoute,
  Outlet,
} from '@tanstack/react-router';

import { commonRoute, RequireAuth } from '../../routes/router';
import LoginPage from '../features/auth/presentation/screens/LoginPage';

const loginRoute = createRoute({
  getParentRoute: () => commonRoute,
  path: 'login',
  component: () => <LoginPage />,
});

const userDetailsRoute = createRoute({
  getParentRoute: () => commonRoute,
  path: 'user-details',
  component: () => (
    <RequireAuth allowedRoles={['admin', 'org']}>
      <Outlet />
    </RequireAuth>
  )
});



//// user-list screen -> role specific access, and role specific actions

/// add rtt for user-list screen
/// use context for user

/// add , edit, delete, csv/pdf export,

/// local store encrypted 

export { loginRoute, userDetailsRoute };
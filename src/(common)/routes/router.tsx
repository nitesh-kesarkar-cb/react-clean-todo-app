import {
  createRoute,
} from '@tanstack/react-router';

import { commonRoute, RequireAuth } from '../../routes/router';
import LoginPage from '../features/auth/presentation/screens/LoginPage';
import UserProfilePage from '../features/user/presentation/screens/UserProfile';

const loginRoute = createRoute({
  getParentRoute: () => commonRoute,
  path: 'login',
  component: () => <LoginPage />,
});

const userDetailsRoute = createRoute({
  getParentRoute: () => commonRoute,
  path: 'user-details',
  component: () => <RequireAuth allowedRoles={['admin', 'org']}><UserProfilePage /></RequireAuth>,
});



//// user-list screen -> role specific access, and role specific actions

/// add rtt for user-list screen
/// add , edit, delete, csv/pdf export,

export { loginRoute, userDetailsRoute };
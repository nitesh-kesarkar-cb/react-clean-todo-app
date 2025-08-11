import {
  createRoute,
} from '@tanstack/react-router';

import { commonRoute, RequireAuth } from '../../routes/router';
import LoginPage from '../features/auth/presentation/screens/LoginPage';
import UserProfilePage from '../features/user/presentation/screens/UserProfile';
import Graph from '../features/graphs/presentation/screens/Graph';


/// these are all abac

/// login route
const loginRoute = createRoute({
  getParentRoute: () => commonRoute,
  path: 'login',
  component: () => <LoginPage />,
});
// /common/user-details route
const userDetailsRoute = createRoute({
  getParentRoute: () => commonRoute,
  path: 'user-details',
  component: () => <RequireAuth allowedRoles={['admin', 'org']}><UserProfilePage /></RequireAuth>,
});

const graphListRoute = createRoute({
  getParentRoute: () => commonRoute,
  path: 'graphs',
  component: () => <RequireAuth allowedRoles={['admin', 'org', 'common']}><Graph /></RequireAuth>,
});

export { loginRoute, userDetailsRoute, graphListRoute };
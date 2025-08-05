import {
  createRoute,
} from '@tanstack/react-router';

import { commonRoute } from '../../routes/router';
import LoginPage from '../features/auth/presentation/screens/LoginPage';

const loginRoute = createRoute({
  getParentRoute: () => commonRoute,
  path: 'login',
  component: () => <LoginPage />,
});


export { loginRoute, }
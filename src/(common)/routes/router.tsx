import { createRoute } from '@tanstack/react-router'

import { commonRoute } from '../../routes/router'
import { RequireRole } from '../../routes/guards'
import LoginPage from '../features/auth/presentation/screens/LoginPage'
import UserProfilePage from '../features/user/presentation/screens/UserProfile'

const loginRoute = createRoute({
    getParentRoute: () => commonRoute,
    path: 'login',
    component: () => <LoginPage />,
})
// /common/user-details route
const userDetailsRoute = createRoute({
    getParentRoute: () => commonRoute,
    path: 'user-details',
    component: () => (
        <RequireRole allowedRoles={['admin', 'org']}>
            <UserProfilePage />
        </RequireRole>
    ),
})

//// user-list screen -> role specific access, and role specific actions

/// add rtt for user-list screen
/// add , edit, delete, csv/pdf export,

export { loginRoute, userDetailsRoute }

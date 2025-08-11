import { createRoute } from '@tanstack/react-router'

import { commonRoute } from '../../routes/router'
import { RequireRole } from '../../routes/guards'
import UserProfilePage from '../features/user/presentation/screens/UserProfile'
import { MapPage } from '../features/map/MapPage'
import Login from '@/features/auth/components/Login'
// import Dashboard from '@/features/dashboard/components/Dashboard'
import DashboardPage from '@/features/dashboard/components/DashboardPage'

const loginRoute = createRoute({
    getParentRoute: () => commonRoute,
    path: 'login',
    component: () => <Login />,
})

const mapRoute = createRoute({
    getParentRoute: () => commonRoute,
    path: 'map',
    component: () => <MapPage />,
})

const dashbordRoute = createRoute({
    getParentRoute: () => commonRoute,
    path: 'dashboard',
    component: () => <DashboardPage />,
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

export { loginRoute, userDetailsRoute, mapRoute, dashbordRoute }

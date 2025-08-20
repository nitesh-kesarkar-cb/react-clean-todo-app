import { createRoute } from '@tanstack/react-router'

import { commonRoute } from '../../routes/router'
import LoginPage from '../features/auth/presentation/screens/LoginPage'
import UserProfilePage from '../features/user/presentation/screens/UserProfile'
import UserProfileDetailsPage from '../features/user/presentation/screens/UserProfileDetails'
import Graph from '../features/graphs/presentation/screens/Graph'
import { RequireRole } from '../../routes/guards'
import { MapPage } from '../features/map/MapPage'

/// these are all abac

/// login route
const loginRoute = createRoute({
    getParentRoute: () => commonRoute,
    path: 'login',
    component: () => <LoginPage />,
})

const mapRoute = createRoute({
    getParentRoute: () => commonRoute,
    path: 'map',
    component: () => <MapPage />,
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

const graphListRoute = createRoute({
    getParentRoute: () => commonRoute,
    path: 'graphs',
    component: () => (
        <RequireRole allowedRoles={['admin', 'org', 'common']}>
            <Graph />
        </RequireRole>
    ),
})

const profileRoute = createRoute({
    getParentRoute: () => commonRoute,
    path: 'profile',
    component: () => (
        <RequireRole allowedRoles={['admin', 'org', 'common']}>
            <UserProfileDetailsPage />
        </RequireRole>
    ),
})

export { loginRoute, userDetailsRoute, graphListRoute, mapRoute, profileRoute }

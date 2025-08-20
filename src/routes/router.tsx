import {
    createRouter,
    createRoute,
    Outlet,
    createRootRoute,
} from '@tanstack/react-router'
import { allTodosRoute } from '../(admin)/routes/router'
import {
    loginRoute,
    userDetailsRoute,
    mapRoute,
    graphListRoute,
    profileRoute,
} from '../(common)/routes/router'
import { todosRoute } from '../(org)/routes/router'
import { RequireRole, IndexLanding } from './guards'

export const rootRoute = createRootRoute({
    component: () => <Outlet />,
    errorComponent: ({ error, reset }) => (
        <div>
            {error.message}
            <button onClick={reset}>Retry</button>
        </div>
    ),
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: IndexLanding,
})

export const commonRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'common',
})

export const adminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'admin',
    component: () => (
        <RequireRole allowedRoles={['admin']}>
            <Outlet />
        </RequireRole>
    ),
})

export const orgRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'org',
    component: () => (
        <RequireRole allowedRoles={['org']}>
            <Outlet />
        </RequireRole>
    ),
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    commonRoute.addChildren([
        loginRoute,
        userDetailsRoute,
        mapRoute,
        graphListRoute,
        profileRoute,
    ]),
    adminRoute.addChildren([allTodosRoute]),
    orgRoute.addChildren([todosRoute]),
])

export const router = createRouter({ routeTree })

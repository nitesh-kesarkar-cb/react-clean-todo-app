import {
    createRouter,
    createRoute,
    RootRoute,
    Outlet,
    Navigate,
} from '@tanstack/react-router'

import TodoPage from '../features/todos/presentation/screens/TodoPage'
import LoginPage from '../features/auth/presentation/screens/LoginPage'
import { MapPage } from '../features/map/MapPage'
import LanguageSelector from '../shared/components/LanguageSelector'

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const rootRoute = new RootRoute({
    component: () => {
        return (
            <>
                <LanguageSelector />
                <Outlet />
            </>
        )
    },
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <Navigate to="/login" />,
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'login',
    component: LoginPage,
})

const todosRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'todos',
    component: TodoPage,
})

const mapsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'maps',
    component: MapPage,
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    todosRoute,
    loginRoute,
    mapsRoute,
])

export const router = createRouter({ routeTree })

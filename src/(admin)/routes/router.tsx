import { createRoute } from '@tanstack/react-router'

import TodoPage from '../features/alltodos/presentation/screens/TodoPage'
import { RequireAuth } from '../../routes/guards'
import { adminRoute } from '../../routes/router'

const allTodosRoute = createRoute({
    getParentRoute: () => adminRoute,
    path: 'alltodos',
    component: () => (
        <RequireAuth>
            <TodoPage />
        </RequireAuth>
    ),
})

export { allTodosRoute }

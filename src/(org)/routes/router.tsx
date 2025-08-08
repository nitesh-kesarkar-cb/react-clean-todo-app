import { createRoute } from '@tanstack/react-router'

import TodoPage from '../features/todos/presentation/screens/TodoPage'
import { orgRoute } from '../../routes/router'
import { RequireAuth } from '../../routes/guards'

const todosRoute = createRoute({
    getParentRoute: () => orgRoute,
    path: 'todos',
    component: () => (
        <RequireAuth>
            <TodoPage />
        </RequireAuth>
    ),
})

export { todosRoute }

// src/shared/guards.tsx

import { Navigate } from '@tanstack/react-router'
import { useAuthContext } from './../shared/hoc/useAuthContext'

// 🔐 Auth Guard: Checks if user is logged in
export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const { getUserProfile } = useAuthContext()
    const user = getUserProfile()

    if (!user?.role) {
        return <Navigate to="/common/login" />
    }

    return <>{children}</>
}

// 🔐 Role-Based Guard: Checks if user has specific roles
export const RequireRole = ({
    children,
    allowedRoles,
}: {
    children: React.ReactNode
    allowedRoles: string[]
}) => {
    const { getUserProfile } = useAuthContext()
    const role = getUserProfile()?.role

    if (!role) {
        return <Navigate to="/common/login" />
    }

    if (!allowedRoles.includes(role)) {
        return (
            <div className="text-center text-red-600 mt-10">Not authorized</div>
        )
    }

    return <>{children}</>
}

// 🧭 Entry Point Redirector: Role-based redirection from "/"
export const IndexLanding = () => {
    const { getUserProfile } = useAuthContext()
    const role = getUserProfile()?.role

    if (!role) {
        return <Navigate to="/common/login" replace />
    }

    const routeMap: Record<string, string> = {
        admin: '/admin/alltodos',
        org: '/org/todos',
    }

    return <Navigate to={routeMap[role] ?? '/common/login'} replace />
}

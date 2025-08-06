import React, { type ErrorInfo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import type { UserRole } from '../_constants/enums'


interface FallbackProps {
    error: Error
    resetErrorBoundary: () => void
}

export function AccessFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div role="alert" style={{ padding: 16, textAlign: 'center' }}>
            <h2>Something went wrong</h2>
            <pre style={{ color: 'red' }}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Retry</button>
        </div>
    )
}

interface RoleBasedAccessProps {
    userRole: UserRole
    allowRoles: UserRole[]
    onError?: (error: Error, info: ErrorInfo) => void
    children: React.ReactNode
}

export function RoleBasedAccessComponent({
    userRole,
    allowRoles,
    onError,
    children,
}: RoleBasedAccessProps) {
    if (!canViewRoles(userRole, allowRoles)) {
        // return <div>Access denied</div>
        return null
    }

    return (
        <ErrorBoundary
            FallbackComponent={AccessFallback}
            onError={onError}
        >
            {children}
        </ErrorBoundary>
    )
}
function canViewRoles(userRole: UserRole, allowRoles: UserRole[]): boolean {
    return allowRoles.includes(userRole)
}
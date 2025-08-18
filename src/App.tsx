import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/router'
import { withSentryBoundary } from './shared/hoc/withSentryBoundary'
import './i18n'
import './App.css'
import { StorageProvider } from './shared/hoc/useStorageContext'
import { AuthProvider } from './shared/hoc/useAuthContext'
import { ReactQueryClientProvider } from './shared/hoc/reactQueryClient'
// import { generateToken, messaging } from './shared/_utils/firebase'
// import { useEffect } from 'react'
// import { onMessage, type MessagePayload } from 'firebase/messaging'
// import { showNotification } from './shared/services/notificationService'

const WrappedRouterProvider = withSentryBoundary(RouterProvider)

function App() {
    // useEffect(() => {
    //   generateToken()
    //   onMessage(messaging, onMessageReceived)
    // }, [])

    // const onMessageReceived = (payload: MessagePayload) => {
    //   console.log('Message received:', payload)
    //   showNotification(payload)
    // }

    return (
        <StorageProvider>
            <ReactQueryClientProvider>
                <AuthProvider>
                    <WrappedRouterProvider router={router} />
                </AuthProvider>
            </ReactQueryClientProvider>
        </StorageProvider>
    )
}

export default App

import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/router'
import { withSentryBoundary } from './shared/hoc/withSentryBoundary'
import './i18n'
import './App.css'

const WrappedRouterProvider = withSentryBoundary(RouterProvider)

function App() {
    return <WrappedRouterProvider router={router} />
}

export default App

import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/router'
import { withSentryBoundary } from './shared/hoc/withSentryBoundary'
import './i18n'
import './App.css'
import { StorageProvider } from './shared/hoc/useStorageContext';
import { AuthProvider } from './shared/hoc/useAuthContext';
import { ReactQueryClientProvider } from './shared/hoc/reactQueryClient'

const WrappedRouterProvider = withSentryBoundary(RouterProvider)


function App() {
  return (
    <StorageProvider>
      <ReactQueryClientProvider>
        <AuthProvider>
          <WrappedRouterProvider router={router} />
        </AuthProvider>
      </ReactQueryClientProvider>
    </StorageProvider>
  );
}

export default App;

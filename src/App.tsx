import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/router'
import { withSentryBoundary } from './shared/hoc/withSentryBoundary'
import './i18n'
import './App.css'
import { StorageProvider } from './shared/hoc/useStorageContext';
import { AuthProvider } from './shared/hoc/useAuthContext';

const WrappedRouterProvider = withSentryBoundary(RouterProvider)


function App() {
  return (
    <StorageProvider>
      <AuthProvider>
        <WrappedRouterProvider router={router} />
      </AuthProvider>
    </StorageProvider>
  );
}

export default App;

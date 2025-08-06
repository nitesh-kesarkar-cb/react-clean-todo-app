
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/router';
import { withSentryBoundary } from './shared/hoc/withSentryBoundary';
import './i18n';
import './App.css'
import LanguageSelector from './shared/components/LanguageSelector';

const WrappedRouterProvider = withSentryBoundary(RouterProvider);

function App() {
  return <>
    <LanguageSelector />
    <WrappedRouterProvider router={router} />
  </>;
}

export default App;

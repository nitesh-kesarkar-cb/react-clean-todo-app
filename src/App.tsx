
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/router';
import { SentryBoundary } from './shared/components/SentryBoundary';
import flagsmith from 'flagsmith';
import { FlagsmithProvider } from 'flagsmith/react';
import './App.css'

function App() {
  return (
    <FlagsmithProvider flagsmith={flagsmith} options={{
        environmentID: import.meta.env.VITE_FLAGSMITH_ENVIRONMENT_ID,
          onChange: () => {
            const flags = flagsmith.getAllFlags();
            console.log('Flagsmith all flags:', flags);
          }
      }}
    >
      <SentryBoundary>
        <RouterProvider router={router} />
      </SentryBoundary>
    </FlagsmithProvider>
  );
}

export default App;


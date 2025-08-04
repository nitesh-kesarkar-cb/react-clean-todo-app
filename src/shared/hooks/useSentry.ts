import { useEffect } from 'react';
import * as Sentry from '@sentry/react';

export function useSentry() {
  useEffect(() => {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 1.0,
      sendDefaultPii: true,
    });
  }, []);
}

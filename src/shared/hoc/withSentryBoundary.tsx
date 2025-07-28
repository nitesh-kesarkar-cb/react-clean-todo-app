import React from 'react';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

export function withSentryBoundary<P>(Component: React.ComponentType<P>) {
  return function WrappedWithSentry(props: React.PropsWithChildren<P>) {
    return (
      <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
        <Component {...props} />
      </Sentry.ErrorBoundary>
    );
  }
}

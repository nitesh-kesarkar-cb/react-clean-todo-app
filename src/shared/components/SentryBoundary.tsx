import React from 'react';
import * as Sentry from '@sentry/react';
import { useSentry } from '../hooks/useSentry'; // import the hook you just created

interface SentryBoundaryProps {
  fallback?: React.ReactElement | Sentry.FallbackRender;
  children: React.ReactNode;
}

export function SentryBoundary({ fallback = <p>Something went wrong.</p>, children }: SentryBoundaryProps) {
  useSentry();

  return (
    <Sentry.ErrorBoundary fallback={fallback}>
      {children}
    </Sentry.ErrorBoundary>
  );
}

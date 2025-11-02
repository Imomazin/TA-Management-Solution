'use client';

import * as Sentry from '@sentry/nextjs';
import React from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureException(error);
  }

  return (
    <html>
      <body style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <h2>Something went wrong.</h2>
        <p>We’ve logged the issue and will look into it.</p>
      </body>
    </html>
  );
}

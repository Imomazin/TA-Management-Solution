import * as Sentry from '@sentry/nextjs';

// Called by Next.js automatically at server startup
export async function register() {
  if (!process.env.SENTRY_DSN) return;

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.1, // tune if needed
    debug: false,
  });
}

// Capture server-side routing and request errors
export function onRequestError(err: unknown) {
  if (!process.env.SENTRY_DSN) return;
  Sentry.captureRequestError(err);
}

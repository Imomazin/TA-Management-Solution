/** @type {import('next').NextConfig} */
const nextConfig = {
  // Safe, modern defaults
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,

  // Enable only the experiments you actually use
  experimental: {
    // You had `clientTraceMetadata` on already; keep if you need it
    clientTraceMetadata: true,
  },

  // If you customize webpack, keep this no-op so it's easy to extend later
  webpack: (config) => config,
};

// Optional: enable Sentry only when SENTRY_DSN exists.
// This avoids build-time warnings if you don't use Sentry yet.
const enableSentry = Boolean(process.env.SENTRY_DSN);

let exportConfig = nextConfig;

if (enableSentry) {
  try {
    const { withSentryConfig } = require('@sentry/nextjs');

    // Do NOT set authToken unless you actually want to upload source maps.
    // If you don't, Sentry will warn but everything else will work.
    exportConfig = withSentryConfig(
      nextConfig,
      {
        // Sentry build options
        // org: 'your-org',      // only required if uploading source maps
        // project: 'your-proj', // only required if uploading source maps
        // authToken: process.env.SENTRY_AUTH_TOKEN, // optional; omit if you don’t want to upload source maps
        silent: true, // reduce noisy Sentry logs
      },
      {
        // Next.js options
        disableLogger: true,
        hideSourcemaps: true,
      },
    );
  } catch {
    // If @sentry/nextjs is not installed, fall back gracefully
    exportConfig = nextConfig;
  }
}

module.exports = exportConfig;

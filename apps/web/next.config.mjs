import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const disableStandalone = process.env.NEXT_DISABLE_STANDALONE === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(disableStandalone ? {} : { output: 'standalone' }),
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../')
  },
  poweredByHeader: false,
  transpilePackages: ['@clientiaffidabili/shared'],
  images: {
    unoptimized: true
  },
  async headers() {
    const browserPermissionPolicy = [
      'publickey-credentials-get=()',
      'identity-credentials-get=()',
      'payment=()',
      'usb=()',
      'serial=()',
      'hid=()',
      'bluetooth=()',
      'local-fonts=()'
    ].join(', ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Permissions-Policy', value: browserPermissionPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ]
      }
    ];
  }
};

export default nextConfig;

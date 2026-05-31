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
  }
};

export default nextConfig;

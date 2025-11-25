/** @type {import('next').NextConfig} */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  turbopack: {}, // Silence warning about custom webpack config when using Turbopack
};

export default nextConfig;

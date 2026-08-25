const basePath = process.env.VERCEL === '1' ? '' : '/Febrio';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

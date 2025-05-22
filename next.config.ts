/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@myvideo/api',
    '@myvideo/domain',
    '@myvideo/core',
    '@myvideo/presentation',
    '@myvideo/authenticator',
    '@myvideo/analytics',
    
  ],
};

export default nextConfig;
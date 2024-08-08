/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.ipfs.4everland.io',
                port: '',
                pathname: '/**',
            }
        ]
    }
};

export default nextConfig;

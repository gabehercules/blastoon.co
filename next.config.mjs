/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.ipfs.4everland.io',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'api.multiavatar.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.seadn.io',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/btoon-api/image/**',
            }
        ]
    }
};

export default nextConfig;
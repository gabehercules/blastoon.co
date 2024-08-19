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
            }
        ]
    }
};

export default nextConfig;

"https://i.seadn.io/s/raw/files/ccc65818847fecdf5038fcb56ae915d6.png"
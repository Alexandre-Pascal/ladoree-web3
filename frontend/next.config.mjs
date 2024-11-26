/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'uploads2.wikiart.org',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.museumtv.art',
                pathname: '/**',
            }

        ],
    },
}

export default nextConfig;

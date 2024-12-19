/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
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
            },
            {
                protocol: 'https',
                hostname: 'www.museumtv.art',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'misterprepa.net',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.moma.org',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.f1g.fr',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.connaissancedesarts.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'indigo-hidden-meerkat-77.mypinata.cloud',
                pathname: '/**',
            }
        ],
    },
}

export default nextConfig;

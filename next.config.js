/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['flowbite.com', 'supportcommunity.xyz'],
        // path: '/_next/image',
        // remotePatterns: [
        //     {
        //         protocol: 'http',
        //         hostname: '*.flowbite.com',
        //         port: '',
        //         pathname: '/docs/images/people/**',
        //     },
        // ],
    },
    poweredByHeader: false,
    reactStrictMode: true,
    env: {
        ENV: process.env.NEXT_PUBLIC_ENV,
        API_URL: process.env.NEXT_PUBLIC_API_URL,
        PUSHER_APP_ID: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
        PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
        PUSHER_SECRET: process.env.NEXT_PUBLIC_PUSHER_SECRET,
        PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        FACEBOOK_CLIENT_ID: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
        FACEBOOK_CLIENT_SECRET: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
        SECRET: process.env.NEXT_PUBLIC_SECRET,
        CRYPTOJS_KEY: process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
    },
    experimental: {
        serverActions: true,
    },
    swcMinify: true,
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [
            {
                source: '/signup',
                destination: '/auth/signup',
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/auth/login',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
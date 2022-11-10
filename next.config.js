/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'links.papareact.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/**'
      }
    ]
  },
  env: {
    NEXT_STRIPE_PUBLIC_KEY: process.env.NEXT_STRIPE_PUBLIC_KEY
  }
}

module.exports = nextConfig

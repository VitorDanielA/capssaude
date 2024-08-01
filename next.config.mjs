//import { createProxyMiddleware } from 'http-proxy-middleware';

export async function rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8080/:path*',
    },
  ];
}

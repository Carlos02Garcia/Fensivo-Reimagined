import { defineNitroConfig } from 'nitro/config';

export default defineNitroConfig({
  // Override the default Cloudflare preset from lovable config
  preset: 'node-server',
  // Ensure it listens on all interfaces
  host: '0.0.0.0',
  // Use PORT env var if set (Railway sets this), otherwise default to 3000
  port: parseInt(process.env.PORT || '3000'),
  // Don't prerender - keep as dynamic SSR app
  prerender: {
    crawlLinks: false,
    routes: [],
    ignore: ['/rpc', '/admin'],
  },
});

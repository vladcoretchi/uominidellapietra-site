import { defineConfig } from 'astro/config';

// Static build served by Cloudflare Workers static assets
export default defineConfig({
  site: 'https://www.uominidellapietra.it',
  output: 'static',
  trailingSlash: 'ignore',
});

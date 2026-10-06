import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static build served by Cloudflare Workers static assets
export default defineConfig({
  site: 'https://www.uominidellapietra.it',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';

export default defineConfig({
  site: 'https://kernia.com.br/',
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
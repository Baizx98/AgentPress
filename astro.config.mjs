import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://blog.bzx.cool',
  integrations: [expressiveCode(), mdx(), sitemap()],
  adapter: vercel(),
  markdown: unified({
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  }),
  output: 'static',
});

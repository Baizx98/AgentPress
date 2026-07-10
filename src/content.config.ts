import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const common = z.object({
  title: z.string(),
  description: z.string().max(200),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  author: z.string().default('白卓新'),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(true),
  featured: z.boolean().default(false),
  language: z.enum(['zh-CN', 'en']).default('zh-CN'),
  cover: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.discriminatedUnion('type', [
    common.extend({
      type: z.literal('paper'),
      paperTitle: z.string(),
      authors: z.array(z.string()).min(1),
      affiliations: z.array(z.string()).min(1),
      venue: z.string(),
      publicationDate: z.coerce.date(),
      doi: z.string().optional(),
      paperUrl: z.string().url().optional(),
    }),
    common.extend({
      type: z.literal('technical-report'),
      repository: z.string().url().optional(),
      demoUrl: z.string().url().optional(),
      projectStatus: z.enum(['ongoing', 'released', 'archived']).default('ongoing'),
      highlights: z.array(z.string()).max(3).default([]),
    }),
    common.extend({ type: z.literal('note') }),
    common.extend({
      type: z.literal('blog'),
      series: z.enum(['daily-brief', 'general']).default('general'),
    }),
  ]),
});

export const collections = { posts };

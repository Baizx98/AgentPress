import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const common = z.object({
  title: z.string(),
  description: z.string().max(200),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  author: z.string().default('今夜白'),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(true),
  featured: z.boolean().default(false),
  language: z.enum(['zh-CN', 'en']).default('zh-CN'),
  cover: z.string().optional(),
  canonicalUrl: z.url().optional(),
  sourceKey: z.string().max(500).optional(),
  agent: z.object({
    summary: z.string().max(500).optional(),
    sourceQuality: z.enum(['personal', 'curated', 'verified']).default('personal'),
    reuseLevel: z.enum(['low', 'medium', 'high']).default('medium'),
    citeAs: z.string().optional(),
    related: z.array(z.string()).default([]),
  }).default({
    sourceQuality: 'personal',
    reuseLevel: 'medium',
    related: [],
  }),
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
      paperUrl: z.url().optional(),
    }),
    common.extend({
      type: z.literal('technical-report'),
      repository: z.url().optional(),
      demoUrl: z.url().optional(),
      projectStatus: z.enum(['ongoing', 'released', 'archived']).default('ongoing'),
      highlights: z.array(z.string()).max(3).default([]),
    }),
    common.extend({ type: z.literal('note') }),
    common.extend({
      type: z.literal('blog'),
      series: z.enum(['daily-brief', 'general']).optional(),
    }),
  ]),
});

export const collections = { posts };

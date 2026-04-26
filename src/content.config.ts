import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(['MODELOS', 'SEGURANÇA', 'OPEN SOURCE', 'TRABALHO', 'NEGÓCIOS', 'POLÍTICA', 'PESQUISA']),
    tags: z.array(z.string()),
    excerpt: z.string(),
    source: z.url().optional(),
    image: z.url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };

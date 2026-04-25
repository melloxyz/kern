import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(['MODELOS', 'SEGURANÇA', 'OPEN SOURCE', 'TRABALHO', 'NEGÓCIOS', 'POLÍTICA', 'PESQUISA']),
    tags: z.array(z.string()),
    excerpt: z.string(),
    source: z.string().url().optional(),
    image: z.string().url().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };

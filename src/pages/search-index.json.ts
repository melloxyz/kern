import { getCollection } from 'astro:content';

export const GET = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const index = posts.map(p => ({
    slug:     p.slug,
    title:    p.data.title,
    excerpt:  p.data.excerpt,
    category: p.data.category,
    date:     p.data.date.toISOString().slice(0, 10),
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};

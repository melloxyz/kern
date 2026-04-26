import { getCollection } from 'astro:content';
import { getReadingTime } from '../utils/posts';

export const GET = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const index = posts.map(p => ({
    id:       p.id,
    title:    p.data.title,
    excerpt:  p.data.excerpt,
    category: p.data.category,
    tags:     p.data.tags,
    content:  p.body,
    date:     p.data.date.toISOString().slice(0, 10),
    readingTime: getReadingTime(p.body || '')
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};

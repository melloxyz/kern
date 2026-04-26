import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  
  // Sort posts by date descending
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'KERN',
    description: 'Menos hype. Mais contexto.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/posts/${post.id}`,
    })),
    customData: `<language>pt-BR</language>`,
  });
}

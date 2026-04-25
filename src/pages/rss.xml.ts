import { getCollection, type CollectionEntry } from "astro:content";

type Post = CollectionEntry<"posts">;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const siteUrl = "https://ruidoia.com.br";

  const posts = (
    await getCollection("posts", (entry: Post) => !entry.data.draft)
  ).sort((a: Post, b: Post) => b.data.date.getTime() - a.data.date.getTime());

  const items = posts
    .map((post: Post) => {
      const postUrl = `${siteUrl}/posts/${post.slug}`;
      const title = escapeXml(post.data.title);
      const description = escapeXml(post.data.excerpt);
      const pubDate = post.data.date.toUTCString();

      return `
<item>
  <title>${title}</title>
  <link>${postUrl}</link>
  <guid>${postUrl}</guid>
  <pubDate>${pubDate}</pubDate>
  <description>${description}</description>
</item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>RuídoIA</title>
    <link>${siteUrl}</link>
    <description>Inteligência artificial sem enrolação.</description>
    <language>pt-BR</language>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

import { getCollection, type CollectionEntry } from 'astro:content';

export const CATEGORIES = [
  { slug: 'modelos', category: 'MODELOS', label: 'Modelos' },
  { slug: 'seguranca', category: 'SEGURANÇA', label: 'Segurança' },
  { slug: 'open-source', category: 'OPEN SOURCE', label: 'Open Source' },
  { slug: 'trabalho', category: 'TRABALHO', label: 'Trabalho' },
  { slug: 'negocios', category: 'NEGÓCIOS', label: 'Negócios' },
  { slug: 'politica', category: 'POLÍTICA', label: 'Política' },
  { slug: 'pesquisa', category: 'PESQUISA', label: 'Pesquisa' },
];

export const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

export async function getPublishedPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function getActivePathState(pathname: string) {
  let activeCatSlug: string | null = null;
  let activeYear: string | null = null;
  let activeMonth: string | null = null;

  const normalizedPath = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;

  const archiveMatch = normalizedPath.match(/^\/arquivo\/(\d{4})\/(\d{2})(?:\/([^/]+))?$/);
  if (archiveMatch) {
    activeYear = archiveMatch[1];
    activeMonth = archiveMatch[2];
    if (archiveMatch[3]) {
      activeCatSlug = archiveMatch[3];
    }
  } else {
    const catMatch = normalizedPath.match(/^\/([^/]+)$/);
    if (catMatch && CATEGORIES.some(c => c.slug === catMatch[1])) {
      activeCatSlug = catMatch[1];
    }
  }

  return { activeYear, activeMonth, activeCatSlug };
}

export function getCategoryLinks(allPosts: CollectionEntry<'posts'>[], activeYear: string | null, activeMonth: string | null) {
  const catCounts: Record<string, number> = {};
  for (const cat of CATEGORIES) catCounts[cat.category] = 0;
  let totalPostsInContext = 0;

  for (const post of allPosts) {
    const postYear = String(post.data.date.getFullYear());
    const postMonth = String(post.data.date.getMonth() + 1).padStart(2, '0');
    
    if (activeYear && activeMonth) {
      if (postYear === activeYear && postMonth === activeMonth) {
        if (catCounts[post.data.category] !== undefined) catCounts[post.data.category]++;
        totalPostsInContext++;
      }
    } else {
      if (catCounts[post.data.category] !== undefined) catCounts[post.data.category]++;
      totalPostsInContext++;
    }
  }

  return [
    { 
      href: (activeYear && activeMonth) ? `/arquivo/${activeYear}/${activeMonth}` : '/', 
      label: 'Todos', 
      cat: null as string | null,
      slug: null as string | null,
      count: totalPostsInContext
    },
    ...CATEGORIES.map(c => ({
      href: (activeYear && activeMonth) ? `/arquivo/${activeYear}/${activeMonth}/${c.slug}` : `/${c.slug}`,
      label: c.label,
      cat: c.category,
      slug: c.slug,
      count: catCounts[c.category]
    }))
  ];
}

export function getArchiveLinks(allPosts: CollectionEntry<'posts'>[], activeCatSlug: string | null, activeYear: string | null) {
  const archiveMap = new Map();

  for (const post of allPosts) {
    if (activeCatSlug) {
      const catObj = CATEGORIES.find(c => c.slug === activeCatSlug);
      if (catObj && post.data.category !== catObj.category) {
        continue;
      }
    }

    const y = String(post.data.date.getFullYear());
    const m = String(post.data.date.getMonth() + 1).padStart(2, '0');
    const key = `${y}-${m}`;
    
    if (!archiveMap.has(key)) {
      archiveMap.set(key, {
        label: `${y} — ${MONTHS_PT[Number(m) - 1]}`,
        year: y, month: m, count: 0,
        href: activeCatSlug ? `/arquivo/${y}/${m}/${activeCatSlug}` : `/arquivo/${y}/${m}`,
        key
      });
    }
    archiveMap.get(key).count++;
  }

  return [...archiveMap.values()].filter(entry => (
    activeYear ? entry.year === activeYear : true
  ));
}

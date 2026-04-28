import { getCollection, type CollectionEntry } from "astro:content";

export const CATEGORIES = [
  { 
    slug: "modelos", 
    category: "MODELOS", 
    label: "Modelos",
    icon: "Cpu",
    description: "Exploração técnica de LLMs, arquiteturas de redes neurais e o estado da arte da inteligência sintética."
  },
  { 
    slug: "seguranca", 
    category: "SEGURANÇA", 
    label: "Segurança",
    icon: "ShieldCheck",
    description: "Alinhamento, riscos existenciais e a defesa de sistemas contra vetores de ataque baseados em IA."
  },
  { 
    slug: "open-source", 
    category: "OPEN SOURCE", 
    label: "Open Source",
    icon: "CodeXml",
    description: "O movimento de democratização da IA, pesos abertos e o ecossistema colaborativo global."
  },
  { 
    slug: "trabalho", 
    category: "TRABALHO", 
    label: "Trabalho",
    icon: "Briefcase",
    description: "Impactos socioeconômicos, automação de tarefas e a evolução das carreiras na era da pós-eficiência."
  },
  { 
    slug: "negocios", 
    category: "NEGÓCIOS", 
    label: "Negócios",
    icon: "TrendingUp",
    description: "Análise de mercado, investimentos em tecnologia e as novas verticais de valor criadas pela IA."
  },
  { 
    slug: "politica", 
    category: "POLÍTICA", 
    label: "Política",
    icon: "Landmark",
    description: "Regulamentação, soberania tecnológica e o impacto da inteligência artificial nas democracias."
  },
  { 
    slug: "pesquisa", 
    category: "PESQUISA", 
    label: "Pesquisa",
    icon: "Beaker",
    description: "Novos papers, descobertas fundamentais e a ciência teórica que move a fronteira do possível."
  },
];

export const MONTHS_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function getReadingTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min`;
}

export async function getPublishedPosts() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getRecentPosts(limitDays = 3) {
  const allPosts = await getPublishedPosts();
  const now = new Date();
  const threshold = new Date(now);
  threshold.setDate(now.getDate() - limitDays);
  threshold.setHours(0, 0, 0, 0);

  let filtered = allPosts.filter((p) => p.data.date >= threshold);
  if (filtered.length === 0) {
    filtered = allPosts;
  }
  return filtered;
}

export function getActivePathState(pathname: string) {
  let activeCatSlug: string | null = null;
  let activeYear: string | null = null;
  let activeMonth: string | null = null;

  const normalizedPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const archiveMatch = normalizedPath.match(
    /^\/arquivo\/(\d{4})\/(\d{2})(?:\/([^/]+))?$/,
  );
  if (archiveMatch) {
    activeYear = archiveMatch[1];
    activeMonth = archiveMatch[2];
    if (archiveMatch[3]) {
      activeCatSlug = archiveMatch[3];
    }
  } else {
    const catMatch = normalizedPath.match(/^\/([^/]+)$/);
    if (catMatch && CATEGORIES.some((c) => c.slug === catMatch[1])) {
      activeCatSlug = catMatch[1];
    }
  }

  return { activeYear, activeMonth, activeCatSlug };
}

export function getCategoryLinks(
  allPosts: CollectionEntry<"posts">[],
  activeYear: string | null,
  activeMonth: string | null,
) {
  const catCounts: Record<string, number> = {};
  for (const cat of CATEGORIES) catCounts[cat.category] = 0;
  let totalPostsInContext = 0;

  for (const post of allPosts) {
    const postYear = String(post.data.date.getFullYear());
    const postMonth = String(post.data.date.getMonth() + 1).padStart(2, "0");

    if (activeYear && activeMonth) {
      if (postYear === activeYear && postMonth === activeMonth) {
        if (catCounts[post.data.category] !== undefined)
          catCounts[post.data.category]++;
        totalPostsInContext++;
      }
    } else {
      if (catCounts[post.data.category] !== undefined)
        catCounts[post.data.category]++;
      totalPostsInContext++;
    }
  }

  return [
    {
      href:
        activeYear && activeMonth
          ? `/arquivo/${activeYear}/${activeMonth}`
          : "/",
      label: "Todos",
      icon: "LayoutGrid",
      cat: null as string | null,
      slug: null as string | null,
      count: totalPostsInContext,
    },
    ...CATEGORIES.map((c) => ({
      href:
        activeYear && activeMonth
          ? `/arquivo/${activeYear}/${activeMonth}/${c.slug}`
          : `/${c.slug}`,
      label: c.label,
      icon: c.icon,
      cat: c.category,
      slug: c.slug,
      count: catCounts[c.category],
    })),
  ];
}

export function getArchiveLinks(
  allPosts: CollectionEntry<"posts">[],
  activeCatSlug: string | null,
  activeYear: string | null,
) {
  const archiveMap = new Map();

  for (const post of allPosts) {
    if (activeCatSlug) {
      const catObj = CATEGORIES.find((c) => c.slug === activeCatSlug);
      if (catObj && post.data.category !== catObj.category) {
        continue;
      }
    }

    const y = String(post.data.date.getFullYear());
    const m = String(post.data.date.getMonth() + 1).padStart(2, "0");
    const key = `${y}-${m}`;

    if (!archiveMap.has(key)) {
      archiveMap.set(key, {
        label: `${y} - ${MONTHS_PT[Number(m) - 1]}`, // e.g. "2026 - Janeiro"
        year: y,
        month: m,
        count: 0,
        href: activeCatSlug
          ? `/arquivo/${y}/${m}/${activeCatSlug}`
          : `/arquivo/${y}/${m}`,
        key,
      });
    }
    archiveMap.get(key).count++;
  }

  return [...archiveMap.values()].filter((entry) =>
    activeYear ? entry.year === activeYear : true,
  );
}

export function getRelatedPosts(
  currentPost: CollectionEntry<"posts">,
  allPosts: CollectionEntry<"posts">[],
  limit = 4,
) {
  const related = allPosts
    .filter((p) => p.id !== currentPost.id)
    .map((p) => {
      let score = 0;
      if (p.data.category === currentPost.data.category) score += 2;
      const commonTags = p.data.tags.filter((t) =>
        currentPost.data.tags.includes(t),
      );
      score += commonTags.length;
      return { post: p, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.date.getTime() - a.post.data.date.getTime())
    .slice(0, limit)
    .map((p) => p.post);

  return related;
}

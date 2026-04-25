# KERN.

Blog de inteligência artificial levada a sério.  
Slogan: **Filtramos apenas o que importa de verdade!**
Stack: **Astro** + **Vercel** + **Git** + Markdown puro.

---

## Fluxo de publicação

```
Escreve o .md  →  git push  →  Vercel builda  →  post no ar
```

Sem painel admin. Sem CMS. Sem dependências extras.

---

## Estrutura do projeto

```
kern/
├── src/
│   ├── components/         ← Componentes Astro (Header, Footer, etc)
│   ├── content/
│   │   └── posts/          ← AQUI ficam seus posts
│   ├── layouts/
│   │   └── Base.astro      ← Layout HTML base
│   ├── pages/
│   │   ├── index.astro     ← Feed principal
│   │   ├── sobre.astro     ← Página sobre
│   │   └── ...
│   ├── styles/
│   │   └── global.css      ← Todo o CSS do site
│   └── utils/
│       └── posts.ts        ← Lógica de processamento de posts
└── public/
    └── favicon.svg
```

---

## Criando um novo post

1. Crie um arquivo em `src/content/posts/`
2. Nome no formato: `YYYY-MM-DD-titulo-do-post.md`
3. Adicione o frontmatter obrigatório no topo:

```markdown
---
title: "Título completo do post"
date: 2026-04-25
category: MODELOS
tags: [OpenAI, agentes, GPT]
excerpt: "Resumo de 1-2 frases que aparece no feed. Seja direto."
source: "https://openai.com/blog/..."
featured: false
draft: false
---

Conteúdo do post aqui em Markdown normal.
```

### Categorias disponíveis

- `MODELOS`
- `SEGURANÇA`
- `OPEN SOURCE`
- `TRABALHO`
- `NEGÓCIOS`
- `POLÍTICA`
- `PESQUISA`

---

## Comandos Úteis

```bash
# Rodar em desenvolvimento
npm run dev

# Checagem de tipos e padrões
npm run check

# Build de produção
npm run build
```

---

## Customizações rápidas

**Logo do site:** O logo é definido no CSS (`.dot`) e nos componentes `Header.astro` e `Footer.astro`.

**Mudar cores:** edite as variáveis CSS em `src/styles/global.css` na seção `:root`.

**Adicionar categoria nova:** edite o `z.enum` em `src/content/config.ts` e o objeto `CATEGORIES` em `src/utils/posts.ts`.

**Domínio customizado:** configure em Vercel → Project Settings → Domains.

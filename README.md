# KERN.IA

Blog de inteligência artificial sem enrolação.  
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
kern-ia/
├── src/
│   ├── content/
│   │   └── posts/              ← AQUI ficam seus posts
│   │       ├── 2026-04-24-gpt55-lancado.md
│   │       ├── 2026-04-23-mythos-restrito.md
│   │       └── 2026-04-22-deepseek-v4.md
│   ├── layouts/
│   │   └── Base.astro          ← Layout HTML base (header, nav, footer)
│   ├── pages/
│   │   ├── index.astro         ← Feed principal
│   │   ├── sobre.astro         ← Página sobre
│   │   ├── posts/[slug].astro  ← Página individual de cada post
│   │   └── tag/[tag].astro     ← Página de tag
│   └── styles/
│       └── global.css          ← Todo o CSS do site
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

### featured: true

Posts com `featured: true` aparecem no grid de destaque no topo do feed (máx. 2 por vez).  
Use com parcimônia — só pra notícias realmente importantes.

### draft: true

Posts com `draft: true` não aparecem no site. Use pra rascunhos.

---

## Setup local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento (http://localhost:4321)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## Deploy na Vercel

### Primeira vez

1. Crie um repositório no GitHub e faça push do projeto
2. Acesse [vercel.com](https://vercel.com) → **Add New Project**
3. Conecte o repositório
4. Framework: **Astro** (detectado automaticamente)
5. Clique em **Deploy**

### Publicando posts

```bash
# Cria o .md, depois:
git add .
git commit -m "post: título do post"
git push
```

A Vercel detecta o push e publica em ~30 segundos.

---

## Customizações rápidas

**Mudar nome do site:** edite `src/layouts/Base.astro` — procure por `KERN<span>.IA</span>`

**Mudar cores:** edite as variáveis CSS em `src/styles/global.css` na seção `:root`

**Adicionar categoria nova:** edite o `z.enum` em `src/content/config.ts` e o array `navLinks` em `Base.astro`

**Domínio customizado:** configure em Vercel → Project Settings → Domains

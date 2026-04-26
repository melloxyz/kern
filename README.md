<div align="center">

<pre>
██╗  ██╗███████╗██████╗ ███╗   ██╗   
██║ ██╔╝██╔════╝██╔══██╗████╗  ██║   
█████╔╝ █████╗  ██████╔╝██╔██╗ ██║   
██╔═██╗ ██╔══╝  ██╔══██╗██║╚██╗██║   
██║  ██╗███████╗██║  ██║██║ ╚████║██╗
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝
</pre>

<h3>KERN. — Sem Ads, Sem Paywall, Sem Enrolação.</h3>

![Astro Version](https://img.shields.io/badge/Astro-6.1.9-blue?logo=astro)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?logo=typescript)
![License](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey)
![Privacy](https://img.shields.io/badge/Privacy-Shield-green)

</div>

O **KERN.** é um blog editorial minimalista focado em curadoria de notícias sobre inteligência artificial. Em um mundo saturado de informação, o KERN. filtra o sinal do ruído, entregando apenas o que é tecnicamente relevante e estrategicamente vital.

---

## Tecnologias

![Astro](https://img.shields.io/badge/astro-%232C2231.svg?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![MDX](https://img.shields.io/badge/mdx-%23F9AC00.svg?style=for-the-badge&logo=mdx&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233E67B1.svg?style=for-the-badge&logo=zod&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

---

## Recursos Atuais

### Privacidade & Segurança

- **Zero Trackers:** Sem Google Analytics, sem pixels, sem cookies de rastreio.
- **Fontes Locais:** Todas as fontes (Source Serif 4) são hospedadas no próprio servidor para evitar vazamento de IP via Google Fonts.
- **Security Headers:** Implementação robusta de Content Security Policy (CSP) e Referrer Policy.

### Performance Extrema

- **100/100 Lighthouse:** Código otimizado para Core Web Vitals.
- **View Transitions:** Navegação fluida sem recarregamento de página via Astro ClientRouter.
- **Static First:** Geração estática total para entrega via edge.

### SEO & Social

- **JSON-LD Automático:** Dados estruturados do tipo `BlogPosting` em todos os artigos.
- **Metadados Sociais:** Tags Open Graph e Twitter Cards avançadas para previews ricas.
- **Compartilhamento Inteligente:** Suporte nativo para 7 redes sociais (X, Bluesky, Threads, LinkedIn, WhatsApp, Telegram e Facebook).

---

## Estrutura do Projeto

```text
kern/
├── src/
│   ├── content/
│   │   └── posts/          # Arquivos Markdown (.md) - O coração do site
│   ├── components/         # UI Components modulares (Share, RelatedPosts, etc)
│   ├── layouts/            # Layouts base com lógica de SEO e Meta
│   ├── pages/              # Rotas dinâmicas e estáticas
│   ├── styles/             # CSS minimalista e fontes locais
│   └── utils/              # Lógica de processamento, datas e filtragem
├── scripts/
│   └── new-post.mjs        # CLI Assistant para criação de conteúdo
├── public/                 # Assets estáticos (Robots, Sitemap, Favicon)
└── astro.config.mjs        # Configurações do motor Astro
```

---

## Desenvolvimento

### Instalação

```bash
git clone https://github.com/seu-usuario/kern.git
cd kern
npm install
```

### Comandos Principais

| Comando            | Descrição                                                |
| :----------------- | :------------------------------------------------------- |
| `npm run dev`      | Inicia o servidor de desenvolvimento em `localhost:4321` |
| `npm run build`    | Gera o build de produção na pasta `dist/`                |
| `npm run check`    | Executa validação de tipos e integridade do Astro        |
| `npm run new-post` | **Assistente CLI interativo para criar novos posts**     |

---

## Fluxo Editorial (CLI)

Para manter a padronização e agilidade, utilize nosso script de scaffolding:

```bash
npm run new-post
```

O assistente guiará você por:

1. **Título:** Define o nome do artigo.
2. **Categoria:** Seleção via menu (Modelos, Negócios, Política, etc).
3. **Tags:** Palavras-chave para SEO e relacionamento.
4. **Resumo:** Descrição para as previews sociais.

O arquivo será gerado automaticamente em `src/content/posts/` com o frontmatter completo e status de rascunho (`draft: true`).

---

## Governança e Contribuição

- **Licença:** Este projeto é distribuído sob a licença **Creative Commons Atribuição Não Comercial 4.0 Internacional (CC BY-NC 4.0)**.
- **Contribuições:** Bugs e sugestões são bem-vindos! Por favor, leia nosso guia de [CONTRIBUTING.md](./CONTRIBUTING.md).

---

_Kern (do alemão): Núcleo, essência._

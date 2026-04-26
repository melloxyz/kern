# Contribuindo para o KERN.

Ficamos felizes que você queira ajudar a tornar o KERN ainda melhor! Como um projeto focado em minimalismo e clareza, seguimos algumas diretrizes para manter a qualidade.

## Como contribuir?

### 1. Relatando Bugs ou Sugestões
Abra uma **Issue** descrevendo o problema ou a ideia. Seja o mais detalhado possível.

### 2. Enviando Pull Requests (PRs)
- Faça um **Fork** do repositório.
- Crie uma branch para sua modificação: `git checkout -b feature/minha-melhoria`.
- Mantenha o estilo de código existente (Astro, TypeScript, CSS puro).
- Certifique-se de que o comando `npm run check` passe sem erros.
- Envie seu PR com uma descrição clara do que foi alterado.

## Princípios de Design

- **Performance em Primeiro Lugar**: Evite dependências externas pesadas.
- **Privacidade por Padrão**: Não adicione trackers ou scripts de terceiros sem discussão prévia.
- **Minimalismo Editorial**: O foco é sempre no texto. O design deve servir ao conteúdo, não competir com ele.

## Fluxo de Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Verificar erros de tipo
npm run check
```

Agradecemos sua colaboração!

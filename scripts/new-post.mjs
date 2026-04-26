import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const CATEGORIES = ['MODELOS', 'SEGURANÇA', 'OPEN SOURCE', 'TRABALHO', 'NEGÓCIOS', 'POLÍTICA', 'PESQUISA'];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function ask(question, defaultValue = '') {
  return new Promise((resolve) => {
    rl.question(`${question}${defaultValue ? ` (${defaultValue})` : ''}: `, (answer) => {
      resolve(answer || defaultValue);
    });
  });
}

async function main() {
  console.log('\n🚀 Criando novo post para o KERN\n');

  const title = await ask('Título do post');
  if (!title) {
    console.error('❌ Erro: O título é obrigatório.');
    process.exit(1);
  }

  console.log('\nCategorias disponíveis:');
  CATEGORIES.forEach((cat, i) => console.log(`${i + 1}. ${cat}`));
  const catIndex = await ask('\nSelecione o número da categoria', '1');
  const category = CATEGORIES[parseInt(catIndex) - 1] || CATEGORIES[0];

  const tagsInput = await ask('Tags (separadas por vírgula)', 'IA, Tecnologia');
  const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t !== '');

  const excerpt = await ask('Resumo (excerpt)', 'Uma breve análise sobre...');

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleTimeString('pt-BR', { hour12: false });
  const fullDate = `${dateStr} ${timeStr}`;

  const slug = slugify(title);
  const fileName = `${dateStr}-${slug}.md`;
  const filePath = path.join(process.cwd(), 'src', 'content', 'posts', fileName);

  const frontmatter = `---
title: "${title}"
date: ${fullDate}
category: ${category}
tags: [${tags.map(t => `"${t}"`).join(', ')}]
excerpt: "${excerpt}"
featured: false
source: ""
draft: true
---

Escreva seu conteúdo aqui...
`;

  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  fs.writeFileSync(filePath, frontmatter);

  console.log(`\n✅ Post criado com sucesso!`);
  console.log(`📂 Caminho: ${filePath}`);
  console.log(`📝 Status: Draft (Rascunho)`);
  
  rl.close();
}

main();

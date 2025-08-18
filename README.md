# Jobify

Projeto de busca de vagas remotas; Next.js + TailwindCSS + shadcn/ui + Supabase. O Jobify consome a API pública (Remotive) via uma API interna e permite buscar vagas, ver detalhes e salvar favoritos com autenticação.

Design (Figma): https://www.figma.com/design/UfEFh3fdYKk0xKFtVgHc5W/Jobify---Prototipo?node-id=0-1&m=dev&t=MznyKQ9SSwXzTvxz-1 <br>
Demo (Vercel): https://jobify-challenge.vercel.app/

## 💡 Ideia do Projeto

O objetivo é oferecer uma interface simples e rápida para quem busca vagas remotas. Funcionalidades principais:

- Buscar vagas por pesquisa e filtrar por categoria.
- Listagem paginada de vagas (frontend consome `/api/jobs` que wrapa a API Remotive).
- Página de detalhes de cada vaga.
- Favoritar vagas; vagas salvas por usuário ficam persistidas no Supabase.
- Autenticação com Supabase (login / logout).

## 🛠️ Tecnologias Utilizadas

**Front-end:**

- Next.js (App Router)
- TypeScript
- TailwindCSS + shadcn/ui
- Lucide icons

**Back-end / Infra:**

- Supabase
- API interna (`/api/jobs`)

---

## 🧑‍💻 Sobre o Desenvolvimento

Realizei o desenvolvimento da aplicação inteira em Next.js: componentes principais, integrações com Supabase e rotas de API que consomem Remotive. O projeto foca em experiência de busca, filtros e persistência de favoritos por usuário.<br>
Este projeto também foi criado como exercício/prático para consolidar e treinar o uso das ferramentas: Next.js, Supabase, TailwindCSS e shadcn/ui.

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node >= 18
- npm ou pnpm/yarn
- Git
- Conta Supabase (recomendado: Supabase Cloud) ou Supabase CLI + Docker para dev local (opcional)

### 1 — Clone o repositório

```bash
git clone <seu-repo-url>
cd <seu-repo>
```

### 2 — Instale as dependências

```bash
npm install
```

### 3 — Variáveis de ambiente

Crie um arquivo `.env.local` na raiz com as variáveis mínimas:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (Cloud recomendado)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4 — Configurar `next/image` (domínios externos)

Se o projeto carregar logos externos (ex.: `remotive.com`), adicione os domínios em `next.config.js`:

```js
module.exports = {
  images: {
    domains: ['remotive.com'],
  },
};
```

### 5 — Rodar o projeto

```bash
npm run dev
# abra http://localhost:3000
```

---

## 🔧 Rodando Supabase local (opcional)

Se quiser testar RLS e policies localmente:

- Instale a CLI do Supabase (siga a documentação oficial).
- Inicie os serviços:

```bash
supabase start
```

- Pegue as chaves com `supabase status` e coloque no `.env.local`.
- Crie as tabelas e policies (psql ou migrations). Tabelas importantes:
  - `jobs` (id uuid, created_at, company_name, title, category, job_id int4)
  - `favorites` (id uuid, created_at, user_id uuid FK, job_id uuid FK)

---

## 🔧 Banco de Dados (Supabase)

É **necessário criar um projeto no [Supabase](https://supabase.com/)** para rodar o app.  
Dentro dele, configure as tabelas e policies abaixo:

### Criação das tabelas

```sql
-- Tabela de jobs
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  company_name text not null,
  title text not null,
  category text not null,
  job_id int4 not null
);

-- Tabela de favoritos
create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  user_id uuid references auth.users(id) on delete cascade,
  job_id uuid references jobs(id) on delete cascade
);
```

### Policies (RLS)

Ative o **Row Level Security (RLS)** nas tabelas e adicione estas policies:

```sql
-- Para tabela jobs (somente leitura)
alter table jobs enable row level security;

create policy "Allow read access to jobs"
  on jobs
  for select
  using (true);

-- Para tabela favorites (cada user só pode ver/editar seus favoritos)
alter table favorites enable row level security;

create policy "Users can view their own favorites"
  on favorites
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own favorites"
  on favorites
  for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own favorites"
  on favorites
  for delete
  using (auth.uid() = user_id);
```

---

## 📦 Comandos úteis

```bash
npm run dev        # dev server
npm run build      # build para produção
npm run start      # start após build
```

```
src/
  app/
    jobs/            # pages (list, show)
    api/jobs/route.ts # wrapper para Remotive
  components/
    custom/          # JobCard, InputSearch, LabelButton, etc
  lib/
    supabase/        # clients (server / client)
  styles/
next.config.js
```

# Ponto Financeiro

Portal brasileiro de educação financeira para iniciantes: um blog público (artigos, categorias, autores, páginas institucionais) com um painel de administração (CMS) completo para gerenciar todo o conteúdo.

Originalmente exportado do Google AI Studio como um app React com servidor Express e Firebase, este projeto foi adaptado para rodar como um site Netlify: build estático com Vite, API em Netlify Functions e persistência em Netlify Database (Postgres via Drizzle ORM).

## Tecnologias

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Netlify Functions (`netlify/functions/`) para API (CMS, autenticação do admin, assistente de IA, sitemap/robots)
- Netlify Database (Postgres) com Drizzle ORM (`db/schema.ts`) para persistência do conteúdo do CMS
- Netlify AI Gateway (`@google/genai`) para o assistente editorial de IA no painel admin

## Rodando localmente

```bash
npm install
netlify dev
```

O `netlify dev` serve o front-end Vite e emula as Functions e o banco de dados localmente.

Credenciais de admin (login em `/admin`): configuráveis via `ADMIN_EMAIL` / `ADMIN_PASSWORD` (veja `.env.example`); padrão `admin@pontofinanceiro.com.br` / `admin123`.

## Estrutura

- `src/views` — páginas públicas e a tela de admin
- `src/components/admin` — painéis do CMS (artigos, categorias, autores, páginas, mídia, assinantes, mensagens, configurações)
- `src/context` — estado global (`DataContext` para conteúdo do CMS, `AuthContext` para sessão do admin, `CookieConsentContext`)
- `db/schema.ts` — esquema das tabelas do Postgres
- `netlify/functions` — API: `cms.mts` (CRUD do conteúdo), `auth-login.mts`, `ai-assistant.mts`, `sitemap.mts`, `robots.mts`
- `netlify/database/migrations` — migrações do banco (aplicadas automaticamente pela Netlify no deploy)

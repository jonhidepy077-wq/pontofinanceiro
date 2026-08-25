import type { Config, Context } from '@netlify/functions';

// Simple single-admin gate for the CMS. Credentials live in env vars rather
// than shipped in the client bundle, since this is a single-editor backoffice,
// not a multi-tenant auth system.

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const { email, password } = await req.json();
  const cleanEmail = (email || '').trim().toLowerCase();

  const adminEmail = (Netlify.env.get('ADMIN_EMAIL') || 'admin@pontofinanceiro.com.br').toLowerCase();
  const adminPassword = Netlify.env.get('ADMIN_PASSWORD') || 'admin123';

  if (cleanEmail === adminEmail && password === adminPassword) {
    return Response.json({
      success: true,
      user: { id: 'admin-1', email: cleanEmail, name: 'Editor Administrador', role: 'admin' },
    });
  }

  return Response.json({ success: false, error: 'E-mail ou senha incorretos.' }, { status: 401 });
};

export const config: Config = {
  path: '/api/auth/login',
};

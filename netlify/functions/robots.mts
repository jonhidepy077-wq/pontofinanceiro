import type { Config } from '@netlify/functions';

export default async () => {
  const baseUrl = Netlify.env.get('URL') || Netlify.env.get('APP_URL') || 'https://pontofinanceiro.com.br';
  const content = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
};

export const config: Config = {
  path: '/robots.txt',
};

import type { Config } from '@netlify/functions';

const STATIC_PATHS = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/blog', changefreq: 'daily', priority: '0.9' },
  { loc: '/sobre', changefreq: 'monthly', priority: '0.7' },
  { loc: '/contato', changefreq: 'monthly', priority: '0.7' },
  { loc: '/politica-editorial', changefreq: 'monthly', priority: '0.6' },
  { loc: '/politica-de-privacidade', changefreq: 'monthly', priority: '0.5' },
  { loc: '/politica-de-cookies', changefreq: 'monthly', priority: '0.5' },
  { loc: '/termos-de-uso', changefreq: 'monthly', priority: '0.5' },
  { loc: '/publicidade', changefreq: 'monthly', priority: '0.5' },
  { loc: '/acessibilidade', changefreq: 'monthly', priority: '0.4' },
  { loc: '/direitos-autorais', changefreq: 'monthly', priority: '0.4' },
];

export default async () => {
  const baseUrl = Netlify.env.get('URL') || Netlify.env.get('APP_URL') || 'https://pontofinanceiro.com.br';
  const today = new Date().toISOString().split('T')[0];

  const urls = STATIC_PATHS.map(
    (p) => `  <url>
    <loc>${baseUrl}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};

export const config: Config = {
  path: '/sitemap.xml',
};

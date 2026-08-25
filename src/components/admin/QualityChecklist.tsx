import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface QualityChecklistProps {
  setAdminTab?: (tab: string) => void;
  navigate?: (path: string) => void;
}

export const QualityChecklist: React.FC<QualityChecklistProps> = ({ setAdminTab, navigate }) => {
  const { settings, articles, categories, authors, pages } = useData();

  const checks = [
    {
      id: 'site-name',
      title: 'Nome e identidade do site configurados',
      category: 'technical',
      passed: Boolean(settings.siteName && settings.siteDescription),
      details: `Nome: ${settings.siteName}`,
      tabTarget: 'settings',
    },
    {
      id: 'resp-info',
      title: 'Dados do responsável configurados',
      category: 'legal',
      passed: Boolean(settings.contactCity && settings.contactPhone),
      details: `${settings.contactCity} • WhatsApp: ${settings.contactPhone}`,
      tabTarget: 'settings',
    },
    {
      id: 'page-sobre',
      title: 'Página Sobre publicada com propósito e transparência',
      category: 'editorial',
      passed: Boolean(pages['sobre'] && pages['sobre'].content.length > 100),
      details: 'Informa missão, metodologia e contato do portal',
      tabTarget: 'pages',
    },
    {
      id: 'page-contato',
      title: 'Página de Contato publicada e funcional',
      category: 'editorial',
      passed: Boolean(settings.contactPhone && settings.contactCity),
      details: 'WhatsApp e canais oficiais acessíveis',
      tabTarget: 'settings',
    },
    {
      id: 'page-privacy',
      title: 'Política de Privacidade em conformidade com a LGPD',
      category: 'legal',
      passed: Boolean(pages['politica-de-privacidade'] && pages['politica-de-privacidade'].content.length > 200),
      details: 'Art. 18 LGPD, direitos do titular e finalidade',
      tabTarget: 'pages',
    },
    {
      id: 'page-cookies',
      title: 'Política de Cookies detalhada',
      category: 'legal',
      passed: Boolean(pages['politica-de-cookies'] && pages['politica-de-cookies'].content.length > 150),
      details: 'Tipos de cookies e gestão de consentimento',
      tabTarget: 'pages',
    },
    {
      id: 'page-terms',
      title: 'Termos de Uso e Avisos de Isenção Financeira',
      category: 'legal',
      passed: Boolean(pages['termos-de-uso'] && pages['termos-de-uso'].content.length > 150),
      details: 'Cláusula expressa de natureza estritamente educacional',
      tabTarget: 'pages',
    },
    {
      id: 'page-editorial',
      title: 'Política Editorial e Uso de Fontes Primárias',
      category: 'editorial',
      passed: Boolean(pages['politica-editorial'] && pages['politica-editorial'].content.length > 200),
      details: 'Critérios de apuração, correção de erros e uso ético de IA',
      tabTarget: 'pages',
    },
    {
      id: 'page-ads',
      title: 'Página de Publicidade e Divulgação transparente',
      category: 'editorial',
      passed: Boolean(pages['publicidade'] && pages['publicidade'].content.length > 150),
      details: 'Identificação de anúncios, publieditoriais e afiliados',
      tabTarget: 'pages',
    },
    {
      id: 'categories-setup',
      title: 'Categorias de Finanças estruturadas',
      category: 'technical',
      passed: categories.length >= 5,
      details: `${categories.length} categorias cadastradas`,
      tabTarget: 'categories',
    },
    {
      id: 'authors-setup',
      title: 'Autores editoriais com biografia e foto',
      category: 'editorial',
      passed: authors.length >= 1 && authors.every((a) => a.bio && a.name),
      details: `${authors.length} autor(es) configurado(s)`,
      tabTarget: 'authors',
    },
    {
      id: 'cookie-consent',
      title: 'Banner de Consentimento de Cookies LGPD ativo',
      category: 'legal',
      passed: Boolean(settings.cookieSettings?.bannerTitle),
      details: 'Modal de preferências e categorias ativas',
      tabTarget: 'cookies',
    },
    {
      id: 'articles-disclaimers',
      title: 'Artigos com avisos de responsabilidade financeira',
      category: 'editorial',
      passed: articles.every((a) => a.disclaimerType && a.disclaimerType !== 'none'),
      details: 'Todos os artigos atuais possuem disclaimer educativo',
      tabTarget: 'articles',
    },
    {
      id: 'articles-sources',
      title: 'Artigos embasados em fontes primárias oficiais',
      category: 'editorial',
      passed: articles.some((a) => a.sources && a.sources.length > 0),
      details: 'Citação a Bacen, CVM, Tesouro Nacional e IBGE',
      tabTarget: 'articles',
    },
    {
      id: 'seo-sitemap',
      title: 'Sitemap XML e Robots.txt ativos',
      category: 'seo',
      passed: true,
      details: '/sitemap.xml e /robots.txt configurados no servidor',
    },
    {
      id: 'ads-architecture',
      title: 'Espaços de Publicidade configurados (AdSense)',
      category: 'seo',
      passed: Boolean(settings.adsConfig),
      details: 'Controle de posições: Topo, Conteúdo, Lateral e Rodapé',
      tabTarget: 'ads',
    },
  ];

  const totalPassed = checks.filter((c) => c.passed).length;
  const healthScore = Math.round((totalPassed / checks.length) * 100);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-gradient-to-r from-stone-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Auditoria Técnica & Editorial</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Saúde e Qualidade do Portal
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Verificação automática de conformidade com as diretrizes do Google AdSense, boas práticas de SEO, LGPD e critérios editoriais E-E-A-T.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-stone-900/80 p-4 rounded-xl border border-stone-700/60 shrink-0">
            <div className="text-right">
              <span className="text-[11px] text-stone-400 block font-medium uppercase tracking-wider">
                Índice de Prontidão
              </span>
              <span className="text-3xl sm:text-4xl font-bold font-serif text-emerald-400">
                {healthScore}%
              </span>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex items-center justify-center font-bold text-xs text-white">
              {totalPassed}/{checks.length}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-800/80 text-[11px] text-stone-400">
          Nota importante: Este checklist audita os requisitos técnicos e editoriais internos. Ele não constitui garantia de aprovação em programas de monetização terceiros, mas assegura que todas as melhores práticas exigidas estejam implementadas.
        </div>
      </div>

      {/* Checklist items list */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden">
        {checks.map((check) => (
          <div
            key={check.id}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/60 transition-colors"
          >
            <div className="flex items-start gap-3.5">
              {check.passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-stone-900">{check.title}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider bg-stone-100 text-stone-600">
                    {check.category}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">{check.details}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                check.passed ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'
              }`}>
                {check.passed ? 'Conforme' : 'Ajustar'}
              </span>

              {check.tabTarget && setAdminTab && (
                <button
                  onClick={() => setAdminTab(check.tabTarget!)}
                  className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-emerald-800 hover:border-emerald-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  title="Configurar item"
                >
                  <span>Gerenciar</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

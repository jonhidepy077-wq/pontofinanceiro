import React from 'react';
import { useData } from '../context/DataContext';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ArticleContentRenderer } from '../components/article/ArticleContentRenderer';
import { AdSlot } from '../components/common/AdSlot';
import { formatDate } from '../utils/formatters';
import { ShieldCheck, Calendar, Info } from 'lucide-react';
import { NotFoundView } from './NotFoundView';

interface PageViewProps {
  slug: string;
  navigate: (path: string) => void;
}

export const PageView: React.FC<PageViewProps> = ({ slug, navigate }) => {
  const { pages, settings } = useData();

  const page = pages[slug];

  if (!page) {
    return <NotFoundView navigate={navigate} />;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title={page.metaTitle || page.title}
        description={page.metaDescription || `${page.title} do portal Ponto Financeiro.`}
        canonicalPath={`/${page.slug}`}
      />

      <Breadcrumbs items={[{ label: page.title }]} />

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-xs space-y-6">
        {/* Page Title & Meta */}
        <div className="border-b border-stone-200 pb-6 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Transparência Institucional</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
            {page.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Última atualização: {formatDate(page.updatedAt)}
            </span>
            <span>•</span>
            <span>{settings.contactCity || 'São Paulo - SP - Brasil'}</span>
          </div>
        </div>

        {/* Page Content Body */}
        <ArticleContentRenderer
          content={page.content}
          navigate={navigate}
          showInArticleAd={false}
        />

        {/* Institutional Contact Bar */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-8">
          <div>
            <span className="font-bold text-stone-800 block">Dúvidas sobre nossas políticas ou dados?</span>
            <span className="text-stone-500">Entre em contato diretamente com nossa equipe editorial.</span>
          </div>
          <button
            onClick={() => navigate('/contato')}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer"
          >
            Fale Conosco
          </button>
        </div>
      </div>
    </div>
  );
};

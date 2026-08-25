import React from 'react';
import { useData } from '../context/DataContext';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ArticleContentRenderer } from '../components/article/ArticleContentRenderer';
import { FinancialDisclaimer } from '../components/common/FinancialDisclaimer';
import { SourcesList } from '../components/article/SourcesList';
import { AuthorBioBox } from '../components/article/AuthorBioBox';
import { RelatedArticles } from '../components/article/RelatedArticles';
import { TableOfContents } from '../components/common/TableOfContents';
import { ShareButtons } from '../components/common/ShareButtons';
import { NewsletterBox } from '../components/common/NewsletterBox';
import { AdSlot } from '../components/common/AdSlot';
import { formatDate, formatShortDate } from '../utils/formatters';
import { Calendar, Clock, RefreshCw, ShieldCheck, User, ChevronLeft } from 'lucide-react';
import { NotFoundView } from './NotFoundView';

interface ArticleDetailViewProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ slug, navigate }) => {
  const { articles, categories, authors, publishedArticles } = useData();

  // Look for article by slug (check all articles to allow admin draft preview)
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <NotFoundView navigate={navigate} />;
  }

  const category = categories.find((c) => c.slug === article.category);
  const author = authors.find((a) => a.id === article.authorId);

  // Related articles from same category or general
  const related = publishedArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, 3);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Dynamic SEO Meta & JSON-LD Structured Data */}
      <SEOHead
        title={article.metaTitle || article.title}
        description={article.metaDescription || article.excerpt || article.subtitle}
        keywords={[article.primaryKeyword, ...(article.secondaryKeywords || [])]}
        canonicalPath={`/blog/${article.slug}`}
        ogImage={article.coverImage}
        ogType="article"
        articleData={{
          publishedTime: article.publishedAt || article.createdAt,
          modifiedTime: article.updatedAt || article.publishedAt || article.createdAt,
          authorName: author?.name || 'Equipe Ponto Financeiro',
          section: category?.name || 'Finanças Pessoais',
          tags: [article.primaryKeyword, ...(article.secondaryKeywords || [])],
        }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: category?.name || 'Finanças', href: `/categoria/${category?.slug || 'financas-pessoais'}` },
          { label: article.title },
        ]}
      />

      {/* Top Header Ad (if enabled) */}
      <AdSlot position="header" slotId="slot-article-top" />

      {/* Two Column Layout (Main content 8 cols + Sidebar 4 cols on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Main Article Content (8 cols) */}
        <main className="lg:col-span-8 space-y-6">
          <article className="space-y-6">
            {/* Category Tag */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/categoria/${category?.slug || 'financas-pessoais'}`)}
                className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-bold uppercase tracking-wider hover:bg-emerald-200 transition-colors cursor-pointer"
              >
                {category?.name || 'Finanças'}
              </button>

              {article.status === 'draft' && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                  Modo Rascunho (Visualização Administrativa)
                </span>
              )}
            </div>

            {/* Title (H1) */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-950 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Subtitle / Lead Paragraph */}
            {article.subtitle && (
              <p className="text-lg sm:text-xl text-stone-600 font-sans leading-relaxed">
                {article.subtitle}
              </p>
            )}

            {/* Author & Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-stone-200 text-xs text-stone-600">
              <div className="flex items-center gap-3">
                <img
                  src={author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={author?.name || 'Autor'}
                  className="w-11 h-11 rounded-full object-cover border border-stone-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <button
                    onClick={() => navigate(`/autor/${author?.slug || 'redacao-ponto-financeiro'}`)}
                    className="font-bold text-stone-900 hover:text-emerald-800 text-left block cursor-pointer text-sm"
                  >
                    {author?.name || 'Redação Ponto Financeiro'}
                  </button>
                  <span className="text-[11px] text-stone-500 block">
                    {author?.role || 'Educador Financeiro'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Publicado em: {formatDate(article.publishedAt || article.createdAt)}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTimeMinutes} min de leitura
                </span>
              </div>
            </div>

            {/* Cover Image */}
            {article.coverImage && (
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 shadow-xs">
                <img
                  src={article.coverImage}
                  alt={article.coverImageAlt || article.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Table of Contents (Mobile & Tablet inline) */}
            <div className="block lg:hidden">
              <TableOfContents content={article.content} />
            </div>

            {/* Financial Disclaimer Banner */}
            {article.disclaimerType && article.disclaimerType !== 'none' && (
              <FinancialDisclaimer type={article.disclaimerType} />
            )}

            {/* Main Rich Content Body */}
            <ArticleContentRenderer
              content={article.content}
              navigate={navigate}
              showInArticleAd={true}
            />

            {/* Social Share Buttons */}
            <ShareButtons title={article.title} />

            {/* Sources & Official Regulatory references */}
            {article.sources && article.sources.length > 0 && (
              <SourcesList sources={article.sources} />
            )}

            {/* Author Bio Card */}
            {author && <AuthorBioBox author={author} navigate={navigate} />}

            {/* Related Articles Section */}
            <RelatedArticles articles={related} navigate={navigate} />

            {/* Newsletter Box */}
            <NewsletterBox source={`artigo-${article.slug}`} />
          </article>
        </main>

        {/* Sidebar (4 cols on Desktop) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* Desktop Table of Contents */}
            <div className="hidden lg:block">
              <TableOfContents content={article.content} />
            </div>

            {/* Sidebar AdSense Slot */}
            <AdSlot position="sidebar" slotId="slot-article-sidebar" />

            {/* Author Quick Mini-Card */}
            {author && (
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  Sobre o Autor
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-12 h-12 rounded-full object-cover border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{author.name}</h4>
                    <p className="text-[11px] text-stone-500">{author.role}</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {author.bio}
                </p>
                <button
                  onClick={() => navigate(`/autor/${author.slug}`)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
                >
                  Ver todos os artigos do autor
                </button>
              </div>
            )}

            {/* Educational Commitment box */}
            <div className="p-5 rounded-2xl bg-emerald-950 text-white space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Educação sem Conflitos</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Nossos guias têm caráter exclusivamente pedagógico. Não cobramos comissões sobre os investimentos citados.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer Ad (if enabled) */}
      <AdSlot position="footer" slotId="slot-article-footer" />
    </div>
  );
};

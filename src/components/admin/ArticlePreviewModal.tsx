import React from 'react';
import { X, Eye, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Article } from '../../types';
import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/formatters';
import { ArticleContentRenderer } from '../article/ArticleContentRenderer';
import { FinancialDisclaimer } from '../common/FinancialDisclaimer';
import { SourcesList } from '../article/SourcesList';
import { AuthorBioBox } from '../article/AuthorBioBox';
import { TableOfContents } from '../common/TableOfContents';

interface ArticlePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Partial<Article>;
  navigate: (path: string) => void;
}

export const ArticlePreviewModal: React.FC<ArticlePreviewModalProps> = ({
  isOpen,
  onClose,
  article,
  navigate,
}) => {
  const { categories, authors } = useData();

  if (!isOpen) return null;

  const category = categories.find((c) => c.slug === article.category);
  const author = authors.find((a) => a.id === article.authorId);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Top bar */}
        <div className="px-6 py-3 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-stone-200">Modo de Pré-visualização do Artigo</span>
            <span className="px-2 py-0.5 rounded bg-emerald-800 text-emerald-300 font-mono text-[10px]">
              {article.status === 'published' ? 'Publicado' : 'Rascunho'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Preview Render */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white">
          <article className="max-w-3xl mx-auto space-y-6">
            {/* Category badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                {category?.name || 'Finanças'}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 leading-tight">
              {article.title || 'Título do Artigo'}
            </h1>

            {article.subtitle && (
              <p className="text-lg text-stone-600 font-sans leading-relaxed">
                {article.subtitle}
              </p>
            )}

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-stone-100 text-xs text-stone-500">
              <div className="flex items-center gap-3">
                <img
                  src={author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={author?.name || 'Autor'}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="font-bold text-stone-900 block">{author?.name || 'Redação'}</span>
                  <span className="text-[11px] text-stone-500 block">{author?.role || 'Educador Financeiro'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(article.publishedAt || new Date().toISOString())}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTimeMinutes || 5} min de leitura
                </span>
              </div>
            </div>

            {/* Cover image */}
            {article.coverImage && (
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 shadow-xs">
                <img
                  src={article.coverImage}
                  alt={article.coverImageAlt || article.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Table of contents */}
            {article.content && <TableOfContents content={article.content} />}

            {/* Financial disclaimer */}
            {article.disclaimerType && article.disclaimerType !== 'none' && (
              <FinancialDisclaimer type={article.disclaimerType} />
            )}

            {/* Main content body */}
            {article.content && (
              <ArticleContentRenderer
                content={article.content}
                navigate={navigate}
                showInArticleAd={false}
              />
            )}

            {/* Sources list */}
            {article.sources && article.sources.length > 0 && (
              <SourcesList sources={article.sources} />
            )}

            {/* Author box */}
            {author && <AuthorBioBox author={author} navigate={navigate} />}
          </article>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800"
          >
            Fechar Pré-visualização
          </button>
        </div>
      </div>
    </div>
  );
};

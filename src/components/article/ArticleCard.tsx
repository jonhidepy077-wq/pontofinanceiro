import React from 'react';
import { Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { Article } from '../../types';
import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/formatters';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'standard' | 'compact' | 'horizontal';
  navigate: (path: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'standard', navigate }) => {
  const { categories, authors } = useData();
  const category = categories.find((c) => c.slug === article.category);
  const author = authors.find((a) => a.id === article.authorId);

  const handleClick = () => {
    navigate(`/blog/${article.slug}`);
  };

  if (variant === 'featured') {
    return (
      <article
        onClick={handleClick}
        className="group relative bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer"
      >
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-100">
          <img
            src={article.coverImage}
            alt={article.coverImageAlt || article.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider shadow-sm">
              {category?.name || 'Finanças'}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTimeMinutes} min de leitura
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight group-hover:text-emerald-800 transition-colors">
              {article.title}
            </h2>

            <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
              {article.excerpt || article.subtitle}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={author?.name || 'Autor'}
                className="w-8 h-8 rounded-full object-cover border border-stone-200"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs">
                <span className="font-semibold text-stone-800 block">{author?.name || 'Redação'}</span>
                <span className="text-[11px] text-stone-600 block">{author?.role || 'Educador Financeiro'}</span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 group-hover:translate-x-1 transition-transform">
              <span>Ler guia completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article
        onClick={handleClick}
        className="group bg-white rounded-xl border border-stone-200 p-4 sm:p-5 hover:border-stone-300 hover:shadow-xs transition-all flex flex-col sm:flex-row gap-4 sm:gap-6 cursor-pointer"
      >
        <div className="sm:w-48 aspect-[16/10] sm:aspect-auto sm:h-32 shrink-0 rounded-lg overflow-hidden bg-stone-100 relative">
          <img
            src={article.coverImage}
            alt={article.coverImageAlt || article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-2">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-emerald-800 uppercase tracking-wider text-[11px]">
                {category?.name || 'Finanças'}
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-600">{article.readingTimeMinutes} min de leitura</span>
            </div>

            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2">
              {article.title}
            </h3>

            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
              {article.excerpt || article.subtitle}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
            <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            <span className="font-medium text-emerald-800 flex items-center gap-1 group-hover:underline">
              Ler artigo <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article
        onClick={handleClick}
        className="group py-3 border-b border-stone-100 last:border-0 cursor-pointer space-y-1"
      >
        <div className="flex items-center gap-2 text-[11px] text-stone-600">
          <span className="font-semibold text-emerald-800">{category?.name || 'Finanças'}</span>
          <span>•</span>
          <span>{article.readingTimeMinutes} min</span>
        </div>
        <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2">
          {article.title}
        </h4>
      </article>
    );
  }

  // Standard 3-column / grid card
  return (
    <article
      onClick={handleClick}
      className="group bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-stone-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={article.coverImage}
          alt={article.coverImageAlt || article.title}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-semibold uppercase tracking-wider">
            {category?.name || 'Finanças'}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            <span>•</span>
            <span>{article.readingTimeMinutes} min de leitura</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
            {article.excerpt || article.subtitle}
          </p>
        </div>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <User className="w-3.5 h-3.5 text-stone-600" />
            <span className="font-medium truncate max-w-[130px]">{author?.name || 'Redação'}</span>
          </div>

          <span className="font-semibold text-emerald-800 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            <span>Ler</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </article>
  );
};

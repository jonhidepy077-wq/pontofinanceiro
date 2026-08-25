import React from 'react';
import { Article } from '../../types';
import { ArticleCard } from './ArticleCard';
import { Sparkles } from 'lucide-react';

interface RelatedArticlesProps {
  articles: Article[];
  navigate: (path: string) => void;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles, navigate }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-12 pt-8 border-t border-stone-200">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Continue Aprendendo (Artigos Relacionados)
          </h3>
          <p className="text-xs text-stone-500">
            Aprofunde seu conhecimento com estes guias complementares
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} variant="standard" navigate={navigate} />
        ))}
      </div>
    </section>
  );
};

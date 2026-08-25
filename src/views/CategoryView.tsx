import React from 'react';
import { useData } from '../context/DataContext';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ArticleCard } from '../components/article/ArticleCard';
import { AdSlot } from '../components/common/AdSlot';
import { NewsletterBox } from '../components/common/NewsletterBox';
import { FolderTree, BookOpen } from 'lucide-react';
import { NotFoundView } from './NotFoundView';

interface CategoryViewProps {
  slug: string;
  navigate: (path: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ slug, navigate }) => {
  const { categories, publishedArticles } = useData();

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return <NotFoundView navigate={navigate} />;
  }

  const categoryArticles = publishedArticles.filter((a) => a.category === category.slug);

  return (
    <div className="space-y-8">
      <SEOHead
        title={`${category.name} - Guias e Artigos`}
        description={category.description || `Artigos e materiais educativos sobre ${category.name} no Ponto Financeiro.`}
        canonicalPath={`/categoria/${category.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: category.name },
        ]}
      />

      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
          <FolderTree className="w-3.5 h-3.5 text-emerald-700" />
          <span>Categoria de Conteúdo</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
          {category.name}
        </h1>

        <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
          {category.description || `Confira todos os artigos didáticos e tutoriais dedicados à temática de ${category.name}.`}
        </p>

        <div className="text-xs text-stone-400 pt-1 font-medium">
          Total de {categoryArticles.length} guia(s) publicado(s) nesta trilha
        </div>
      </div>

      <AdSlot position="header" slotId="slot-category-top" />

      {/* Articles Grid */}
      {categoryArticles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 space-y-3">
          <BookOpen className="w-10 h-10 mx-auto text-stone-300" />
          <h3 className="font-bold text-stone-800 text-base">Ainda não há artigos nesta categoria</h3>
          <p className="text-xs max-w-sm mx-auto">
            Novos conteúdos sobre {category.name} estão em processo de redação e revisão editorial.
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800"
          >
            Explorar outras categorias
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="standard" navigate={navigate} />
          ))}
        </div>
      )}

      {/* Newsletter */}
      <NewsletterBox source={`categoria-${category.slug}`} />
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ArticleCard } from '../components/article/ArticleCard';
import { AdSlot } from '../components/common/AdSlot';
import { NewsletterBox } from '../components/common/NewsletterBox';
import { Search, Filter, Compass, BookOpen, Clock } from 'lucide-react';

interface BlogListViewProps {
  navigate: (path: string) => void;
}

export const BlogListView: React.FC<BlogListViewProps> = ({ navigate }) => {
  const { publishedArticles, categories } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'readingTime'>('recent');

  const filteredArticles = useMemo(() => {
    return publishedArticles
      .filter((art) => {
        const matchesSearch =
          art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          art.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          art.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          art.content.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;

        return matchesSearch && matchesCat;
      })
      .sort((a, b) => {
        if (sortBy === 'readingTime') {
          return a.readingTimeMinutes - b.readingTimeMinutes;
        }
        // Default: most recent
        const dateA = new Date(a.publishedAt || a.createdAt).getTime();
        const dateB = new Date(b.publishedAt || b.createdAt).getTime();
        return dateB - dateA;
      });
  }, [publishedArticles, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="space-y-8">
      <SEOHead
        title="Artigos & Guias de Educação Financeira"
        description="Explore todos os artigos didáticos do Ponto Financeiro: reserva de emergência, Tesouro Direto, CDBs, investimentos para iniciantes e planejamento."
        canonicalPath="/blog"
      />

      <Breadcrumbs items={[{ label: 'Blog & Guias' }]} />

      {/* Header section */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Acervo de Artigos & Guias Educativos
        </h1>
        <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
          Tudo o que você precisa saber sobre o sistema financeiro brasileiro explicado passo a passo, com embasamento em fontes oficiais e foco em segurança.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          {/* Search box (8 cols) */}
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por termos como 'Tesouro Selic', 'FGC', 'CDB' ou 'Reserva'..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs text-stone-900"
            />
          </div>

          {/* Sort dropdown (4 cols) */}
          <div className="sm:col-span-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs text-stone-800 font-medium"
            >
              <option value="recent">Mais Recentes Primeiro</option>
              <option value="readingTime">Leitura Mais Rápida (Curto)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Todas as Categorias ({publishedArticles.length})
          </button>
          {categories.map((cat) => {
            const count = publishedArticles.filter((a) => a.category === cat.slug).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-emerald-800 text-white font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Ad (if enabled) */}
      <AdSlot position="header" slotId="slot-blog-top" />

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 space-y-3">
          <BookOpen className="w-10 h-10 mx-auto text-stone-300" />
          <h3 className="font-bold text-stone-800 text-base">Nenhum artigo encontrado</h3>
          <p className="text-xs max-w-sm mx-auto">
            Não encontramos artigos para o termo "{searchTerm}". Tente buscar por outros conceitos como "renda fixa" ou "reserva".
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800"
          >
            Ver todos os artigos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <React.Fragment key={article.id}>
              <ArticleCard article={article} variant="standard" navigate={navigate} />
              {/* Insert in-list ad after 3rd article */}
              {idx === 2 && (
                <div className="md:col-span-2 lg:col-span-3">
                  <AdSlot position="inList" slotId="slot-blog-mid" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Newsletter Box */}
      <div className="pt-6">
        <NewsletterBox source="blog-list-bottom" />
      </div>
    </div>
  );
};

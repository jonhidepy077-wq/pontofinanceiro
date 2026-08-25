import React from 'react';
import { useData } from '../context/DataContext';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ArticleCard } from '../components/article/ArticleCard';
import { AdSlot } from '../components/common/AdSlot';
import { NewsletterBox } from '../components/common/NewsletterBox';
import { ShieldCheck, User, Globe, Mail } from 'lucide-react';
import { NotFoundView } from './NotFoundView';

interface AuthorViewProps {
  slug: string;
  navigate: (path: string) => void;
}

export const AuthorView: React.FC<AuthorViewProps> = ({ slug, navigate }) => {
  const { authors, publishedArticles } = useData();

  const author = authors.find((a) => a.slug === slug);

  if (!author) {
    return <NotFoundView navigate={navigate} />;
  }

  const authorArticles = publishedArticles.filter((a) => a.authorId === author.id);

  return (
    <div className="space-y-8">
      <SEOHead
        title={`Artigos de ${author.name}`}
        description={`Perfil editorial de ${author.name} (${author.role}) e seus artigos educativos publicados no Ponto Financeiro.`}
        canonicalPath={`/autor/${author.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Autores', href: '/sobre' },
          { label: author.name },
        ]}
      />

      {/* Author Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-emerald-100 shadow-sm shrink-0"
          referrerPolicy="no-referrer"
        />

        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
              {author.name}
            </h1>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Autor Verificado E-E-A-T</span>
            </div>
          </div>

          <p className="text-sm font-semibold text-emerald-800">
            {author.role}
          </p>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
            {author.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-stone-400" />
              <span>São Paulo - SP - Brasil</span>
            </span>
            <span>•</span>
            <span>{authorArticles.length} artigo(s) educativo(s)</span>
          </div>
        </div>
      </div>

      <AdSlot position="header" slotId="slot-author-top" />

      {/* Articles by Author */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-stone-900">
          Artigos Escritos por {author.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorArticles.map((art) => (
            <ArticleCard key={art.id} article={art} variant="standard" navigate={navigate} />
          ))}
        </div>
      </div>

      <NewsletterBox source={`autor-${author.slug}`} />
    </div>
  );
};

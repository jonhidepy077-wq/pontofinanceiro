import React from 'react';
import { Compass, Home, BookOpen, Search } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

interface NotFoundViewProps {
  navigate: (path: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ navigate }) => {
  return (
    <div className="py-16 text-center space-y-6 max-w-lg mx-auto">
      <SEOHead
        title="Página Não Encontrada (404)"
        description="A página que você procura não existe ou foi movida."
      />

      <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 shadow-sm">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
          Erro 404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Página não encontrada
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          O link que você seguiu pode estar desatualizado ou a página foi movida para uma nova categoria.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Voltar ao Início</span>
        </button>

        <button
          onClick={() => navigate('/blog')}
          className="px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Ver Todos os Artigos</span>
        </button>
      </div>
    </div>
  );
};

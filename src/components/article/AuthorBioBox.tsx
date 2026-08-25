import React from 'react';
import { Author } from '../../types';
import { User, ShieldCheck, Globe, ArrowRight } from 'lucide-react';

interface AuthorBioBoxProps {
  author?: Author;
  navigate: (path: string) => void;
}

export const AuthorBioBox: React.FC<AuthorBioBoxProps> = ({ author, navigate }) => {
  if (!author) return null;

  return (
    <div className="my-10 p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <img
        src={author.avatar}
        alt={author.name}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-xs shrink-0"
        referrerPolicy="no-referrer"
      />

      <div className="space-y-2 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-stone-900">{author.name}</h3>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-stone-600 font-medium">{author.role}</p>
          </div>

          <button
            onClick={() => navigate(`/autor/${author.slug}`)}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver perfil e artigos</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          {author.bio}
        </p>

        <div className="flex items-center gap-3 pt-1 text-[11px] text-stone-600">
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-stone-600" />
            <span>São Paulo - SP - Brasil</span>
          </span>
          <span>•</span>
          <span>Conteúdo revisado segundo as diretrizes editoriais do Ponto Financeiro</span>
        </div>
      </div>
    </div>
  );
};

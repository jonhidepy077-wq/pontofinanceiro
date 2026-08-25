import React from 'react';
import { ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ArticleSource } from '../../types';
import { formatShortDate } from '../../utils/formatters';

interface SourcesListProps {
  sources: ArticleSource[];
}

export const SourcesList: React.FC<SourcesListProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="my-8 p-5 rounded-2xl bg-stone-50 border border-stone-200">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-4 h-4 text-emerald-700" />
        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
          Fontes Primárias e Referências Oficiais Consultadas
        </h4>
      </div>

      <p className="text-xs text-stone-600 mb-4 leading-relaxed">
        Em conformidade com nossa Política Editorial e os critérios de transparência E-E-A-T, os dados normativos, tributários e econômicos deste artigo foram verificados diretamente junto aos órgãos reguladores e instituições oficiais:
      </p>

      <ul className="space-y-2.5 list-none p-0 m-0 text-xs">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-white border border-stone-200">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-800 block">{source.name}</span>
                {source.note && <span className="text-[11px] text-stone-600 block">{source.note}</span>}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              {source.dateVerified && (
                <span className="text-[10px] text-stone-600">
                  Verificado em: {formatShortDate(source.dateVerified)}
                </span>
              )}
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
                >
                  <span>Acessar fonte</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

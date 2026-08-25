import React, { useState } from 'react';
import { Search, Globe, Smartphone, Monitor, CheckCircle2, AlertCircle, Share2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface SEOPanelProps {
  title: string;
  metaTitle: string;
  setMetaTitle: (v: string) => void;
  metaDescription: string;
  setMetaDescription: (v: string) => void;
  slug: string;
  setSlug: (v: string) => void;
  primaryKeyword: string;
  setPrimaryKeyword: (v: string) => void;
  secondaryKeywords: string[];
  setSecondaryKeywords: (v: string[]) => void;
  canonicalUrl?: string;
  setCanonicalUrl: (v: string) => void;
  coverImage?: string;
}

export const SEOPanel: React.FC<SEOPanelProps> = ({
  title,
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  slug,
  setSlug,
  primaryKeyword,
  setPrimaryKeyword,
  secondaryKeywords,
  setSecondaryKeywords,
  canonicalUrl,
  setCanonicalUrl,
  coverImage,
}) => {
  const { settings } = useData();
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [secondaryInput, setSecondaryInput] = useState('');

  const displayTitle = metaTitle || title || 'Título do Artigo';
  const displayDesc = metaDescription || 'Aprenda conceitos de finanças de forma simples e didática no portal Ponto Financeiro.';
  const displaySlug = slug || 'o-que-e-financas';
  const baseUrl = 'https://pontofinanceiro.com.br';

  const titleLength = displayTitle.length;
  const descLength = displayDesc.length;

  const handleAddSecondary = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && secondaryInput.trim()) {
      e.preventDefault();
      if (!secondaryKeywords.includes(secondaryInput.trim())) {
        setSecondaryKeywords([...secondaryKeywords, secondaryInput.trim()]);
      }
      setSecondaryInput('');
    }
  };

  const handleRemoveSecondary = (kw: string) => {
    setSecondaryKeywords(secondaryKeywords.filter((k) => k !== kw));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-emerald-700" />
          <h3 className="font-bold text-stone-900 text-sm">Otimização para Mecanismos de Busca (SEO)</h3>
        </div>

        <div className="flex items-center bg-stone-100 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setPreviewMode('desktop')}
            className={`p-1.5 rounded-md flex items-center gap-1 cursor-pointer ${
              previewMode === 'desktop' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-500'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('mobile')}
            className={`p-1.5 rounded-md flex items-center gap-1 cursor-pointer ${
              previewMode === 'mobile' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-500'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Live Google Search Snippet Preview */}
      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1">
          <Globe className="w-3.5 h-3.5" />
          <span>Prévia no Resultado de Busca do Google</span>
        </div>

        <div className={`p-4 bg-white rounded-lg border border-stone-200 shadow-xs ${
          previewMode === 'mobile' ? 'max-w-xs mx-auto' : 'w-full'
        }`}>
          {/* Breadcrumb path in Google */}
          <div className="flex items-center gap-1.5 text-xs text-stone-800 mb-1">
            <div className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[9px] font-bold">
              PF
            </div>
            <div className="truncate text-stone-700 text-[11px]">
              {baseUrl} <span className="text-stone-400">›</span> blog <span className="text-stone-400">›</span> {displaySlug}
            </div>
          </div>

          {/* Title */}
          <h4 className="text-base sm:text-lg text-blue-800 hover:underline font-medium leading-snug cursor-pointer line-clamp-2">
            {displayTitle} - {settings.siteName || 'Ponto Financeiro'}
          </h4>

          {/* Description */}
          <p className="text-xs text-stone-600 mt-1 leading-relaxed line-clamp-2">
            {displayDesc}
          </p>
        </div>
      </div>

      {/* Inputs and Counters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Meta Title */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-stone-800">Título SEO (Meta Title):</label>
            <span className={`font-mono text-[11px] ${
              titleLength >= 45 && titleLength <= 65 ? 'text-emerald-700 font-bold' : 'text-amber-700'
            }`}>
              {titleLength}/60 caracteres
            </span>
          </div>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="Ex: Como Montar Sua Reserva de Emergência Passo a Passo"
            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1">
          <label className="font-semibold text-stone-800">URL Amigável (Slug):</label>
          <div className="flex items-center bg-white border border-stone-300 rounded-lg overflow-hidden px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-emerald-600">
            <span className="text-stone-400 text-xs select-none">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="reserva-de-emergencia"
              className="w-full bg-transparent text-xs text-stone-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Meta Description */}
        <div className="md:col-span-2 space-y-1">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-stone-800">Meta Description:</label>
            <span className={`font-mono text-[11px] ${
              descLength >= 120 && descLength <= 160 ? 'text-emerald-700 font-bold' : 'text-amber-700'
            }`}>
              {descLength}/155 caracteres recomendados
            </span>
          </div>
          <textarea
            rows={2}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Resumo claro e persuasivo para ser exibido abaixo do título nos buscadores..."
            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        {/* Primary Keyword */}
        <div className="space-y-1">
          <label className="font-semibold text-stone-800">Palavra-chave Principal:</label>
          <input
            type="text"
            value={primaryKeyword}
            onChange={(e) => setPrimaryKeyword(e.target.value)}
            placeholder="Ex: reserva de emergência"
            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        {/* Canonical URL */}
        <div className="space-y-1">
          <label className="font-semibold text-stone-800">URL Canônica Personalizada (Opcional):</label>
          <input
            type="text"
            value={canonicalUrl || ''}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            placeholder="Padrão automático: /blog/[slug]"
            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        {/* Secondary Keywords */}
        <div className="md:col-span-2 space-y-1">
          <label className="font-semibold text-stone-800">Palavras-chave Secundárias (Pressione Enter):</label>
          <div className="p-2 bg-white border border-stone-300 rounded-lg flex flex-wrap items-center gap-1.5 min-h-[38px]">
            {secondaryKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 text-[11px] flex items-center gap-1 border border-stone-200"
              >
                <span>{kw}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSecondary(kw)}
                  className="text-stone-400 hover:text-rose-600 ml-0.5 cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={secondaryInput}
              onChange={(e) => setSecondaryInput(e.target.value)}
              onKeyDown={handleAddSecondary}
              placeholder={secondaryKeywords.length === 0 ? "Digite palavras secundárias e pressione Enter..." : ""}
              className="flex-1 min-w-[140px] text-xs bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

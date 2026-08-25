import React, { useState } from 'react';
import { Sparkles, X, Copy, Check, ArrowRight, Loader2, BookOpen, Search, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyContent?: (content: string) => void;
  currentTitle?: string;
  currentText?: string;
  currentCategory?: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onApplyContent,
  currentTitle = '',
  currentText = '',
  currentCategory = '',
}) => {
  const { categories } = useData();
  const [activeAction, setActiveAction] = useState<string>('generate_outline');
  const [topic, setTopic] = useState<string>(currentTitle || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(currentCategory || (categories[0]?.slug || ''));
  const [keywords, setKeywords] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [sourceNote, setSourceNote] = useState<string>('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');
    setSourceNote('');

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: activeAction,
          topic: topic.trim() || 'Educação Financeira para Iniciantes',
          currentText: currentText || '',
          category: selectedCategory,
          keywords,
        }),
      });

      const data = await res.json();
      if (data.result) {
        setResult(data.result);
        if (data.note) setSourceNote(data.note);
      } else if (data.error) {
        setResult(`Erro: ${data.error}`);
      }
    } catch (e: any) {
      setResult(`Falha ao conectar com o assistente editorial: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result && navigator.clipboard) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const actions = [
    { id: 'generate_outline', label: 'Estrutura Completa do Artigo', icon: BookOpen, desc: 'Outline pedagógico com tópicos, exemplos e FAQ' },
    { id: 'suggest_topics', label: 'Sugerir Ideias de Pautas', icon: Sparkles, desc: 'Pautas de alto interesse para o público brasileiro' },
    { id: 'suggest_titles_and_seo', label: 'Títulos Atraentes e SEO', icon: Search, desc: 'Títulos sem clickbait, meta description e palavras-chave' },
    { id: 'review_clarity_and_compliance', label: 'Revisar Clareza & CVM', icon: ShieldCheck, desc: 'Checar jargões e conformidade regulatória' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-stone-900 to-emerald-950 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-700/60 text-emerald-300 border border-emerald-500/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Assistente Editorial com IA</h3>
              <p className="text-xs text-stone-300">Apoio para estruturação, pautas e revisão de clareza</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Action Tabs */}
          <div>
            <label className="block font-bold text-stone-900 mb-2">O que você gostaria de fazer?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {actions.map((act) => {
                const Icon = act.icon;
                const isSelected = activeAction === act.id;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setActiveAction(act.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600'
                        : 'bg-white border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-emerald-800' : 'text-stone-400'}`} />
                    <div>
                      <div className={`font-semibold ${isSelected ? 'text-emerald-950' : 'text-stone-800'}`}>
                        {act.label}
                      </div>
                      <div className="text-[11px] text-stone-500 line-clamp-1">{act.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Tópico, Título Provisório ou Conceito:
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: Reserva de Emergência no Tesouro Selic vs CDB"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-stone-700 mb-1">Categoria:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Palavras-chave Desejadas (Opcional):</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Ex: tesouro selic, quanto rende, segurança"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{loading ? 'Consultando Assistente...' : 'Processar com Assistente IA'}</span>
              </button>
            </div>
          </div>

          {/* Results Box */}
          {result && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">Sugestão Editorial Gerada:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                  </button>

                  {onApplyContent && (
                    <button
                      onClick={() => {
                        onApplyContent(result);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <span>Inserir no Editor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs max-h-80 overflow-y-auto whitespace-pre-wrap leading-relaxed border border-stone-800">
                {result}
              </div>

              {sourceNote && (
                <p className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  💡 {sourceNote}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { DollarSign, Check, AlertCircle, Info, ShieldCheck, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdsConfig } from '../../types';

export const AdsManager: React.FC = () => {
  const { settings, updateSettings } = useData();

  const [ads, setAds] = useState<AdsConfig>(settings.adsConfig || {
    enabled: false,
    adSensePublisherId: '',
    autoAdsEnabled: false,
    headerAd: false,
    inArticleAd: true,
    sidebarAd: true,
    footerAd: false,
    inListAd: false,
    customAdScript: '',
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ adsConfig: ads });
    setNotification('Configurações de publicidade salvas com sucesso!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
            Monetização & Google AdSense
          </h2>
          <p className="text-xs text-stone-500">
            Controle os blocos de publicidade, insira o ID de anunciante e gerencie as posições de exibição
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-500 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        {/* Left column: Controls (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Master Switch Card */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-stone-900 text-sm">Habilitar Exibição de Anúncios</h3>
                <p className="text-stone-500 text-xs">
                  Ativa ou pausa globalmente todos os espaços publicitários no portal
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={ads.enabled}
                  onChange={(e) => setAds({ ...ads, enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-3">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Google AdSense Publisher ID (ID do Editor):
                </label>
                <input
                  type="text"
                  value={ads.adSensePublisherId || ''}
                  onChange={(e) => setAds({ ...ads, adSensePublisherId: e.target.value })}
                  placeholder="Ex: ca-pub-1234567890123456"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono text-xs text-stone-900 focus:bg-white"
                />
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Encontrado na sua conta do Google AdSense em Conta &gt; Informações da Conta
                </span>
              </div>

              <label className="flex items-center gap-2.5 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ads.autoAdsEnabled}
                  onChange={(e) => setAds({ ...ads, autoAdsEnabled: e.target.checked })}
                  className="rounded text-emerald-600"
                />
                <div>
                  <span className="font-semibold text-stone-800 block">Ativar Auto Ads (Anúncios Automáticos do Google)</span>
                  <span className="text-stone-500 text-[11px] block">Permite que a IA do Google otimize os formatos automaticamente</span>
                </div>
              </label>
            </div>
          </div>

          {/* Individual Slot Positions */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-sm">Posicionamento de Blocos Específicos</h3>
            <p className="text-stone-500 text-xs">
              Selecione em quais áreas os blocos de publicidade demarcados ("Publicidade") podem aparecer:
            </p>

            <div className="space-y-3 pt-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-800 block">Artigo: Meio do Conteúdo (In-Article)</span>
                  <span className="text-stone-500 text-[11px]">Exibido naturalmente após o 3º parágrafo em matérias longas</span>
                </div>
                <input
                  type="checkbox"
                  checked={ads.inArticleAd}
                  onChange={(e) => setAds({ ...ads, inArticleAd: e.target.checked })}
                  className="rounded text-emerald-600 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-800 block">Barra Lateral (Sidebar / Desktop)</span>
                  <span className="text-stone-500 text-[11px]">Exibido na coluna lateral em telas grandes ao lado do artigo</span>
                </div>
                <input
                  type="checkbox"
                  checked={ads.sidebarAd}
                  onChange={(e) => setAds({ ...ads, sidebarAd: e.target.checked })}
                  className="rounded text-emerald-600 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-800 block">Entre Cards na Listagem do Blog</span>
                  <span className="text-stone-500 text-[11px]">Intercalado entre os artigos no feed do blog</span>
                </div>
                <input
                  type="checkbox"
                  checked={ads.inListAd}
                  onChange={(e) => setAds({ ...ads, inListAd: e.target.checked })}
                  className="rounded text-emerald-600 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-800 block">Topo do Site (Header Leaderboard)</span>
                  <span className="text-stone-500 text-[11px]">Abaixo do cabeçalho principal</span>
                </div>
                <input
                  type="checkbox"
                  checked={ads.headerAd}
                  onChange={(e) => setAds({ ...ads, headerAd: e.target.checked })}
                  className="rounded text-emerald-600 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-800 block">Rodapé (Footer Banner)</span>
                  <span className="text-stone-500 text-[11px]">Acima do rodapé institucional</span>
                </div>
                <input
                  type="checkbox"
                  checked={ads.footerAd}
                  onChange={(e) => setAds({ ...ads, footerAd: e.target.checked })}
                  className="rounded text-emerald-600 w-4 h-4"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Configurações de Anúncios</span>
            </button>
          </div>
        </div>

        {/* Right column: Best Practices & Tips (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Políticas do Google AdSense</span>
            </div>

            <p className="text-stone-600 text-xs leading-relaxed">
              O Ponto Financeiro foi construído para cumprir rigorosamente as políticas do Google AdSense:
            </p>

            <ul className="space-y-2 list-disc pl-4 text-[11px] text-stone-600 leading-relaxed">
              <li>Identificação obrigatória de "Publicidade" em todos os blocos.</li>
              <li>Espaçamento adequado para evitar cliques acidentais.</li>
              <li>Layout responsivo sem sobreposição a textos ou botões de navegação.</li>
              <li>Página de Publicidade pública com esclarecimento sobre a independência editorial.</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { Cookie, Save, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CookieSettings } from '../../types';

export const CookieLGPDManager: React.FC = () => {
  const { settings, updateSettings } = useData();

  const [cookieSettings, setCookieSettings] = useState<CookieSettings>(settings.cookieSettings || {
    bannerTitle: 'Sua Privacidade e Controle de Cookies',
    bannerText: 'Utilizamos cookies essenciais para o funcionamento seguro do portal, bem como tecnologias para analisar nosso tráfego e exibir anúncios relevantes em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).',
    acceptAllButtonText: 'Aceitar Todos os Cookies',
    rejectNonEssentialButtonText: 'Apenas Necessários',
    customizeButtonText: 'Personalizar Preferências',
    privacyPolicyUrl: '/politica-de-privacidade',
    cookiePolicyUrl: '/politica-de-cookies',
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ cookieSettings });
    setNotification('Configurações de Cookies e LGPD salvas com sucesso!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
            Gestão de Cookies & Conformidade LGPD
          </h2>
          <p className="text-xs text-stone-500">
            Configure as mensagens do banner de consentimento e as categorias de tratamento de dados
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-500 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-sm">Textos do Banner de Consentimento</h3>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">Título do Banner:</label>
              <input
                type="text"
                required
                value={cookieSettings.bannerTitle}
                onChange={(e) => setCookieSettings({ ...cookieSettings, bannerTitle: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">Texto Informativo Principal:</label>
              <textarea
                rows={4}
                required
                value={cookieSettings.bannerText}
                onChange={(e) => setCookieSettings({ ...cookieSettings, bannerText: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Botão "Aceitar Todos":</label>
                <input
                  type="text"
                  value={cookieSettings.acceptAllButtonText}
                  onChange={(e) => setCookieSettings({ ...cookieSettings, acceptAllButtonText: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Botão "Rejeitar Não Essenciais":</label>
                <input
                  type="text"
                  value={cookieSettings.rejectNonEssentialButtonText}
                  onChange={(e) => setCookieSettings({ ...cookieSettings, rejectNonEssentialButtonText: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Botão "Personalizar":</label>
                <input
                  type="text"
                  value={cookieSettings.customizeButtonText}
                  onChange={(e) => setCookieSettings({ ...cookieSettings, customizeButtonText: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Configurações de LGPD</span>
            </button>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Garantia de Conformidade LGPD</span>
            </div>

            <p className="text-stone-600 text-xs leading-relaxed">
              O sistema de cookies do Ponto Financeiro já inclui:
            </p>

            <ul className="space-y-2 list-disc pl-4 text-[11px] text-stone-600 leading-relaxed">
              <li>Separação técnica entre cookies essenciais, analíticos e de marketing.</li>
              <li>Gravação do consentimento com registro de data e timestamp local.</li>
              <li>Botão flutuante ou link permanente no rodapé para o usuário revogar seu consentimento a qualquer momento.</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

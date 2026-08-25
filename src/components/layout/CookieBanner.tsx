import React, { useState } from 'react';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieConsentContext';
import { useData } from '../../context/DataContext';

interface CookieBannerProps {
  navigate: (path: string) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ navigate }) => {
  const {
    preferences,
    isBannerOpen,
    isPreferencesModalOpen,
    acceptAll,
    rejectNonEssential,
    saveCustomPreferences,
    openPreferencesModal,
    closePreferencesModal,
  } = useCookieConsent();

  const { settings } = useData();

  const [analyticsConsent, setAnalyticsConsent] = useState(preferences.analytics);
  const [marketingConsent, setMarketingConsent] = useState(preferences.marketing);

  if (!isBannerOpen && !isPreferencesModalOpen) {
    return null;
  }

  return (
    <>
      {/* Floating Cookie Consent Banner (LGPD) */}
      {isBannerOpen && !isPreferencesModalOpen && (
        <aside
          id="cookie-consent-banner"
          aria-label="Aviso de cookies e privacidade"
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 lg:max-w-4xl lg:mx-auto z-50 bg-stone-900/95 text-stone-200 p-5 sm:p-6 rounded-2xl shadow-2xl border border-stone-700 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Cookie className="w-4 h-4 text-emerald-400" />
                <span>{settings.cookieSettings?.bannerTitle || 'Privacidade e Cookies'}</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {settings.cookieSettings?.bannerText ||
                  'Utilizamos cookies essenciais e tecnologias semelhantes para garantir o funcionamento seguro do portal, melhorar sua navegação e analisar o tráfego de forma anônima, em conformidade com a LGPD.'}{' '}
                <button
                  onClick={() => navigate('/politica-de-cookies')}
                  className="underline text-emerald-400 hover:text-emerald-300 cursor-pointer"
                >
                  Saiba mais em nossa Política de Cookies
                </button>
                .
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                onClick={openPreferencesModal}
                className="px-3 py-2 text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 rounded-lg border border-stone-600 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Preferências</span>
              </button>

              <button
                onClick={rejectNonEssential}
                className="px-3 py-2 text-xs font-medium text-stone-300 hover:text-white bg-transparent hover:bg-stone-800 rounded-lg border border-stone-600 transition-colors cursor-pointer"
              >
                Apenas Essenciais
              </button>

              <button
                onClick={acceptAll}
                className="px-4 py-2 text-xs font-semibold text-stone-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Aceitar Todos
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Cookie Customization Preferences Modal */}
      {isPreferencesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">Gerenciar Preferências de Cookies</h3>
                  <p className="text-xs text-stone-500">Controle o que pode ser armazenado em seu navegador</p>
                </div>
              </div>
              <button
                onClick={closePreferencesModal}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Essential */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <span>Cookies Necessários</span>
                    <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded font-medium">
                      Obrigatórios
                    </span>
                  </div>
                  <p className="text-stone-500 mt-1 leading-relaxed">
                    Essenciais para a segurança, carregamento rápido do portal e memorização de suas escolhas de privacidade.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="rounded text-emerald-600 mt-1 cursor-not-allowed"
                />
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-stone-900">Cookies de Análise e Desempenho</div>
                  <p className="text-stone-500 mt-1 leading-relaxed">
                    Ajudam a entender quais artigos são mais lidos para aprimorarmos continuamente os guias de educação financeira.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="rounded text-emerald-600 mt-1 w-4 h-4 cursor-pointer"
                />
              </div>

              {/* Marketing / AdSense */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-stone-900">Cookies de Publicidade Contextual</div>
                  <p className="text-stone-500 mt-1 leading-relaxed">
                    Permitem veicular anúncios adequados e não invasivos (Google AdSense) que mantêm o portal 100% gratuito.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="rounded text-emerald-600 mt-1 w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-200">
              <button
                onClick={closePreferencesModal}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => saveCustomPreferences({ analytics: analyticsConsent, marketing: marketingConsent })}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Salvar Preferências</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

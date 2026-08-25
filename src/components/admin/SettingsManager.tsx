import React, { useState } from 'react';
import { Settings, Save, Check, ShieldCheck, Globe, Phone, Mail, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SiteSettings } from '../../types';

export const SettingsManager: React.FC = () => {
  const { settings, updateSettings } = useData();

  const [formSettings, setFormSettings] = useState<SiteSettings>(settings);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
    setNotification('Configurações gerais atualizadas com sucesso!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
            Configurações Gerais & Identidade
          </h2>
          <p className="text-xs text-stone-500">
            Defina o nome do portal, dados institucionais de contato e parâmetros globais
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-500 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
        <div className="lg:col-span-8 space-y-6">
          {/* Brand Identity */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-sm">Identidade do Site</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Nome do Portal / Blog:</label>
                <input
                  type="text"
                  required
                  value={formSettings.siteName}
                  onChange={(e) => setFormSettings({ ...formSettings, siteName: e.target.value })}
                  placeholder="Ponto Financeiro"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Slogan / Tagline:</label>
                <input
                  type="text"
                  required
                  value={formSettings.siteTagline}
                  onChange={(e) => setFormSettings({ ...formSettings, siteTagline: e.target.value })}
                  placeholder="Educação Financeira para Iniciantes"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-stone-800 mb-1">Descrição Global do Site (SEO):</label>
                <textarea
                  rows={2}
                  required
                  value={formSettings.siteDescription}
                  onChange={(e) => setFormSettings({ ...formSettings, siteDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Contact & Transparency */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-stone-900 text-sm">Dados de Transparência & Contato</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Localização Oficial:</label>
                <input
                  type="text"
                  value={formSettings.contactCity}
                  onChange={(e) => setFormSettings({ ...formSettings, contactCity: e.target.value })}
                  placeholder="São Paulo - SP - Brasil"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">WhatsApp / Telefone:</label>
                <input
                  type="text"
                  value={formSettings.contactPhone}
                  onChange={(e) => setFormSettings({ ...formSettings, contactPhone: e.target.value })}
                  placeholder="11961139395"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">E-mail de Atendimento:</label>
                <input
                  type="email"
                  value={formSettings.contactEmail}
                  onChange={(e) => setFormSettings({ ...formSettings, contactEmail: e.target.value })}
                  placeholder="contato@pontofinanceiro.com.br"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Responsável Editorial:</label>
                <input
                  type="text"
                  value={formSettings.responsibleName}
                  onChange={(e) => setFormSettings({ ...formSettings, responsibleName: e.target.value })}
                  placeholder="Equipe Editorial Ponto Financeiro"
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
              <span>Salvar Configurações Gerais</span>
            </button>
          </div>
        </div>

        {/* Right Help Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <h4 className="font-bold text-stone-900 text-xs">Avisos de Rodapé</h4>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              O rodapé do portal renderiza automaticamente a cidade oficial (<strong>{formSettings.contactCity}</strong>), canal de WhatsApp (<strong>{formSettings.contactPhone}</strong>) e os links para todas as políticas.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

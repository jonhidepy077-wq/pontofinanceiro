import React, { useState } from 'react';
import { Database, Download, Upload, RefreshCw, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const DatabaseBackupManager: React.FC = () => {
  const {
    articles,
    categories,
    authors,
    pages,
    settings,
    mediaItems,
    subscribers,
    contactMessages,
    resetToInitialData,
  } = useData();

  const [notification, setNotification] = useState<string | null>(null);

  const handleExportJson = () => {
    const fullBackup = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      data: {
        articles,
        categories,
        authors,
        pages,
        settings,
        mediaItems,
        subscribers,
        contactMessages,
      },
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ponto-financeiro-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setNotification('Backup completo exportado em formato JSON!');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.data) {
          const { data } = json;
          if (data.articles) localStorage.setItem('pf_articles', JSON.stringify(data.articles));
          if (data.categories) localStorage.setItem('pf_categories', JSON.stringify(data.categories));
          if (data.authors) localStorage.setItem('pf_authors', JSON.stringify(data.authors));
          if (data.pages) localStorage.setItem('pf_pages', JSON.stringify(data.pages));
          if (data.settings) localStorage.setItem('pf_settings', JSON.stringify(data.settings));
          if (data.mediaItems) localStorage.setItem('pf_media', JSON.stringify(data.mediaItems));
          if (data.subscribers) localStorage.setItem('pf_subscribers', JSON.stringify(data.subscribers));
          if (data.contactMessages) localStorage.setItem('pf_contact_messages', JSON.stringify(data.contactMessages));

          setNotification('Dados importados com sucesso! Recarregando sistema...');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          alert('Arquivo JSON inválido ou formato incompatível.');
        }
      } catch (err: any) {
        alert(`Erro ao processar JSON: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Atenção: Restaurar os dados iniciais substituirá alterações feitas localmente. Deseja prosseguir?')) {
      resetToInitialData();
      setNotification('Dados restaurados para o estado padrão educativo!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
            Gerenciamento de Dados & Backup
          </h2>
          <p className="text-xs text-stone-500">
            Exporte o acervo completo em JSON, importe dados ou restaure a base padrão
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-500 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Backup Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* Card 1: Export */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 w-fit">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Exportar Backup Completo</h3>
            <p className="text-stone-500 leading-relaxed">
              Gera um arquivo .JSON com todos os artigos, autores, categorias, páginas, configurações e inscritos.
            </p>
          </div>

          <button
            onClick={handleExportJson}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Arquivo JSON</span>
          </button>
        </div>

        {/* Card 2: Import */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-800 w-fit">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Importar Backup JSON</h3>
            <p className="text-stone-500 leading-relaxed">
              Restaure um arquivo de backup previamente exportado para recuperar dados.
            </p>
          </div>

          <label className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Selecionar Arquivo JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
          </label>
        </div>

        {/* Card 3: Reset */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 w-fit">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-sm">Restaurar Base Padrão</h3>
            <p className="text-stone-500 leading-relaxed">
              Recarrega os artigos originais sobre Tesouro Selic, Reserva de Emergência, Dívidas e FGC.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2.5 px-4 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Restaurar Dados Iniciais</span>
          </button>
        </div>
      </div>
    </div>
  );
};

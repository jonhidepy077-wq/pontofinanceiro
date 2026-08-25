import React, { useState } from 'react';
import { Mail, Download, Trash2, Plus, Search, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/formatters';

export const SubscribersManager: React.FC = () => {
  const { subscribers, addSubscriber, deleteSubscriber } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ['Email', 'Nome', 'Data de Inscricao', 'Origem', 'Status'];
    const rows = subscribers.map((s) => [
      s.email,
      s.name || '',
      s.subscribedAt || s.createdAt,
      s.source,
      s.status || 'ativo',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `inscritos-newsletter-ponto-financeiro-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    addSubscriber(newEmail.trim(), newName.trim(), 'manual-cms');
    setNewEmail('');
    setNewName('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
            Assinantes da Newsletter ({subscribers.length})
          </h2>
          <p className="text-xs text-stone-500">
            Base de leitores cadastrados para receber boletins e dicas financeiras
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Inscrito</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleAddManual} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3 text-xs animate-in slide-in-from-top-2">
          <h3 className="font-bold text-stone-900">Cadastrar Assinante Manualmente</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-stone-700 mb-1">E-mail do Leitor:</label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="leitor@email.com"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-stone-700 mb-1">Nome (Opcional):</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex: Carlos Silva"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800"
            >
              Salvar Assinante
            </button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por e-mail ou nome..."
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white"
          />
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {filteredSubscribers.length === 0 ? (
          <div className="p-8 text-center text-stone-500 text-xs">
            Nenhum inscrito encontrado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-700 font-bold uppercase tracking-wider text-[10px] border-b border-stone-200">
                <tr>
                  <th className="py-3.5 px-4">E-mail</th>
                  <th className="py-3.5 px-4">Nome</th>
                  <th className="py-3.5 px-4">Data de Inscrição</th>
                  <th className="py-3.5 px-4">Origem</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-stone-50/70">
                    <td className="py-3 px-4 font-medium text-stone-900">{sub.email}</td>
                    <td className="py-3 px-4 text-stone-600">{sub.name || '—'}</td>
                    <td className="py-3 px-4 text-stone-500 text-[11px]">{formatDate(sub.subscribedAt || sub.createdAt)}</td>
                    <td className="py-3 px-4 text-stone-500 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-stone-100 font-mono text-[10px]">
                        {sub.source}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-[10px]">
                        Ativo
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Remover "${sub.email}" da lista de inscritos?`)) {
                            deleteSubscriber(sub.id);
                          }
                        }}
                        className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Remover inscrito"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

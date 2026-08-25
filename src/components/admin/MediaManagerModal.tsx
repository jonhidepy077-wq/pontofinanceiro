import React, { useState } from 'react';
import { Image as ImageIcon, X, Plus, Trash2, Check, Upload } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { MediaItem } from '../../types';

interface MediaManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (item: MediaItem) => void;
}

export const MediaManagerModal: React.FC<MediaManagerModalProps> = ({
  isOpen,
  onClose,
  onSelectMedia,
}) => {
  const { mediaItems, addMediaItem, deleteMediaItem } = useData();
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newAlt, setNewAlt] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  if (!isOpen) return null;

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUrl.trim() && newTitle.trim()) {
      const added = addMediaItem({
        title: newTitle.trim(),
        url: newUrl.trim(),
        alt: newAlt.trim() || newTitle.trim(),
      });
      setNewTitle('');
      setNewUrl('');
      setNewAlt('');
      setIsAddingNew(false);
      onSelectMedia(added);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Biblioteca de Mídia & Imagens</h3>
              <p className="text-xs text-stone-500">Selecione uma imagem ou cadastre uma nova URL</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Imagem</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isAddingNew && (
            <form onSubmit={handleAddNew} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs animate-in slide-in-from-top-2">
              <h4 className="font-bold text-stone-900">Cadastrar Nova Imagem</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Título da Imagem:</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex: Gráfico de Rendimento do CDB"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Texto Alternativo (Alt Text para Acessibilidade):</label>
                  <input
                    type="text"
                    value={newAlt}
                    onChange={(e) => setNewAlt(e.target.value)}
                    placeholder="Descrição da imagem para deficientes visuais e SEO"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-stone-700 mb-1">URL Direta da Imagem (Unsplash / CDN):</label>
                  <input
                    type="url"
                    required
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800"
                >
                  Salvar e Selecionar
                </button>
              </div>
            </form>
          )}

          {/* Media Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl border border-stone-200 overflow-hidden bg-stone-100 flex flex-col hover:border-emerald-600 transition-all cursor-pointer"
                onClick={() => {
                  onSelectMedia(item);
                  onClose();
                }}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={item.url}
                    alt={item.alt || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-emerald-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white font-semibold text-xs gap-1">
                    <Check className="w-4 h-4" />
                    <span>Selecionar</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-800 truncate text-[11px]">{item.title}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Deseja excluir esta imagem da biblioteca?')) {
                        deleteMediaItem(item.id);
                      }
                    }}
                    className="text-stone-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Excluir imagem"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

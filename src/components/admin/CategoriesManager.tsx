import React, { useState } from 'react';
import { FolderTree, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Category } from '../../types';
import { slugify } from '../../utils/formatters';

export const CategoriesManager: React.FC = () => {
  const { categories, articles, addCategory, updateCategory, deleteCategory } = useData();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('TrendingUp');

  const startCreate = () => {
    setName('');
    setSlug('');
    setDescription('');
    setIcon('TrendingUp');
    setIsCreating(true);
    setEditingId(null);
  };

  const startEdit = (cat: Category) => {
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setIcon(cat.icon || 'TrendingUp');
    setEditingId(cat.id);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalSlug = slug.trim() ? slugify(slug) : slugify(name);

    if (isCreating) {
      addCategory({
        name: name.trim(),
        slug: finalSlug,
        description: description.trim(),
        icon,
      });
      setIsCreating(false);
    } else if (editingId) {
      updateCategory(editingId, {
        name: name.trim(),
        slug: finalSlug,
        description: description.trim(),
        icon,
      });
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
            Categorias de Conteúdo ({categories.length})
          </h2>
          <p className="text-xs text-stone-500">
            Estruture o portal em trilhas temáticas claras (Finanças Pessoais, Renda Fixa, Investimentos, etc.)
          </p>
        </div>

        {!isCreating && !editingId && (
          <button
            onClick={startCreate}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Categoria</span>
          </button>
        )}
      </div>

      {/* Create / Edit Form Card */}
      {(isCreating || editingId) && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border-2 border-emerald-600/60 shadow-md space-y-4 text-xs animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-bold text-stone-900 text-sm">
              {isCreating ? 'Cadastrar Nova Categoria' : 'Editar Categoria'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingId(null);
              }}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Nome da Categoria:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (isCreating) setSlug(slugify(e.target.value));
                }}
                placeholder="Ex: Renda Fixa"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">Slug da URL:</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="renda-fixa"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-800 mb-1">Descrição Explicativa:</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Guia completo sobre títulos públicos, CDBs, LCIs e proteção do FGC..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingId(null);
              }}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800 shadow-xs"
            >
              {isCreating ? 'Salvar Categoria' : 'Atualizar Categoria'}
            </button>
          </div>
        </form>
      )}

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const articleCount = articles.filter((a) => a.category === cat.slug).length;

          return (
            <div
              key={cat.id}
              className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-stone-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                      <FolderTree className="w-4 h-4" />
                    </div>
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-mono text-[10px]">
                      /{cat.slug}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {articleCount} artigo(s)
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-stone-900">{cat.name}</h3>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {cat.description || 'Sem descrição cadastrada.'}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  onClick={() => startEdit(cat)}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>

                <button
                  onClick={() => {
                    if (articleCount > 0) {
                      alert(`Esta categoria possui ${articleCount} artigo(s) vinculado(s). Reatribua os artigos antes de excluir.`);
                      return;
                    }
                    if (confirm(`Excluir a categoria "${cat.name}"?`)) {
                      deleteCategory(cat.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                  title="Excluir categoria"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

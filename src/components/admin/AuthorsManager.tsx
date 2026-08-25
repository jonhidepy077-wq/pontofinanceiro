import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, ShieldCheck, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Author } from '../../types';
import { slugify } from '../../utils/formatters';

export const AuthorsManager: React.FC = () => {
  const { authors, articles, addAuthor, updateAuthor, deleteAuthor } = useData();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');

  const startCreate = () => {
    setName('');
    setSlug('');
    setRole('Educador Financeiro');
    setBio('');
    setAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
    setEmail('');
    setIsCreating(true);
    setEditingId(null);
  };

  const startEdit = (author: Author) => {
    setName(author.name);
    setSlug(author.slug);
    setRole(author.role);
    setBio(author.bio);
    setAvatar(author.avatar);
    setEmail(author.email || '');
    setEditingId(author.id);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalSlug = slug.trim() ? slugify(slug) : slugify(name);

    if (isCreating) {
      addAuthor({
        name: name.trim(),
        slug: finalSlug,
        role: role.trim(),
        bio: bio.trim(),
        avatar: avatar.trim(),
        email: email.trim() || undefined,
      });
      setIsCreating(false);
    } else if (editingId) {
      updateAuthor(editingId, {
        name: name.trim(),
        slug: finalSlug,
        role: role.trim(),
        bio: bio.trim(),
        avatar: avatar.trim(),
        email: email.trim() || undefined,
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
            Autores & Especialistas Editoriais ({authors.length})
          </h2>
          <p className="text-xs text-stone-500">
            Perfis de autoria com biografia detalhada e foto atendendo aos critérios E-E-A-T de transparência
          </p>
        </div>

        {!isCreating && !editingId && (
          <button
            onClick={startCreate}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Autor</span>
          </button>
        )}
      </div>

      {/* Form */}
      {(isCreating || editingId) && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border-2 border-emerald-600/60 shadow-md space-y-4 text-xs animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-bold text-stone-900 text-sm">
              {isCreating ? 'Cadastrar Novo Autor' : 'Editar Autor'}
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
              <label className="block font-semibold text-stone-800 mb-1">Nome Completo:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (isCreating) setSlug(slugify(e.target.value));
                }}
                placeholder="Ex: Mariana Albuquerque"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">Cargo / Especialidade:</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ex: Educadora Financeira & Planejadora"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-800 mb-1">URL da Foto de Perfil (Avatar):</label>
              <input
                type="url"
                required
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-800 mb-1">Mini-biografia Editorial:</label>
              <textarea
                rows={3}
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Formação, experiência e compromisso com a clareza didática..."
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
              {isCreating ? 'Salvar Autor' : 'Atualizar Autor'}
            </button>
          </div>
        </form>
      )}

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {authors.map((author) => {
          const authorArticles = articles.filter((a) => a.authorId === author.id);

          return (
            <div
              key={author.id}
              className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-stone-300 transition-all"
            >
              <div className="flex items-start gap-4">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-bold text-base text-stone-900 truncate">{author.name}</h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                  <p className="text-xs text-stone-500 font-medium">{author.role}</p>
                  <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {authorArticles.length} artigo(s)
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                {author.bio}
              </p>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  onClick={() => startEdit(author)}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Editar Perfil</span>
                </button>

                {authors.length > 1 && (
                  <button
                    onClick={() => {
                      if (authorArticles.length > 0) {
                        alert(`Este autor possui ${authorArticles.length} artigo(s) vinculados. Reatribua antes de excluir.`);
                        return;
                      }
                      if (confirm(`Excluir o autor "${author.name}"?`)) {
                        deleteAuthor(author.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                    title="Excluir autor"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

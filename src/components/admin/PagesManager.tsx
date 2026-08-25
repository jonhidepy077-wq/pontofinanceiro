import React, { useState } from 'react';
import { Layers, Edit2, Save, Eye, Check, ArrowLeft, ExternalLink } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Page } from '../../types';
import { formatDate } from '../../utils/formatters';

interface PagesManagerProps {
  navigate: (path: string) => void;
}

export const PagesManager: React.FC<PagesManagerProps> = ({ navigate }) => {
  const { pages, updatePage } = useData();

  const pageKeys = Object.keys(pages);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Form State for active page
  const activePage: Page | undefined = activeSlug ? pages[activeSlug] : undefined;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const startEdit = (slug: string) => {
    const p = pages[slug];
    if (p) {
      setActiveSlug(slug);
      setTitle(p.title);
      setContent(p.content);
      setMetaTitle(p.metaTitle || p.title);
      setMetaDescription(p.metaDescription || '');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSlug) return;

    updatePage(activeSlug, {
      title: title.trim(),
      content,
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
    });

    setNotification('Página institucional atualizada com sucesso!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
            Páginas Institucionais & Transparência
          </h2>
          <p className="text-xs text-stone-500">
            Edite as páginas fundamentais exigidas pelo Google AdSense, LGPD e diretrizes de autoridade
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-500 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {activeSlug && activePage ? (
        /* Edit Page View */
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6 text-xs animate-in fade-in">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveSlug(null)}
                className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Editando: {activePage.title}
                </h3>
                <span className="text-[11px] text-stone-400 font-mono">
                  URL: /{activePage.slug}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate(`/${activePage.slug}`)}
                className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-medium flex items-center gap-1 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ver no Site</span>
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Alterações</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Título da Página (H1):</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">Título SEO (Meta Title):</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-stone-800 mb-1">Meta Description:</label>
              <input
                type="text"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-stone-800 mb-1">
                Conteúdo da Página (em Markdown / Texto Formatado):
              </label>
              <textarea
                rows={16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 bg-stone-50/50 border border-stone-300 rounded-xl font-mono text-xs text-stone-900 focus:bg-white leading-relaxed"
              />
            </div>
          </div>
        </form>
      ) : (
        /* Pages List Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pageKeys.map((slug) => {
            const page = pages[slug];
            if (!page) return null;

            return (
              <div
                key={page.slug}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-stone-300 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono text-[10px]">
                      /{page.slug}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Atualizado: {formatDate(page.updatedAt)}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-stone-900">{page.title}</h3>
                  <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                    {page.content.replace(/[#*`_>]/g, '').slice(0, 140)}...
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                  <button
                    onClick={() => navigate(`/${page.slug}`)}
                    className="text-xs text-stone-500 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver</span>
                  </button>

                  <button
                    onClick={() => startEdit(page.slug)}
                    className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-700 hover:text-white text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Editar Conteúdo</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

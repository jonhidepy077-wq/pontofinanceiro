import React, { useState } from 'react';
import {
  FileText,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Copy,
  Calendar,
  Clock,
  Filter,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Article, ArticleStatus } from '../../types';
import { formatDate } from '../../utils/formatters';

interface ArticlesListProps {
  onNewArticle: () => void;
  onEditArticle: (id: string) => void;
  navigate: (path: string) => void;
}

export const ArticlesList: React.FC<ArticlesListProps> = ({
  onNewArticle,
  onEditArticle,
  navigate,
}) => {
  const { articles, categories, authors, deleteArticle, updateArticle, addArticle } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'featured' ? art.isFeatured : art.status === selectedStatus);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDuplicate = (art: Article) => {
    const duplicatedData = {
      ...art,
      title: `${art.title} (Cópia)`,
      slug: `${art.slug}-copia-${Date.now().toString().slice(-4)}`,
      status: 'draft' as ArticleStatus,
      isFeatured: false,
    };
    const created = addArticle(duplicatedData);
    onEditArticle(created.id);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Tem certeza que deseja excluir permanentemente o artigo "${title}"?`)) {
      deleteArticle(id);
    }
  };

  const handleToggleStatus = (art: Article) => {
    const nextStatus: ArticleStatus = art.status === 'published' ? 'draft' : 'published';
    updateArticle(art.id, { status: nextStatus });
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
            Gerenciamento de Artigos ({filteredArticles.length} de {articles.length})
          </h2>
          <p className="text-xs text-stone-500">
            Publique, edite rascunhos e controle a visibilidade do acervo educativo
          </p>
        </div>

        <button
          onClick={onNewArticle}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Escrever Artigo</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título, slug ou palavra-chave..."
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs text-stone-800"
          >
            <option value="all">Todas as Categorias</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs text-stone-800"
          >
            <option value="all">Todos os Status</option>
            <option value="published">Apenas Publicados</option>
            <option value="draft">Apenas Rascunhos</option>
            <option value="featured">Apenas Destaques da Home</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-3">
            <FileText className="w-10 h-10 mx-auto text-stone-300" />
            <p className="text-sm font-medium">Nenhum artigo encontrado com os filtros atuais.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="text-xs text-emerald-700 font-bold underline"
            >
              Limpar filtros de busca
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-700 font-bold uppercase tracking-wider text-[10px] border-b border-stone-200">
                <tr>
                  <th className="py-3.5 px-4">Artigo & Categoria</th>
                  <th className="py-3.5 px-4">Autor</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Data</th>
                  <th className="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredArticles.map((art) => {
                  const categoryObj = categories.find((c) => c.slug === art.category);
                  const authorObj = authors.find((a) => a.id === art.authorId);

                  return (
                    <tr key={art.id} className="hover:bg-stone-50/70 transition-colors">
                      {/* Title & Category */}
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="flex items-start gap-3">
                          <img
                            src={art.coverImage}
                            alt=""
                            className="w-12 h-9 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[10px] uppercase">
                                {categoryObj?.name || art.category}
                              </span>
                              {art.isFeatured && (
                                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                                  ★ Destaque
                                </span>
                              )}
                            </div>
                            <h4
                              onClick={() => onEditArticle(art.id)}
                              className="font-serif font-bold text-stone-900 hover:text-emerald-800 transition-colors line-clamp-1 cursor-pointer text-sm"
                            >
                              {art.title}
                            </h4>
                            <span className="text-[11px] text-stone-400 block truncate">
                              /blog/{art.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Author */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-stone-700">
                        <div className="flex items-center gap-2">
                          <img
                            src={authorObj?.avatar}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover border border-stone-200"
                            referrerPolicy="no-referrer"
                          />
                          <span className="truncate max-w-[120px]">{authorObj?.name || 'Redação'}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(art)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                            art.status === 'published'
                              ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                              : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                          }`}
                          title="Clique para alternar Publicado / Rascunho"
                        >
                          {art.status === 'published' ? '🟢 Publicado' : '🟡 Rascunho'}
                        </button>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-stone-500 text-[11px]">
                        <div>{formatDate(art.publishedAt || art.createdAt)}</div>
                        <div className="text-[10px] text-stone-400">{art.readingTimeMinutes} min leitura</div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => navigate(`/blog/${art.slug}`)}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-emerald-800 hover:bg-stone-100 cursor-pointer"
                            title="Ver artigo no site"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDuplicate(art)}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-blue-800 hover:bg-stone-100 cursor-pointer"
                            title="Duplicar como novo rascunho"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEditArticle(art.id)}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold cursor-pointer"
                            title="Editar artigo"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(art.id, art.title)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                            title="Excluir artigo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

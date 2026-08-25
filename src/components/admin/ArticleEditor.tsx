import React, { useState } from 'react';
import {
  Save,
  Eye,
  Sparkles,
  Image as ImageIcon,
  Plus,
  Trash2,
  Check,
  Calendar,
  Layers,
  Search,
  BookOpen,
  HelpCircle,
  Link2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Table as TableIcon,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';
import { Article, ArticleStatus, FinancialDisclaimerType, ArticleSource } from '../../types';
import { useData } from '../../context/DataContext';
import { slugify, calculateReadingTime } from '../../utils/formatters';
import { SEOPanel } from './SEOPanel';
import { AIAssistantModal } from './AIAssistantModal';
import { MediaManagerModal } from './MediaManagerModal';
import { ArticlePreviewModal } from './ArticlePreviewModal';

interface ArticleEditorProps {
  articleId?: string; // If undefined, creating new
  onSaved: (article: Article) => void;
  onCancel: () => void;
  navigate: (path: string) => void;
}

export const ArticleEditor: React.FC<ArticleEditorProps> = ({
  articleId,
  onSaved,
  onCancel,
  navigate,
}) => {
  const { articles, categories, authors, addArticle, updateArticle } = useData();

  const existingArticle = articleId ? articles.find((a) => a.id === articleId) : undefined;

  // Form State
  const [title, setTitle] = useState(existingArticle?.title || '');
  const [subtitle, setSubtitle] = useState(existingArticle?.subtitle || '');
  const [slug, setSlug] = useState(existingArticle?.slug || '');
  const [category, setCategory] = useState(existingArticle?.category || (categories[0]?.slug || 'financas-pessoais'));
  const [authorId, setAuthorId] = useState(existingArticle?.authorId || (authors[0]?.id || 'author-redacao-ponto-financeiro'));
  const [coverImage, setCoverImage] = useState(existingArticle?.coverImage || 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80');
  const [coverImageAlt, setCoverImageAlt] = useState(existingArticle?.coverImageAlt || '');
  const [status, setStatus] = useState<ArticleStatus>(existingArticle?.status || 'published');
  const [isFeatured, setIsFeatured] = useState(existingArticle?.isFeatured || false);
  const [isRecommended, setIsRecommended] = useState(existingArticle?.isRecommended || true);
  const [content, setContent] = useState(existingArticle?.content || '');
  const [excerpt, setExcerpt] = useState(existingArticle?.excerpt || '');
  const [disclaimerType, setDisclaimerType] = useState<FinancialDisclaimerType>(existingArticle?.disclaimerType || 'general');

  // SEO State
  const [metaTitle, setMetaTitle] = useState(existingArticle?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(existingArticle?.metaDescription || '');
  const [primaryKeyword, setPrimaryKeyword] = useState(existingArticle?.primaryKeyword || '');
  const [secondaryKeywords, setSecondaryKeywords] = useState<string[]>(existingArticle?.secondaryKeywords || []);
  const [canonicalUrl, setCanonicalUrl] = useState(existingArticle?.canonicalUrl || '');

  // Sources State
  const [sources, setSources] = useState<ArticleSource[]>(existingArticle?.sources || [
    { name: 'Banco Central do Brasil', url: 'https://www.bcb.gov.br', dateVerified: new Date().toISOString().split('T')[0] },
  ]);

  // UI Modals State
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'sources'>('content');
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Auto generate slug when title changes (if slug was empty or matches old title)
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!existingArticle) {
      setSlug(slugify(val));
    }
  };

  const handleInsertToolbar = (prefix: string, suffix = '') => {
    const textarea = document.getElementById('article-content-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || 'texto';
    const replacement = `${prefix}${selected}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  const handleAddSource = () => {
    setSources([
      ...sources,
      { name: '', url: '', dateVerified: new Date().toISOString().split('T')[0], note: '' },
    ]);
  };

  const handleUpdateSource = (index: number, field: keyof ArticleSource, val: string) => {
    setSources(
      sources.map((s, i) => (i === index ? { ...s, [field]: val } : s))
    );
  };

  const handleRemoveSource = (index: number) => {
    setSources(sources.filter((_, i) => i !== index));
  };

  const handleSave = (newStatus?: ArticleStatus) => {
    if (!title.trim()) {
      alert('Por favor, informe o título do artigo.');
      return;
    }

    const effectiveStatus = newStatus || status;
    const cleanSlug = slug.trim() ? slugify(slug) : slugify(title);

    const articleData = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      slug: cleanSlug,
      content,
      category,
      authorId,
      coverImage: coverImage.trim(),
      coverImageAlt: coverImageAlt.trim() || title.trim(),
      status: effectiveStatus,
      isFeatured,
      isRecommended,
      excerpt: excerpt.trim() || content.slice(0, 160) + '...',
      disclaimerType,
      metaTitle: metaTitle.trim() || title.trim(),
      metaDescription: metaDescription.trim() || (excerpt.trim() || title.trim()),
      primaryKeyword: primaryKeyword.trim() || title.toLowerCase(),
      secondaryKeywords,
      canonicalUrl: canonicalUrl.trim() || undefined,
      sources: sources.filter((s) => s.name.trim().length > 0),
    };

    if (existingArticle) {
      updateArticle(existingArticle.id, articleData);
      setNotification('Artigo atualizado com sucesso!');
      setTimeout(() => {
        onSaved({ ...existingArticle, ...articleData });
      }, 600);
    } else {
      const created = addArticle(articleData);
      setNotification('Artigo criado com sucesso!');
      setTimeout(() => {
        onSaved(created);
      }, 600);
    }
  };

  const currentArticleForPreview: Partial<Article> = {
    title: title || 'Título Provisório',
    subtitle,
    slug: slug || slugify(title || 'artigo'),
    content,
    category,
    authorId,
    coverImage,
    coverImageAlt,
    status,
    isFeatured,
    isRecommended,
    excerpt,
    disclaimerType,
    sources,
    readingTimeMinutes: calculateReadingTime(content),
    publishedAt: new Date().toISOString(),
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 cursor-pointer"
            title="Voltar para a lista"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
              {existingArticle ? 'Editar Artigo' : 'Criar Novo Artigo Educativo'}
            </h2>
            <p className="text-xs text-stone-500">
              {existingArticle ? `Editando: ${existingArticle.title}` : 'Redija e publique um guia claro para iniciantes'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsAIOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Assistente IA</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-3.5 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Pré-visualizar</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave('draft')}
            className="px-4 py-2 rounded-xl border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 text-xs font-semibold transition-colors cursor-pointer"
          >
            Salvar Rascunho
          </button>

          <button
            type="button"
            onClick={() => handleSave('published')}
            className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publicar Artigo</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-500 text-emerald-800 text-xs font-semibold rounded-xl animate-in fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Editor Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Main Editing Area */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Title & Subtitle Card */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                Título do Artigo (H1):
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Ex: Como Montar Sua Reserva de Emergência Passo a Passo"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl font-serif text-lg sm:text-xl font-bold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Subtítulo / Lead Explicativo:
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Uma síntese de uma frase que resume o valor deste artigo para o leitor..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Tab Navigation: Conteúdo / SEO / Fontes */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="flex border-b border-stone-200 bg-stone-50/70 p-2 gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'content'
                    ? 'bg-white text-emerald-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Conteúdo & Texto
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'seo'
                    ? 'bg-white text-emerald-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                SEO & Buscadores
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sources')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'sources'
                    ? 'bg-white text-emerald-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Fontes Oficiais ({sources.length})
              </button>
            </div>

            <div className="p-6">
              {/* TAB 1: CONTENT */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  {/* Markdown Quick Toolbar */}
                  <div className="flex flex-wrap items-center gap-1.5 p-2 bg-stone-100 rounded-xl border border-stone-200 text-stone-700 text-xs">
                    <button
                      type="button"
                      onClick={() => handleInsertToolbar('## ')}
                      className="px-2 py-1 bg-white hover:bg-stone-50 rounded border border-stone-300 font-bold"
                      title="Título de Seção (H2)"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertToolbar('### ')}
                      className="px-2 py-1 bg-white hover:bg-stone-50 rounded border border-stone-300 font-bold"
                      title="Subtítulo (H3)"
                    >
                      H3
                    </button>
                    <div className="w-px h-4 bg-stone-300 mx-1" />
                    <button
                      type="button"
                      onClick={() => handleInsertToolbar('**', '**')}
                      className="p-1.5 bg-white hover:bg-stone-50 rounded border border-stone-300"
                      title="Negrito"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertToolbar('*', '*')}
                      className="p-1.5 bg-white hover:bg-stone-50 rounded border border-stone-300"
                      title="Itálico"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-px h-4 bg-stone-300 mx-1" />
                    <button
                      type="button"
                      onClick={() => handleInsertToolbar('* ')}
                      className="p-1.5 bg-white hover:bg-stone-50 rounded border border-stone-300"
                      title="Lista com Marcadores"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertToolbar('1. ')}
                      className="p-1.5 bg-white hover:bg-stone-50 rounded border border-stone-300"
                      title="Lista Numerada"
                    >
                      <ListOrdered className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertToolbar('> ')}
                      className="p-1.5 bg-white hover:bg-stone-50 rounded border border-stone-300"
                      title="Citação / Destaque"
                    >
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertToolbar('| Coluna 1 | Coluna 2 |\n| :--- | :--- |\n| Item A | Item B |\n')}
                      className="p-1.5 bg-white hover:bg-stone-50 rounded border border-stone-300"
                      title="Inserir Tabela"
                    >
                      <TableIcon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertToolbar('[Texto do Link](', ')')}
                      className="p-1.5 bg-white hover:bg-stone-50 rounded border border-stone-300"
                      title="Inserir Link"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Main Textarea */}
                  <textarea
                    id="article-content-textarea"
                    rows={18}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escreva o artigo em Markdown com parágrafos claros, títulos (##), listas e caixas de destaque..."
                    className="w-full p-4 bg-stone-50/50 border border-stone-300 rounded-xl font-mono text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 leading-relaxed"
                  />

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                    <span>Tempo de leitura estimado: <strong>{calculateReadingTime(content)} min</strong></span>
                    <span>Total de palavras: <strong>{content.trim().split(/\s+/).filter(Boolean).length}</strong></span>
                  </div>
                </div>
              )}

              {/* TAB 2: SEO */}
              {activeTab === 'seo' && (
                <SEOPanel
                  title={title}
                  metaTitle={metaTitle}
                  setMetaTitle={setMetaTitle}
                  metaDescription={metaDescription}
                  setMetaDescription={setMetaDescription}
                  slug={slug}
                  setSlug={setSlug}
                  primaryKeyword={primaryKeyword}
                  setPrimaryKeyword={setPrimaryKeyword}
                  secondaryKeywords={secondaryKeywords}
                  setSecondaryKeywords={setSecondaryKeywords}
                  canonicalUrl={canonicalUrl}
                  setCanonicalUrl={setCanonicalUrl}
                  coverImage={coverImage}
                />
              )}

              {/* TAB 3: SOURCES & E-E-A-T */}
              {activeTab === 'sources' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-xs">Fontes Primárias e Órgãos Oficiais</h4>
                      <p className="text-[11px] text-stone-500">
                        Cite Banco Central, CVM, Tesouro Nacional, IBGE ou leis federais para garantir autoridade.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddSource}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 hover:bg-emerald-800"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Adicionar Fonte</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sources.map((src, sIdx) => (
                      <div key={sIdx} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-700">Fonte #{sIdx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSource(sIdx)}
                            className="text-stone-400 hover:text-rose-600"
                            title="Remover fonte"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Nome do Órgão/Instituição:</label>
                            <input
                              type="text"
                              value={src.name}
                              onChange={(e) => handleUpdateSource(sIdx, 'name', e.target.value)}
                              placeholder="Ex: Banco Central do Brasil (Bacen)"
                              className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-0.5">URL Oficial da Fonte:</label>
                            <input
                              type="url"
                              value={src.url || ''}
                              onChange={(e) => handleUpdateSource(sIdx, 'url', e.target.value)}
                              placeholder="https://www.bcb.gov.br"
                              className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Data de Verificação:</label>
                            <input
                              type="date"
                              value={src.dateVerified || ''}
                              onChange={(e) => handleUpdateSource(sIdx, 'dateVerified', e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Nota ou Relatório (Opcional):</label>
                            <input
                              type="text"
                              value={src.note || ''}
                              onChange={(e) => handleUpdateSource(sIdx, 'note', e.target.value)}
                              placeholder="Ex: Relatório Copom nº 250"
                              className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Metadata & Settings */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Publishing Box */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Status e Publicação
            </h3>

            <div>
              <label className="block font-medium text-stone-700 mb-1">Status Editorial:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-semibold text-stone-900"
              >
                <option value="published">🟢 Publicado (Visível no site)</option>
                <option value="draft">🟡 Rascunho (Privado no CMS)</option>
                <option value="scheduled">🔵 Agendado</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">Categoria:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-medium text-stone-900"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">Autor Responsável:</label>
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-medium text-stone-900"
              >
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>{a.name} ({a.role})</option>
                ))}
              </select>
            </div>

            <div className="pt-2 border-t border-stone-100 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span className="font-semibold text-stone-800">Destaque Principal na Home</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRecommended}
                  onChange={(e) => setIsRecommended(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span className="font-semibold text-stone-800">Exibir em Artigos Recomendados</span>
              </label>
            </div>
          </div>

          {/* Disclaimer Selector */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Aviso de Responsabilidade Financeira</span>
            </h3>

            <p className="text-stone-500 text-[11px]">
              Insere automaticamente a caixa de aviso legal educativo adequada ao tema.
            </p>

            <select
              value={disclaimerType}
              onChange={(e) => setDisclaimerType(e.target.value as FinancialDisclaimerType)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-medium text-stone-900"
            >
              <option value="general">Geral (Educação Financeira e Planejamento)</option>
              <option value="fixed_income">Renda Fixa (FGC, Tesouro, Tributação IR)</option>
              <option value="variable_income">Renda Variável (Risco e Volatilidade)</option>
              <option value="credit_debt">Crédito & Dívidas (Juros Rotativos)</option>
              <option value="none">Nenhum</option>
            </select>
          </div>

          {/* Cover Image Box */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                Imagem de Capa
              </h3>
              <button
                type="button"
                onClick={() => setIsMediaOpen(true)}
                className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Biblioteca</span>
              </button>
            </div>

            {coverImage && (
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={coverImage}
                  alt={coverImageAlt || title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-0.5">URL da Imagem:</label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-0.5">Alt Text (Acessibilidade & SEO):</label>
              <input
                type="text"
                value={coverImageAlt}
                onChange={(e) => setCoverImageAlt(e.target.value)}
                placeholder="Descreva a imagem para deficientes visuais e buscadores"
                className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        currentTitle={title}
        currentText={content}
        currentCategory={category}
        onApplyContent={(generated) => {
          setContent((prev) => (prev ? `${prev}\n\n${generated}` : generated));
        }}
      />

      {/* Media Manager Modal */}
      <MediaManagerModal
        isOpen={isMediaOpen}
        onClose={() => setIsMediaOpen(false)}
        onSelectMedia={(item) => {
          setCoverImage(item.url);
          setCoverImageAlt(item.alt || item.title);
        }}
      />

      {/* Article Live Preview Modal */}
      <ArticlePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        article={currentArticleForPreview}
        navigate={navigate}
      />
    </div>
  );
};

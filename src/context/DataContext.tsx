import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Article,
  Category,
  Author,
  SitePage,
  SiteSettings,
  Subscriber,
  ContactMessage,
  MediaItem,
  ArticleStatus,
} from '../types';
import { INITIAL_ARTICLES } from '../data/initialArticles';
import { INITIAL_CATEGORIES } from '../data/initialCategories';
import { INITIAL_AUTHORS } from '../data/initialAuthors';
import { INITIAL_PAGES } from '../data/initialPages';
import { INITIAL_SETTINGS } from '../data/initialSettings';
import { slugify, calculateReadingTime } from '../utils/formatters';

interface DataContextType {
  // Articles
  articles: Article[];
  publishedArticles: Article[];
  featuredArticle: Article | undefined;
  recommendedArticles: Article[];
  getArticleBySlug: (slug: string) => Article | undefined;
  getArticlesByCategory: (categorySlug: string) => Article[];
  getArticlesByAuthor: (authorId: string) => Article[];
  getRelatedArticles: (currentArticle: Article, limit?: number) => Article[];
  addArticle: (data: Partial<Article>) => Article;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  duplicateArticle: (id: string) => Article | null;
  toggleArticleStatus: (id: string, status: ArticleStatus) => void;
  incrementViewCount: (id: string) => void;

  // Categories
  categories: Category[];
  getCategoryBySlug: (slug: string) => Category | undefined;
  addCategory: (cat: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Authors
  authors: Author[];
  getAuthorById: (id: string) => Author | undefined;
  getAuthorBySlug: (slug: string) => Author | undefined;
  addAuthor: (auth: Omit<Author, 'id'>) => Author;
  updateAuthor: (id: string, updates: Partial<Author>) => void;
  deleteAuthor: (id: string) => void;

  // Pages
  pages: Record<string, SitePage>;
  getPageBySlug: (slug: string) => SitePage | undefined;
  updatePage: (slug: string, contentOrUpdates: string | Partial<SitePage>, title?: string) => void;

  // Settings
  settings: SiteSettings;
  updateSettings: (updates: Partial<SiteSettings>) => void;

  // Subscribers
  subscribers: Subscriber[];
  addSubscriber: (email: string, name?: string, source?: string) => { success: boolean; message: string };
  deleteSubscriber: (id: string) => void;

  // Messages
  contactMessages: ContactMessage[];
  addContactMessage: (data: { name: string; email: string; phone?: string; subject: string; message: string }) => { success: boolean; message: string };
  updateMessageStatus: (id: string, status: 'unread' | 'read' | 'replied') => void;
  updateContactMessageStatus: (id: string, status: 'unread' | 'read' | 'replied') => void;
  deleteContactMessage: (id: string) => void;

  // Media
  mediaItems: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'createdAt'>) => MediaItem;
  deleteMediaItem: (id: string) => void;

  // Database Backup / Restore
  exportDatabaseJson: () => string;
  importDatabaseJson: (jsonString: string) => { success: boolean; error?: string };
  resetDatabaseToDefaults: () => void;
  resetToInitialData: () => void;

  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// All CMS content is persisted through the /api/cms/* Netlify Functions,
// backed by Netlify Database. Mutation helpers below update local state
// synchronously (so callers can keep using the returned object right away,
// matching the original API) and fire the matching persistence call in the
// background — the same optimistic-UI pattern the admin panel already relied on.

async function persist(method: string, path: string, body?: unknown) {
  try {
    await fetch(path, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    console.error(`Failed to persist ${method} ${path}`, e);
  }
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [authors, setAuthors] = useState<Author[]>(INITIAL_AUTHORS);
  const [pages, setPages] = useState<Record<string, SitePage>>(INITIAL_PAGES);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/cms/all');
        if (!res.ok) throw new Error(`Failed to load CMS data: ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data.articles)) setArticles(data.articles);
        if (Array.isArray(data.categories)) setCategories(data.categories);
        if (Array.isArray(data.authors)) setAuthors(data.authors);
        if (data.pages && typeof data.pages === 'object') setPages(data.pages);
        if (data.settings) setSettings(data.settings);
        if (Array.isArray(data.subscribers)) setSubscribers(data.subscribers);
        if (Array.isArray(data.contactMessages)) setContactMessages(data.contactMessages);
        if (Array.isArray(data.mediaItems)) setMediaItems(data.mediaItems);
      } catch (e) {
        console.error('Error loading CMS data, using defaults', e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Derived published articles
  const publishedArticles = articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());

  const featuredArticle = publishedArticles.find((a) => a.isFeatured) || publishedArticles[0];
  const recommendedArticles = publishedArticles.filter((a) => a.isRecommended);

  // Article helpers
  const getArticleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

  const getArticlesByCategory = (categorySlug: string) => publishedArticles.filter((a) => a.category === categorySlug);

  const getArticlesByAuthor = (authorId: string) => publishedArticles.filter((a) => a.authorId === authorId);

  const getRelatedArticles = (currentArticle: Article, limit = 3): Article[] => {
    return publishedArticles
      .filter((a) => a.id !== currentArticle.id)
      .filter((a) => a.category === currentArticle.category || a.tags.some((t) => currentArticle.tags.includes(t)))
      .slice(0, limit);
  };

  const addArticle = (data: Partial<Article>): Article => {
    const now = new Date().toISOString();
    const title = data.title || 'Artigo Sem Título';
    const slug = data.slug ? slugify(data.slug) : slugify(title);
    const content = data.content || '';
    const readingTimeMinutes = calculateReadingTime(content);

    const newArticle: Article = {
      id: `art-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      subtitle: data.subtitle || '',
      content,
      slug,
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
      coverImageAlt: data.coverImageAlt || title,
      socialImage: data.socialImage || data.coverImage,
      category: data.category || (categories[0]?.slug || 'financas-pessoais'),
      subCategory: data.subCategory || '',
      tags: data.tags || ['Finanças'],
      authorId: data.authorId || (authors[0]?.id || 'author-redacao-ponto-financeiro'),
      status: data.status || 'draft',
      createdAt: now,
      updatedAt: now,
      publishedAt: data.status === 'published' ? (data.publishedAt || now) : undefined,
      scheduledFor: data.scheduledFor,
      isFeatured: !!data.isFeatured,
      isRecommended: !!data.isRecommended,
      metaTitle: data.metaTitle || title,
      metaDescription: data.metaDescription || (data.excerpt || title),
      primaryKeyword: data.primaryKeyword || title.toLowerCase(),
      secondaryKeywords: data.secondaryKeywords || [],
      excerpt: data.excerpt || (content.slice(0, 160) + '...'),
      readingTimeMinutes,
      disclaimerType: data.disclaimerType || 'general',
      sources: data.sources || [],
      internalLinks: data.internalLinks || [],
      externalLinks: data.externalLinks || [],
      canonicalUrl: data.canonicalUrl,
      viewCount: 0,
    };

    setArticles((prev) => [newArticle, ...prev]);
    persist('POST', '/api/cms/articles', newArticle);
    return newArticle;
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    const now = new Date().toISOString();
    let persistedUpdates: Partial<Article> | null = null;

    setArticles((prev) =>
      prev.map((art) => {
        if (art.id !== id) return art;

        const content = updates.content !== undefined ? updates.content : art.content;
        const readingTimeMinutes = calculateReadingTime(content);
        const nextStatus = updates.status !== undefined ? updates.status : art.status;
        const publishedAt =
          nextStatus === 'published' && !art.publishedAt
            ? now
            : updates.publishedAt !== undefined
            ? updates.publishedAt
            : art.publishedAt;

        const next = {
          ...art,
          ...updates,
          readingTimeMinutes,
          updatedAt: now,
          publishedAt,
        };
        persistedUpdates = { ...updates, readingTimeMinutes, updatedAt: now, publishedAt };
        return next;
      })
    );

    if (persistedUpdates) persist('PUT', `/api/cms/articles/${id}`, persistedUpdates);
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    persist('DELETE', `/api/cms/articles/${id}`);
  };

  const duplicateArticle = (id: string): Article | null => {
    const original = articles.find((a) => a.id === id);
    if (!original) return null;

    const copyTitle = `${original.title} (Cópia)`;
    const copySlug = `${original.slug}-copia-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const duplicated: Article = {
      ...original,
      id: `art-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: copyTitle,
      slug: copySlug,
      status: 'draft',
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
      publishedAt: undefined,
      viewCount: 0,
    };

    setArticles((prev) => [duplicated, ...prev]);
    persist('POST', '/api/cms/articles', duplicated);
    return duplicated;
  };

  const toggleArticleStatus = (id: string, status: ArticleStatus) => {
    updateArticle(id, { status });
  };

  const incrementViewCount = (id: string) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, viewCount: (a.viewCount || 0) + 1 } : a)));
    const current = articles.find((a) => a.id === id);
    persist('PUT', `/api/cms/articles/${id}`, { viewCount: (current?.viewCount || 0) + 1 });
  };

  // Category helpers
  const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

  const addCategory = (cat: Omit<Category, 'id'>): Category => {
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: cat.name,
      slug: slugify(cat.slug || cat.name),
      description: cat.description || '',
      iconName: cat.iconName || 'Folder',
      color: cat.color || 'emerald',
    };
    setCategories((prev) => [...prev, newCat]);
    persist('POST', '/api/cms/categories', newCat);
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    const nextUpdates = { ...updates, slug: updates.slug ? slugify(updates.slug) : undefined };
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates, slug: updates.slug ? slugify(updates.slug) : c.slug } : c)));
    persist('PUT', `/api/cms/categories/${id}`, nextUpdates);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    persist('DELETE', `/api/cms/categories/${id}`);
  };

  // Author helpers
  const getAuthorById = (id: string) => authors.find((a) => a.id === id);

  const getAuthorBySlug = (slug: string) => authors.find((a) => a.slug === slug);

  const addAuthor = (authData: Omit<Author, 'id'>): Author => {
    const newAuthor: Author = {
      id: `auth-${Date.now()}`,
      name: authData.name,
      slug: slugify(authData.slug || authData.name),
      role: authData.role || 'Redator de Finanças',
      bio: authData.bio || '',
      avatar: authData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      email: authData.email,
      socials: authData.socials,
    };
    setAuthors((prev) => [...prev, newAuthor]);
    persist('POST', '/api/cms/authors', newAuthor);
    return newAuthor;
  };

  const updateAuthor = (id: string, updates: Partial<Author>) => {
    const nextUpdates = { ...updates, slug: updates.slug ? slugify(updates.slug) : undefined };
    setAuthors((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates, slug: updates.slug ? slugify(updates.slug) : a.slug } : a)));
    persist('PUT', `/api/cms/authors/${id}`, nextUpdates);
  };

  const deleteAuthor = (id: string) => {
    setAuthors((prev) => prev.filter((a) => a.id !== id));
    persist('DELETE', `/api/cms/authors/${id}`);
  };

  // Page helpers
  const getPageBySlug = (slug: string) => pages[slug];

  const updatePage = (slug: string, contentOrUpdates: string | Partial<SitePage>, title?: string) => {
    let bodyToPersist: Partial<SitePage> = {};

    setPages((prev) => {
      const existing = prev[slug] || {
        id: `page-${slug}`,
        slug,
        title: title || slug,
        content: '',
        updatedAt: new Date().toISOString(),
      };

      if (typeof contentOrUpdates === 'string') {
        bodyToPersist = { title: title || existing.title, content: contentOrUpdates };
        return {
          ...prev,
          [slug]: {
            ...existing,
            title: title || existing.title,
            content: contentOrUpdates,
            updatedAt: new Date().toISOString(),
          },
        };
      }

      bodyToPersist = contentOrUpdates;
      return {
        ...prev,
        [slug]: {
          ...existing,
          ...contentOrUpdates,
          updatedAt: new Date().toISOString(),
        },
      };
    });

    persist('PUT', `/api/cms/pages/${slug}`, bodyToPersist);
  };

  // Settings helpers
  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...updates,
      adsConfig: updates.adsConfig ? { ...prev.adsConfig, ...updates.adsConfig } : prev.adsConfig,
      cookieSettings: updates.cookieSettings ? { ...prev.cookieSettings, ...updates.cookieSettings } : prev.cookieSettings,
      socialLinks: updates.socialLinks ? { ...prev.socialLinks, ...updates.socialLinks } : prev.socialLinks,
    }));
    persist('PUT', '/api/cms/settings', updates);
  };

  // Subscribers
  const addSubscriber = (email: string, name?: string, source = 'newsletter-box') => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Por favor, insira um e-mail válido.' };
    }
    if (subscribers.some((s) => s.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'Este e-mail já está cadastrado em nossa newsletter.' };
    }

    const newSub: Subscriber = {
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      name: name?.trim(),
      createdAt: new Date().toISOString(),
      source,
      consentGiven: true,
    };
    setSubscribers((prev) => [newSub, ...prev]);
    persist('POST', '/api/cms/subscribers', newSub);
    return { success: true, message: 'Inscrição confirmada com sucesso! Você receberá nossos melhores conteúdos educativos.' };
  };

  const deleteSubscriber = (id: string) => {
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    persist('DELETE', `/api/cms/subscribers/${id}`);
  };

  // Contact Messages
  const addContactMessage = (data: { name: string; email: string; phone?: string; subject: string; message: string }) => {
    if (!data.name || !data.email || !data.message) {
      return { success: false, message: 'Por favor, preencha todos os campos obrigatórios.' };
    }
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject || 'Contato pelo site',
      message: data.message,
      createdAt: new Date().toISOString(),
      status: 'unread',
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    persist('POST', '/api/cms/contact-messages', newMsg);
    return { success: true, message: 'Mensagem enviada com sucesso! Responderemos o mais breve possível.' };
  };

  const updateMessageStatus = (id: string, status: 'unread' | 'read' | 'replied') => {
    setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    persist('PUT', `/api/cms/contact-messages/${id}`, { status });
  };

  const updateContactMessageStatus = updateMessageStatus;

  const deleteContactMessage = (id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
    persist('DELETE', `/api/cms/contact-messages/${id}`);
  };

  // Media
  const addMediaItem = (item: Omit<MediaItem, 'id' | 'createdAt'>): MediaItem => {
    const newItem: MediaItem = {
      id: `media-${Date.now()}`,
      title: item.title,
      url: item.url,
      alt: item.alt,
      createdAt: new Date().toISOString(),
      category: item.category,
    };
    setMediaItems((prev) => [newItem, ...prev]);
    persist('POST', '/api/cms/media', newItem);
    return newItem;
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
    persist('DELETE', `/api/cms/media/${id}`);
  };

  // Database Export & Import
  const exportDatabaseJson = () => {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      articles,
      categories,
      authors,
      pages,
      settings,
      subscribers,
      mediaItems,
    };
    return JSON.stringify(backup, null, 2);
  };

  const importDatabaseJson = (jsonString: string): { success: boolean; error?: string } => {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') throw new Error('Formato JSON inválido.');

      if (Array.isArray(data.articles)) {
        setArticles(data.articles);
        data.articles.forEach((a: Article) => persist('POST', '/api/cms/articles', a));
      }
      if (Array.isArray(data.categories)) {
        setCategories(data.categories);
        data.categories.forEach((c: Category) => persist('POST', '/api/cms/categories', c));
      }
      if (Array.isArray(data.authors)) {
        setAuthors(data.authors);
        data.authors.forEach((a: Author) => persist('POST', '/api/cms/authors', a));
      }
      if (data.pages && typeof data.pages === 'object') {
        setPages(data.pages);
        Object.values(data.pages as Record<string, SitePage>).forEach((p) => persist('PUT', `/api/cms/pages/${p.slug}`, p));
      }
      if (data.settings && typeof data.settings === 'object') {
        setSettings(data.settings);
        persist('PUT', '/api/cms/settings', data.settings);
      }
      if (Array.isArray(data.subscribers)) setSubscribers(data.subscribers);
      if (Array.isArray(data.mediaItems)) setMediaItems(data.mediaItems);

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Falha ao importar base de dados.' };
    }
  };

  const resetDatabaseToDefaults = () => {
    setArticles(INITIAL_ARTICLES);
    setCategories(INITIAL_CATEGORIES);
    setAuthors(INITIAL_AUTHORS);
    setPages(INITIAL_PAGES);
    setSettings(INITIAL_SETTINGS);
  };

  const resetToInitialData = resetDatabaseToDefaults;

  return (
    <DataContext.Provider
      value={{
        articles,
        publishedArticles,
        featuredArticle,
        recommendedArticles,
        getArticleBySlug,
        getArticlesByCategory,
        getArticlesByAuthor,
        getRelatedArticles,
        addArticle,
        updateArticle,
        deleteArticle,
        duplicateArticle,
        toggleArticleStatus,
        incrementViewCount,

        categories,
        getCategoryBySlug,
        addCategory,
        updateCategory,
        deleteCategory,

        authors,
        getAuthorById,
        getAuthorBySlug,
        addAuthor,
        updateAuthor,
        deleteAuthor,

        pages,
        getPageBySlug,
        updatePage,

        settings,
        updateSettings,

        subscribers,
        addSubscriber,
        deleteSubscriber,

        contactMessages,
        addContactMessage,
        updateMessageStatus,
        updateContactMessageStatus,
        deleteContactMessage,

        mediaItems,
        addMediaItem,
        deleteMediaItem,

        exportDatabaseJson,
        importDatabaseJson,
        resetDatabaseToDefaults,
        resetToInitialData,

        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

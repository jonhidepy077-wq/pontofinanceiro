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
  updatePage: (
    slug: string,
    contentOrUpdates: string | Partial<SitePage>,
    title?: string
  ) => void;

  // Settings
  settings: SiteSettings;
  updateSettings: (updates: Partial<SiteSettings>) => void;

  // Subscribers
  subscribers: Subscriber[];
  addSubscriber: (
    email: string,
    name?: string,
    source?: string
  ) => { success: boolean; message: string };
  deleteSubscriber: (id: string) => void;

  // Messages
  contactMessages: ContactMessage[];
  addContactMessage: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => { success: boolean; message: string };

  updateMessageStatus: (
    id: string,
    status: 'unread' | 'read' | 'replied'
  ) => void;

  updateContactMessageStatus: (
    id: string,
    status: 'unread' | 'read' | 'replied'
  ) => void;

  deleteContactMessage: (id: string) => void;

  // Media
  mediaItems: MediaItem[];
  addMediaItem: (
    item: Omit<MediaItem, 'id' | 'createdAt'>
  ) => MediaItem;
  deleteMediaItem: (id: string) => void;

  // Database Backup / Restore
  exportDatabaseJson: () => string;
  importDatabaseJson: (
    jsonString: string
  ) => { success: boolean; error?: string };

  resetDatabaseToDefaults: () => void;
  resetToInitialData: () => void;

  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

async function persist(
  method: string,
  path: string,
  body?: unknown
) {
  try {
    const response = await fetch(path, {
      method,
      headers: body
        ? { 'Content-Type': 'application/json' }
        : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      console.error(
        `Failed to persist ${method} ${path}: ${response.status}`
      );
    }
  } catch (error) {
    console.error(
      `Failed to persist ${method} ${path}`,
      error
    );
  }
}

export const DataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [articles, setArticles] =
    useState<Article[]>(INITIAL_ARTICLES);

  const [categories, setCategories] =
    useState<Category[]>(INITIAL_CATEGORIES);

  const [authors, setAuthors] =
    useState<Author[]>(INITIAL_AUTHORS);

  const [pages, setPages] =
    useState<Record<string, SitePage>>(INITIAL_PAGES);

  const [settings, setSettings] =
    useState<SiteSettings>(INITIAL_SETTINGS);

  const [subscribers, setSubscribers] =
    useState<Subscriber[]>([]);

  const [contactMessages, setContactMessages] =
    useState<ContactMessage[]>([]);

  const [mediaItems, setMediaItems] =
    useState<MediaItem[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  /*
   * Carrega os dados salvos no Netlify Database.
   *
   * IMPORTANTE:
   * Se a API não retornar artigos, mantemos os artigos
   * existentes em INITIAL_ARTICLES.
   */
  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        const response = await fetch('/api/cms/all');

        if (!response.ok) {
          throw new Error(
            `Failed to load CMS data: ${response.status}`
          );
        }

        const data = await response.json();

        if (cancelled) return;

        /*
         * ARTIGOS
         *
         * Só substitui INITIAL_ARTICLES se a API realmente
         * devolver uma lista de artigos com conteúdo.
         */
        if (
          Array.isArray(data.articles) &&
          data.articles.length > 0
        ) {
          setArticles(data.articles);
        }

        /*
         * CATEGORIAS
         */
        if (
          Array.isArray(data.categories) &&
          data.categories.length > 0
        ) {
          setCategories(data.categories);
        }

        /*
         * AUTORES
         */
        if (
          Array.isArray(data.authors) &&
          data.authors.length > 0
        ) {
          setAuthors(data.authors);
        }

        /*
         * PÁGINAS
         */
        if (
          data.pages &&
          typeof data.pages === 'object'
        ) {
          setPages(data.pages);
        }

        /*
         * CONFIGURAÇÕES
         */
        if (
          data.settings &&
          typeof data.settings === 'object'
        ) {
          setSettings(data.settings);
        }

        /*
         * ASSINANTES
         */
        if (Array.isArray(data.subscribers)) {
          setSubscribers(data.subscribers);
        }

        /*
         * MENSAGENS
         */
        if (Array.isArray(data.contactMessages)) {
          setContactMessages(data.contactMessages);
        }

        /*
         * MÍDIA
         */
        if (Array.isArray(data.mediaItems)) {
          setMediaItems(data.mediaItems);
        }

      } catch (error) {
        console.error(
          'Error loading CMS data, using defaults',
          error
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  // ============================================================
  // ARTICLES
  // ============================================================

  const publishedArticles = articles
    .filter(
      (article) => article.status === 'published'
    )
    .sort(
      (a, b) =>
        new Date(
          b.publishedAt || b.createdAt
        ).getTime() -
        new Date(
          a.publishedAt || a.createdAt
        ).getTime()
    );

  const featuredArticle =
    publishedArticles.find(
      (article) => article.isFeatured
    ) || publishedArticles[0];

  const recommendedArticles =
    publishedArticles.filter(
      (article) => article.isRecommended
    );

  const getArticleBySlug = (slug: string) =>
    articles.find(
      (article) => article.slug === slug
    );

  const getArticlesByCategory = (
    categorySlug: string
  ) =>
    publishedArticles.filter(
      (article) =>
        article.category === categorySlug
    );

  const getArticlesByAuthor = (
    authorId: string
  ) =>
    publishedArticles.filter(
      (article) =>
        article.authorId === authorId
    );

  const getRelatedArticles = (
    currentArticle: Article,
    limit = 3
  ): Article[] => {
    return publishedArticles
      .filter(
        (article) =>
          article.id !== currentArticle.id
      )
      .filter(
        (article) =>
          article.category ===
            currentArticle.category ||
          article.tags.some((tag) =>
            currentArticle.tags.includes(tag)
          )
      )
      .slice(0, limit);
  };

  const addArticle = (
    data: Partial<Article>
  ): Article => {
    const now = new Date().toISOString();

    const title =
      data.title || 'Artigo Sem Título';

    const slug = data.slug
      ? slugify(data.slug)
      : slugify(title);

    const content = data.content || '';

    const readingTimeMinutes =
      calculateReadingTime(content);

    const newArticle: Article = {
      id: `art-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)}`,

      title,

      subtitle:
        data.subtitle || '',

      content,

      slug,

      coverImage:
        data.coverImage ||
        'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',

      coverImageAlt:
        data.coverImageAlt || title,

      socialImage:
        data.socialImage ||
        data.coverImage,

      category:
        data.category ||
        categories[0]?.slug ||
        'financas-pessoais',

      subCategory:
        data.subCategory || '',

      tags:
        data.tags || ['Finanças'],

      authorId:
        data.authorId ||
        authors[0]?.id ||
        'author-redacao-ponto-financeiro',

      status:
        data.status || 'draft',

      createdAt: now,

      updatedAt: now,

      publishedAt:
        data.status === 'published'
          ? data.publishedAt || now
          : undefined,

      scheduledFor:
        data.scheduledFor,

      isFeatured:
        !!data.isFeatured,

      isRecommended:
        !!data.isRecommended,

      metaTitle:
        data.metaTitle || title,

      metaDescription:
        data.metaDescription ||
        data.excerpt ||
        title,

      primaryKeyword:
        data.primaryKeyword ||
        title.toLowerCase(),

      secondaryKeywords:
        data.secondaryKeywords || [],

      excerpt:
        data.excerpt ||
        content.slice(0, 160) + '...',

      readingTimeMinutes,

      disclaimerType:
        data.disclaimerType || 'general',

      sources:
        data.sources || [],

      internalLinks:
        data.internalLinks || [],

      externalLinks:
        data.externalLinks || [],

      canonicalUrl:
        data.canonicalUrl,

      viewCount: 0,
    };

    setArticles((previous) => [
      newArticle,
      ...previous,
    ]);

    persist(
      'POST',
      '/api/cms/articles',
      newArticle
    );

    return newArticle;
  };

  const updateArticle = (
    id: string,
    updates: Partial<Article>
  ) => {
    const now = new Date().toISOString();

    let persistedUpdates:
      | Partial<Article>
      | null = null;

    setArticles((previous) =>
      previous.map((article) => {
        if (article.id !== id) {
          return article;
        }

        const content =
          updates.content !== undefined
            ? updates.content
            : article.content;

        const readingTimeMinutes =
          calculateReadingTime(content);

        const nextStatus =
          updates.status !== undefined
            ? updates.status
            : article.status;

        const publishedAt =
          nextStatus === 'published' &&
          !article.publishedAt
            ? now
            : updates.publishedAt !== undefined
            ? updates.publishedAt
            : article.publishedAt;

        const nextArticle = {
          ...article,
          ...updates,
          readingTimeMinutes,
          updatedAt: now,
          publishedAt,
        };

        persistedUpdates = {
          ...updates,
          readingTimeMinutes,
          updatedAt: now,
          publishedAt,
        };

        return nextArticle;
      })
    );

    if (persistedUpdates) {
      persist(
        'PUT',
        `/api/cms/articles/${id}`,
        persistedUpdates
      );
    }
  };

  const deleteArticle = (id: string) => {
    setArticles((previous) =>
      previous.filter(
        (article) => article.id !== id
      )
    );

    persist(
      'DELETE',
      `/api/cms/articles/${id}`
    );
  };

  const duplicateArticle = (
    id: string
  ): Article | null => {
    const original = articles.find(
      (article) => article.id === id
    );

    if (!original) {
      return null;
    }

    const copyTitle =
      `${original.title} (Cópia)`;

    const copySlug =
      `${original.slug}-copia-${Math.random()
        .toString(36)
        .substring(2, 6)}`;

    const now =
      new Date().toISOString();

    const duplicated: Article = {
      ...original,

      id: `art-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)}`,

      title: copyTitle,

      slug: copySlug,

      status: 'draft',

      isFeatured: false,

      createdAt: now,

      updatedAt: now,

      publishedAt: undefined,

      viewCount: 0,
    };

    setArticles((previous) => [
      duplicated,
      ...previous,
    ]);

    persist(
      'POST',
      '/api/cms/articles',
      duplicated
    );

    return duplicated;
  };

  const toggleArticleStatus = (
    id: string,
    status: ArticleStatus
  ) => {
    updateArticle(id, { status });
  };

  const incrementViewCount = (
    id: string
  ) => {
    setArticles((previous) =>
      previous.map((article) =>
        article.id === id
          ? {
              ...article,
              viewCount:
                (article.viewCount || 0) + 1,
            }
          : article
      )
    );

    const currentArticle =
      articles.find(
        (article) => article.id === id
      );

    persist(
      'PUT',
      `/api/cms/articles/${id}`,
      {
        viewCount:
          (currentArticle?.viewCount || 0) + 1,
      }
    );
  };

  // ============================================================
  // CATEGORIES
  // ============================================================

  const getCategoryBySlug = (
    slug: string
  ) =>
    categories.find(
      (category) =>
        category.slug === slug
    );

  const addCategory = (
    category: Omit<Category, 'id'>
  ): Category => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,

      name: category.name,

      slug: slugify(
        category.slug || category.name
      ),

      description:
        category.description || '',

      iconName:
        category.iconName || 'Folder',

      color:
        category.color || 'emerald',
    };

    setCategories((previous) => [
      ...previous,
      newCategory,
    ]);

    persist(
      'POST',
      '/api/cms/categories',
      newCategory
    );

    return newCategory;
  };

  const updateCategory = (
    id: string,
    updates: Partial<Category>
  ) => {
    const nextUpdates = {
      ...updates,
      slug: updates.slug
        ? slugify(updates.slug)
        : undefined,
    };

    setCategories((previous) =>
      previous.map((category) =>
        category.id === id
          ? {
              ...category,
              ...updates,
              slug: updates.slug
                ? slugify(updates.slug)
                : category.slug,
            }
          : category
      )
    );

    persist(
      'PUT',
      `/api/cms/categories/${id}`,
      nextUpdates
    );
  };

  const deleteCategory = (
    id: string
  ) => {
    setCategories((previous) =>
      previous.filter(
        (category) =>
          category.id !== id
      )
    );

    persist(
      'DELETE',
      `/api/cms/categories/${id}`
    );
  };

  // ============================================================
  // AUTHORS
  // ============================================================

  const getAuthorById = (
    id: string
  ) =>
    authors.find(
      (author) => author.id === id
    );

  const getAuthorBySlug = (
    slug: string
  ) =>
    authors.find(
      (author) => author.slug === slug
    );

  const addAuthor = (
    authData: Omit<Author, 'id'>
  ): Author => {
    const newAuthor: Author = {
      id: `auth-${Date.now()}`,

      name: authData.name,

      slug: slugify(
        authData.slug || authData.name
      ),

      role:
        authData.role ||
        'Redator de Finanças',

      bio:
        authData.bio || '',

      avatar:
        authData.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',

      email:
        authData.email,

      socials:
        authData.socials,
    };

    setAuthors((previous) => [
      ...previous,
      newAuthor,
    ]);

    persist(
      'POST',
      '/api/cms/authors',
      newAuthor
    );

    return newAuthor;
  };

  const updateAuthor = (
    id: string,
    updates: Partial<Author>
  ) => {
    const nextUpdates = {
      ...updates,
      slug: updates.slug
        ? slugify(updates.slug)
        : undefined,
    };

    setAuthors((previous) =>
      previous.map((author) =>
        author.id === id
          ? {
              ...author,
              ...updates,
              slug: updates.slug
                ? slugify(updates.slug)
                : author.slug,
            }
          : author
      )
    );

    persist(
      'PUT',
      `/api/cms/authors/${id}`,
      nextUpdates
    );
  };

  const deleteAuthor = (
    id: string
  ) => {
    setAuthors((previous) =>
      previous.filter(
        (author) =>
          author.id !== id
      )
    );

    persist(
      'DELETE',
      `/api/cms/authors/${id}`
    );
  };

  // ============================================================
  // PAGES
  // ============================================================

  const getPageBySlug = (
    slug: string
  ) => pages[slug];

  const updatePage = (
    slug: string,
    contentOrUpdates:
      | string
      | Partial<SitePage>,
    title?: string
  ) => {
    let bodyToPersist:
      Partial<SitePage> = {};

    setPages((previous) => {
      const existing =
        previous[slug] || {
          id: `page-${slug}`,
          slug,
          title: title || slug,
          content: '',
          updatedAt:
            new Date().toISOString(),
        };

      if (
        typeof contentOrUpdates ===
        'string'
      ) {
        bodyToPersist = {
          title:
            title || existing.title,
          content:
            contentOrUpdates,
        };

        return {
          ...previous,

          [slug]: {
            ...existing,

            title:
              title || existing.title,

            content:
              contentOrUpdates,

            updatedAt:
              new Date().toISOString(),
          },
        };
      }

      bodyToPersist =
        contentOrUpdates;

      return {
        ...previous,

        [slug]: {
          ...existing,
          ...contentOrUpdates,

          updatedAt:
            new Date().toISOString(),
        },
      };
    });

    persist(
      'PUT',
      `/api/cms/pages/${slug}`,
      bodyToPersist
    );
  };

  // ============================================================
  // SETTINGS
  // ============================================================

  const updateSettings = (
    updates: Partial<SiteSettings>
  ) => {
    setSettings((previous) => ({
      ...previous,

      ...updates,

      adsConfig:
        updates.adsConfig
          ? {
              ...previous.adsConfig,
              ...updates.adsConfig,
            }
          : previous.adsConfig,

      cookieSettings:
        updates.cookieSettings
          ? {
              ...previous.cookieSettings,
              ...updates.cookieSettings,
            }
          : previous.cookieSettings,

      socialLinks:
        updates.socialLinks
          ? {
              ...previous.socialLinks,
              ...updates.socialLinks,
            }
          : previous.socialLinks,
    }));

    persist(
      'PUT',
      '/api/cms/settings',
      updates
    );
  };

  // ============================================================
  // SUBSCRIBERS
  // ============================================================

  const addSubscriber = (
    email: string,
    name?: string,
    source = 'newsletter-box'
  ) => {
    const cleanEmail =
      email.trim().toLowerCase();

    if (
      !cleanEmail ||
      !cleanEmail.includes('@')
    ) {
      return {
        success: false,
        message:
          'Por favor, insira um e-mail válido.',
      };
    }

    if (
      subscribers.some(
        (subscriber) =>
          subscriber.email.toLowerCase() ===
          cleanEmail
      )
    ) {
      return {
        success: false,
        message:
          'Este e-mail já está cadastrado em nossa newsletter.',
      };
    }

    const newSubscriber: Subscriber = {
      id: `sub-${Date.now()}`,

      email: cleanEmail,

      name: name?.trim(),

      createdAt:
        new Date().toISOString(),

      source,

      consentGiven: true,
    };

    setSubscribers((previous) => [
      newSubscriber,
      ...previous,
    ]);

    persist(
      'POST',
      '/api/cms/subscribers',
      newSubscriber
    );

    return {
      success: true,
      message:
        'Inscrição confirmada com sucesso! Você receberá nossos melhores conteúdos educativos.',
    };
  };

  const deleteSubscriber = (
    id: string
  ) => {
    setSubscribers((previous) =>
      previous.filter(
        (subscriber) =>
          subscriber.id !== id
      )
    );

    persist(
      'DELETE',
      `/api/cms/subscribers/${id}`
    );
  };

  // ============================================================
  // CONTACT MESSAGES
  // ============================================================

  const addContactMessage = (
    data: {
      name: string;
      email: string;
      phone?: string;
      subject: string;
      message: string;
    }
  ) => {
    if (
      !data.name ||
      !data.email ||
      !data.message
    ) {
      return {
        success: false,
        message:
          'Por favor, preencha todos os campos obrigatórios.',
      };
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,

      name: data.name,

      email: data.email,

      phone: data.phone,

      subject:
        data.subject ||
        'Contato pelo site',

      message: data.message,

      createdAt:
        new Date().toISOString(),

      status: 'unread',
    };

    setContactMessages((previous) => [
      newMessage,
      ...previous,
    ]);

    persist(
      'POST',
      '/api/cms/contact-messages',
      newMessage
    );

    return {
      success: true,
      message:
        'Mensagem enviada com sucesso! Responderemos o mais breve possível.',
    };
  };

  const updateMessageStatus = (
    id: string,
    status:
      | 'unread'
      | 'read'
      | 'replied'
  ) => {
    setContactMessages((previous) =>
      previous.map((message) =>
        message.id === id
          ? {
              ...message,
              status,
            }
          : message
      )
    );

    persist(
      'PUT',
      `/api/cms/contact-messages/${id}`,
      { status }
    );
  };

  const updateContactMessageStatus =
    updateMessageStatus;

  const deleteContactMessage = (
    id: string
  ) => {
    setContactMessages((previous) =>
      previous.filter(
        (message) =>
          message.id !== id
      )
    );

    persist(
      'DELETE',
      `/api/cms/contact-messages/${id}`
    );
  };

  // ============================================================
  // MEDIA
  // ============================================================

  const addMediaItem = (
    item: Omit<
      MediaItem,
      'id' | 'createdAt'
    >
  ): MediaItem => {
    const newItem: MediaItem = {
      id: `media-${Date.now()}`,

      title: item.title,

      url: item.url,

      alt: item.alt,

      createdAt:
        new Date().toISOString(),

      category:
        item.category,
    };

    setMediaItems((previous) => [
      newItem,
      ...previous,
    ]);

    persist(
      'POST',
      '/api/cms/media',
      newItem
    );

    return newItem;
  };

  const deleteMediaItem = (
    id: string
  ) => {
    setMediaItems((previous) =>
      previous.filter(
        (item) =>
          item.id !== id
      )
    );

    persist(
      'DELETE',
      `/api/cms/media/${id}`
    );
  };

  // ============================================================
  // DATABASE EXPORT / IMPORT
  // ============================================================

  const exportDatabaseJson = () => {
    const backup = {
      version: '1.0',

      exportedAt:
        new Date().toISOString(),

      articles,

      categories,

      authors,

      pages,

      settings,

      subscribers,

      mediaItems,
    };

    return JSON.stringify(
      backup,
      null,
      2
    );
  };

  const importDatabaseJson = (
    jsonString: string
  ): {
    success: boolean;
    error?: string;
  } => {
    try {
      const data =
        JSON.parse(jsonString);

      if (
        !data ||
        typeof data !== 'object'
      ) {
        throw new Error(
          'Formato JSON inválido.'
        );
      }

      if (
        Array.isArray(data.articles)
      ) {
        setArticles(
          data.articles
        );

        data.articles.forEach(
          (article: Article) => {
            persist(
              'POST',
              '/api/cms/articles',
              article
            );
          }
        );
      }

      if (
        Array.isArray(data.categories)
      ) {
        setCategories(
          data.categories
        );

        data.categories.forEach(
          (category: Category) => {
            persist(
              'POST',
              '/api/cms/categories',
              category
            );
          }
        );
      }

      if (
        Array.isArray(data.authors)
      ) {
        setAuthors(
          data.authors
        );

        data.authors.forEach(
          (author: Author) => {
            persist(
              'POST',
              '/api/cms/authors',
              author
            );
          }
        );
      }

      if (
        data.pages &&
        typeof data.pages ===
          'object'
      ) {
        setPages(data.pages);

        Object.values(
          data.pages as Record<
            string,
            SitePage
          >
        ).forEach((page) => {
          persist(
            'PUT',
            `/api/cms/pages/${page.slug}`,
            page
          );
        });
      }

      if (
        data.settings &&
        typeof data.settings ===
          'object'
      ) {
        setSettings(
          data.settings
        );

        persist(
          'PUT',
          '/api/cms/settings',
          data.settings
        );
      }

      if (
        Array.isArray(
          data.subscribers
        )
      ) {
        setSubscribers(
          data.subscribers
        );
      }

      if (
        Array.isArray(
          data.mediaItems
        )
      ) {
        setMediaItems(
          data.mediaItems
        );
      }

      return {
        success: true,
      };

    } catch (error: any) {
      return {
        success: false,
        error:
          error.message ||
          'Falha ao importar base de dados.',
      };
    }
  };

  // ============================================================
  // RESET
  // ============================================================

  const resetDatabaseToDefaults =
    () => {
      setArticles(
        INITIAL_ARTICLES
      );

      setCategories(
        INITIAL_CATEGORIES
      );

      setAuthors(
        INITIAL_AUTHORS
      );

      setPages(
        INITIAL_PAGES
      );

      setSettings(
        INITIAL_SETTINGS
      );
    };

  const resetToInitialData =
    resetDatabaseToDefaults;

  // ============================================================
  // PROVIDER
  // ============================================================

  return (
    <DataContext.Provider
      value={{
        // Articles
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

        // Categories
        categories,

        getCategoryBySlug,
        addCategory,
        updateCategory,
        deleteCategory,

        // Authors
        authors,

        getAuthorById,
        getAuthorBySlug,
        addAuthor,
        updateAuthor,
        deleteAuthor,

        // Pages
        pages,

        getPageBySlug,
        updatePage,

        // Settings
        settings,
        updateSettings,

        // Subscribers
        subscribers,

        addSubscriber,
        deleteSubscriber,

        // Messages
        contactMessages,

        addContactMessage,
        updateMessageStatus,
        updateContactMessageStatus,
        deleteContactMessage,

        // Media
        mediaItems,

        addMediaItem,
        deleteMediaItem,

        // Database
        exportDatabaseJson,
        importDatabaseJson,
        resetDatabaseToDefaults,
        resetToInitialData,

        // Loading
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData =
  (): DataContextType => {
    const context =
      useContext(DataContext);

    if (!context) {
      throw new Error(
        'useData must be used within a DataProvider'
      );
    }

    return context;
  };

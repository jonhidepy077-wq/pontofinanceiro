import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { CookieConsentProvider } from './context/CookieConsentContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CookieBanner } from './components/layout/CookieBanner';

// Public Views
import { HomeView } from './views/HomeView';
import { BlogListView } from './views/BlogListView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { CategoryView } from './views/CategoryView';
import { AuthorView } from './views/AuthorView';
import { PageView } from './views/PageView';
import { ContactView } from './views/ContactView';
import { NotFoundView } from './views/NotFoundView';

// Admin CMS Views
import { AdminView } from './views/AdminView';
import { LoginView } from './views/LoginView';
import { AdminTab } from './components/admin/AdminSidebar';

function RouterApp() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route matching logic
  const renderRoute = () => {
    const cleanPath = currentPath.replace(/\/$/, '') || '/';

    // 1. Home
    if (cleanPath === '/') {
      return <HomeView navigate={navigate} />;
    }

    // 2. Blog List / Search
    if (cleanPath === '/blog' || cleanPath === '/busca' || cleanPath === '/artigos') {
      return <BlogListView navigate={navigate} />;
    }

    // 3. Article Detail (/blog/:slug or /artigo/:slug)
    const blogMatch = cleanPath.match(/^\/(?:blog|artigo)\/([a-zA-Z0-9_-]+)$/);
    if (blogMatch) {
      return <ArticleDetailView slug={blogMatch[1]} navigate={navigate} />;
    }

    // 4. Category (/categoria/:slug)
    const categoryMatch = cleanPath.match(/^\/categoria\/([a-zA-Z0-9_-]+)$/);
    if (categoryMatch) {
      return <CategoryView slug={categoryMatch[1]} navigate={navigate} />;
    }

    // 5. Author (/autor/:slug)
    const authorMatch = cleanPath.match(/^\/autor\/([a-zA-Z0-9_-]+)$/);
    if (authorMatch) {
      return <AuthorView slug={authorMatch[1]} navigate={navigate} />;
    }

    // 6. Contact
    if (cleanPath === '/contato' || cleanPath === '/fale-conosco') {
      return <ContactView navigate={navigate} />;
    }

    // 7. Institutional Pages
    const institutionalPages = [
      'sobre',
      'politica-de-privacidade',
      'politica-de-cookies',
      'termos-de-uso',
      'politica-editorial',
      'publicidade',
      'quem-somos',
      'aviso-legal',
    ];

    const trimmedSlug = cleanPath.replace(/^\//, '');
    if (institutionalPages.includes(trimmedSlug)) {
      return <PageView slug={trimmedSlug} navigate={navigate} />;
    }

    // 8. Admin Login
    if (cleanPath === '/admin/login' || cleanPath === '/login') {
      return <LoginView navigate={navigate} />;
    }

    // 9. Admin Area
    if (cleanPath.startsWith('/admin')) {
      let tab: AdminTab = 'dashboard';
      let articleId: string | null = null;

      if (cleanPath.startsWith('/admin/articles')) tab = 'articles';
      else if (cleanPath.startsWith('/admin/editor')) {
        tab = 'editor';
        const editMatch = cleanPath.match(/^\/admin\/editor\/([a-zA-Z0-9_-]+)$/);
        if (editMatch) articleId = editMatch[1];
      } else if (cleanPath.startsWith('/admin/categories')) tab = 'categories';
      else if (cleanPath.startsWith('/admin/authors')) tab = 'authors';
      else if (cleanPath.startsWith('/admin/pages')) tab = 'pages';
      else if (cleanPath.startsWith('/admin/ads')) tab = 'ads';
      else if (cleanPath.startsWith('/admin/cookies')) tab = 'cookies';
      else if (cleanPath.startsWith('/admin/settings')) tab = 'settings';
      else if (cleanPath.startsWith('/admin/subscribers')) tab = 'subscribers';
      else if (cleanPath.startsWith('/admin/messages')) tab = 'messages';
      else if (cleanPath.startsWith('/admin/backup')) tab = 'backup';

      return (
        <AdminView
          initialTab={tab}
          initialArticleId={articleId}
          navigate={navigate}
        />
      );
    }

    // 10. Fallback 404
    return <NotFoundView navigate={navigate} />;
  };

  const isAdminRoute = currentPath.startsWith('/admin') || currentPath === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-950">
      {/* Public Header (hidden on admin routes) */}
      {!isAdminRoute && <Header currentPath={currentPath} navigate={navigate} />}

      {/* Main Page Container */}
      <main className={`flex-1 ${isAdminRoute ? '' : 'max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        {renderRoute()}
      </main>

      {/* Public Footer (hidden on admin routes) */}
      {!isAdminRoute && <Footer navigate={navigate} />}

      {/* LGPD Cookie Consent Banner (shown on all public pages until accepted) */}
      {!isAdminRoute && <CookieBanner navigate={navigate} />}
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <CookieConsentProvider>
          <RouterApp />
        </CookieConsentProvider>
      </AuthProvider>
    </DataProvider>
  );
}

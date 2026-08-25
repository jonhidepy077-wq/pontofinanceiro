import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { ArticlesList } from '../components/admin/ArticlesList';
import { ArticleEditor } from '../components/admin/ArticleEditor';
import { CategoriesManager } from '../components/admin/CategoriesManager';
import { AuthorsManager } from '../components/admin/AuthorsManager';
import { PagesManager } from '../components/admin/PagesManager';
import { AdsManager } from '../components/admin/AdsManager';
import { CookieLGPDManager } from '../components/admin/CookieLGPDManager';
import { SettingsManager } from '../components/admin/SettingsManager';
import { SubscribersManager } from '../components/admin/SubscribersManager';
import { MessagesManager } from '../components/admin/MessagesManager';
import { DatabaseBackupManager } from '../components/admin/DatabaseBackupManager';
import { LoginView } from './LoginView';

interface AdminViewProps {
  initialTab?: AdminTab;
  initialArticleId?: string | null;
  navigate: (path: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  initialTab = 'dashboard',
  initialArticleId = null,
  navigate,
}) => {
  const { isAuthenticated, logout, user } = useAuth();

  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(initialArticleId);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
    if (initialArticleId !== undefined) setEditingArticleId(initialArticleId);
  }, [initialTab, initialArticleId]);

  if (!isAuthenticated) {
    return <LoginView navigate={navigate} />;
  }

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    if (tab !== 'editor') {
      setEditingArticleId(null);
    }
  };

  const handleCreateNewArticle = () => {
    setEditingArticleId(null);
    setActiveTab('editor');
  };

  const handleEditArticle = (id: string) => {
    setEditingArticleId(id);
    setActiveTab('editor');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row -mx-4 sm:-mx-6 lg:-mx-8 -my-6 sm:-my-8">
      <SEOHead
        title="Painel CMS Editorial - Ponto Financeiro"
        description="Gestão de conteúdo, artigos, SEO e publicidade do Ponto Financeiro."
      />

      {/* Admin Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isOpenMobile={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
        onLogout={logout}
        userEmail={user?.email || 'admin@pontofinanceiro.com.br'}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          activeTab={activeTab}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onNewArticle={handleCreateNewArticle}
          onViewSite={() => navigate('/')}
          onLogout={logout}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              onSelectTab={handleSelectTab}
              onNewArticle={handleCreateNewArticle}
              onEditArticle={handleEditArticle}
            />
          )}

          {activeTab === 'articles' && (
            <ArticlesList
              onNewArticle={handleCreateNewArticle}
              onEditArticle={handleEditArticle}
              navigate={navigate}
            />
          )}

          {activeTab === 'editor' && (
            <ArticleEditor
              articleId={editingArticleId}
              onCancel={() => setActiveTab('articles')}
              onSaveSuccess={() => setActiveTab('articles')}
            />
          )}

          {activeTab === 'categories' && <CategoriesManager />}

          {activeTab === 'authors' && <AuthorsManager />}

          {activeTab === 'pages' && <PagesManager navigate={navigate} />}

          {activeTab === 'ads' && <AdsManager />}

          {activeTab === 'cookies' && <CookieLGPDManager />}

          {activeTab === 'settings' && <SettingsManager />}

          {activeTab === 'subscribers' && <SubscribersManager />}

          {activeTab === 'messages' && <MessagesManager />}

          {activeTab === 'backup' && <DatabaseBackupManager />}
        </main>
      </div>
    </div>
  );
};

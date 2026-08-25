import React from 'react';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Users,
  Layers,
  Sparkles,
  CheckCircle2,
  Mail,
  MessageSquare,
  Settings,
  DollarSign,
  Cookie,
  Database,
  ExternalLink,
  LogOut,
  TrendingUp,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { AdminTab } from '../../types';

export type { AdminTab };

export interface AdminSidebarProps {
  currentAdminTab?: string;
  activeTab?: string;
  setAdminTab?: (tab: string) => void;
  onSelectTab?: (tab: any) => void;
  navigate?: (path: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onLogout?: () => void;
  userEmail?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentAdminTab,
  activeTab,
  setAdminTab,
  onSelectTab,
  navigate,
  isOpenMobile = false,
  onCloseMobile,
  onLogout,
  userEmail,
}) => {
  const { user, logout: authLogout } = useAuth();
  const { articles, contactMessages, subscribers } = useData();

  const currentTab = activeTab || currentAdminTab || 'dashboard';

  const handleTabSelect = (tabId: string) => {
    if (onSelectTab) onSelectTab(tabId);
    if (setAdminTab) setAdminTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    else authLogout();
  };

  const handleNavigate = (path: string) => {
    if (navigate) navigate(path);
    else window.location.href = path;
  };

  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const unreadMessagesCount = contactMessages.filter((m) => m.status === 'unread').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'articles', label: 'Artigos', icon: FileText, badge: draftCount > 0 ? `${draftCount} rasc.` : undefined },
    { id: 'editor', label: 'Novo Artigo', icon: PlusCircle, highlight: true },
    { id: 'categories', label: 'Categorias', icon: FolderTree },
    { id: 'authors', label: 'Autores', icon: Users },
    { id: 'pages', label: 'Páginas do Site', icon: Layers },
    { id: 'subscribers', label: 'Newsletter', icon: Mail, badge: subscribers.length > 0 ? `${subscribers.length}` : undefined },
    { id: 'messages', label: 'Mensagens de Contato', icon: MessageSquare, badge: unreadMessagesCount > 0 ? `${unreadMessagesCount}` : undefined },
    { id: 'ads', label: 'Publicidade & AdSense', icon: DollarSign },
    { id: 'cookies', label: 'Cookies & LGPD', icon: Cookie },
    { id: 'settings', label: 'Configurações Gerais', icon: Settings },
    { id: 'backup', label: 'Backup do Banco', icon: Database },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-stone-900/60 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 md:z-20 w-64 bg-stone-900 text-stone-300 flex flex-col shrink-0 border-r border-stone-800 h-screen transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-serif text-base font-bold text-white block leading-tight">
                Ponto Financeiro
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">
                Painel Editorial CMS
              </span>
            </div>
          </div>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-stone-400 hover:text-white md:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Info Bar */}
        <div className="px-5 py-3 bg-stone-950/60 border-b border-stone-800/80 flex items-center justify-between text-xs">
          <div className="truncate">
            <span className="text-stone-400 block text-[10px]">Logado como</span>
            <span className="font-semibold text-stone-200 truncate block">
              {userEmail || user?.email || 'admin@pontofinanceiro.com.br'}
            </span>
          </div>
          <button
            onClick={handleLogout}
            title="Encerrar sessão administrativa"
            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : item.highlight
                    ? 'bg-emerald-950/70 text-emerald-300 hover:bg-emerald-900/80 border border-emerald-800/50'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/70'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isActive ? 'bg-white text-emerald-900' : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Link to Public Site */}
        <div className="p-4 border-t border-stone-800">
          <button
            onClick={() => handleNavigate('/')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Visualizar Site Público</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
};

import React from 'react';
import { Menu, Plus, ExternalLink, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  activeTab?: string;
  onNewArticle?: () => void;
  onToggleSidebar?: () => void;
  onViewSite?: () => void;
  onLogout?: () => void;
  navigate?: (path: string) => void;
}

const TAB_TITLES: Record<string, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Visão Geral Editorial',
    subtitle: 'Métricas, audiência, status de conteúdo e atalhos rápidos',
  },
  articles: {
    title: 'Gestão de Artigos',
    subtitle: 'Pesquise, filtre, edite, publique e organize todos os conteúdos',
  },
  editor: {
    title: 'Editor de Conteúdo',
    subtitle: 'Crie e edite artigos educativos completos com SEO e fontes',
  },
  categories: {
    title: 'Categorias e Trilhas',
    subtitle: 'Organize os tópicos de finanças e investimentos do portal',
  },
  authors: {
    title: 'Equipe Editorial & Autores',
    subtitle: 'Gerencie perfis, biografias e autoridade (E-E-A-T) dos autores',
  },
  pages: {
    title: 'Páginas Institucionais',
    subtitle: 'Transparência, Quem Somos, Política Editorial e Termos LGPD',
  },
  subscribers: {
    title: 'Assinantes da Newsletter',
    subtitle: 'Base de leads de e-mail e exportação em formato CSV',
  },
  messages: {
    title: 'Caixa de Mensagens',
    subtitle: 'Dúvidas, sugestões e solicitações enviadas pelos leitores',
  },
  ads: {
    title: 'Publicidade & Google AdSense',
    subtitle: 'Configurações de blocos de anúncios, IDs e conformidade',
  },
  cookies: {
    title: 'LGPD & Consentimento de Cookies',
    subtitle: 'Personalize o banner de conformidade legal e privacidade',
  },
  settings: {
    title: 'Configurações Gerais do Site',
    subtitle: 'Metadados, contatos, mídias sociais e identidade da marca',
  },
  backup: {
    title: 'Backup & Restauração da Base',
    subtitle: 'Exporte todos os artigos e dados em JSON ou restaure backups',
  },
};

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  activeTab = 'dashboard',
  onNewArticle,
  onToggleSidebar,
  onViewSite,
  onLogout,
  navigate,
}) => {
  const { logout: authLogout } = useAuth();

  const tabInfo = TAB_TITLES[activeTab] || {
    title: title || 'Painel Administrativo',
    subtitle: subtitle || 'Ponto Financeiro CMS',
  };

  const displayTitle = title || tabInfo.title;
  const displaySubtitle = subtitle || tabInfo.subtitle;

  const handleViewSite = () => {
    if (onViewSite) onViewSite();
    else if (navigate) navigate('/');
    else window.location.href = '/';
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    else authLogout();
  };

  return (
    <header className="bg-white border-b border-stone-200 px-4 sm:px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3 min-w-0">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 md:hidden cursor-pointer shrink-0"
            title="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="truncate">
          <h1 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-tight truncate">
            {displayTitle}
          </h1>
          {displaySubtitle && (
            <p className="text-xs text-stone-500 truncate hidden sm:block">
              {displaySubtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {onNewArticle && activeTab !== 'editor' && (
          <button
            onClick={onNewArticle}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Escrever Artigo</span>
            <span className="sm:hidden">Novo</span>
          </button>
        )}

        <button
          onClick={handleViewSite}
          className="p-2 sm:px-3 sm:py-2 rounded-xl border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-50 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Ver o portal ao vivo"
        >
          <ExternalLink className="w-4 h-4 text-stone-500" />
          <span className="hidden md:inline">Ver Site</span>
        </button>

        <button
          onClick={handleLogout}
          className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:text-rose-700 hover:bg-rose-50 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Encerrar sessão"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

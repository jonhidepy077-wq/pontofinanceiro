import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Lock, 
  Wallet, 
  Coins, 
  BarChart3 
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const { settings, categories } = useData();
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const handleNav = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsCategoriesDropdownOpen(false);
  };

  const navLinks = [
    { label: 'Início', path: '/' },
    { label: 'Artigos', path: '/blog' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Contato', path: '/contato' },
  ];

  return (
    <header id="site-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top micro-bar for educational trust badge */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-stone-200">Portal de Educação Financeira para Iniciantes</span>
            <span className="hidden md:inline text-stone-400 text-[11px]">• Conteúdo 100% Didático e Independente</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => handleNav('/politica-editorial')}
              className="text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              Política Editorial
            </button>
            <button 
              onClick={() => handleNav(isAuthenticated ? '/admin' : '/admin/login')}
              className="flex items-center gap-1 text-stone-300 hover:text-emerald-400 transition-colors font-medium cursor-pointer"
              title="Acessar painel de gerenciamento"
            >
              <Lock className="w-3 h-3" />
              <span>{isAuthenticated ? 'Painel CMS' : 'Área do Editor'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <button 
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            aria-label="Ir para a página inicial"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-sm shadow-emerald-900/10 group-hover:bg-emerald-800 transition-colors">
              <TrendingUp className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold tracking-tight text-stone-900 leading-none">
                {settings.siteName || 'Ponto Financeiro'}
              </span>
              <span className="block text-[11px] tracking-wide font-medium uppercase text-emerald-800 mt-1">
                Educação Financeira Simples
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNav('/')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPath === '/' 
                  ? 'text-emerald-800 bg-emerald-50' 
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Início
            </button>

            <button
              onClick={() => handleNav('/blog')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPath === '/blog' || currentPath.startsWith('/blog/') 
                  ? 'text-emerald-800 bg-emerald-50' 
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Todos os Artigos
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                onBlur={() => setTimeout(() => setIsCategoriesDropdownOpen(false), 250)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentPath.startsWith('/categoria/')
                    ? 'text-emerald-800 bg-emerald-50'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span>Categorias</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoriesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    Temas para Iniciantes
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleNav(`/categoria/${cat.slug}`)}
                        className="w-full text-left px-4 py-2.5 hover:bg-stone-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="p-1 rounded-md bg-stone-100 text-stone-600 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors mt-0.5">
                          <Wallet className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-stone-800 group-hover:text-emerald-800 transition-colors">
                            {cat.name}
                          </div>
                          <div className="text-xs text-stone-500 line-clamp-1">
                            {cat.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('/sobre')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPath === '/sobre'
                  ? 'text-emerald-800 bg-emerald-50'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Sobre
            </button>

            <button
              onClick={() => handleNav('/contato')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPath === '/contato'
                  ? 'text-emerald-800 bg-emerald-50'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Contato
            </button>
          </nav>

          {/* Right Action: Search Bar & Admin Quick Access */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar (ex: CDI, Reserva...)"
                className="w-56 xl:w-64 pl-9 pr-3 py-1.5 text-xs bg-stone-100 hover:bg-stone-200/70 focus:bg-white border border-transparent focus:border-emerald-600 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-emerald-600/20 text-stone-800 placeholder-stone-400"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
            </form>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Abrir pesquisa"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="lg:hidden py-3 border-t border-stone-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar temas, conceitos ou artigos..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-100 focus:bg-white border border-stone-200 focus:border-emerald-600 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-emerald-600/20 text-stone-800"
                autoFocus
              />
              <Search className="w-5 h-5 text-stone-400 absolute left-3 top-3" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                  currentPath === link.path
                    ? 'text-emerald-800 bg-emerald-50 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-100">
            <div className="px-3 py-1 text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Categorias Principais
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {categories.slice(0, 8).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNav(`/categoria/${cat.slug}`)}
                  className="text-left px-3 py-2 text-xs font-medium text-stone-600 hover:text-emerald-800 hover:bg-stone-50 rounded-md transition-colors cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2 text-xs text-stone-500">
            <button
              onClick={() => handleNav(isAuthenticated ? '/admin' : '/admin/login')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>{isAuthenticated ? 'Abrir Painel Administrativo' : 'Acesso do Editor'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

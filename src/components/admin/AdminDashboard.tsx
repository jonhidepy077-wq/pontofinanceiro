import React from 'react';
import {
  FileText,
  Users,
  Mail,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  PlusCircle,
  Eye,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Clock,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/formatters';

interface AdminDashboardProps {
  setAdminTab: (tab: string) => void;
  onEditArticle: (id: string) => void;
  onNewArticle: () => void;
  navigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  setAdminTab,
  onEditArticle,
  onNewArticle,
  navigate,
}) => {
  const {
    articles,
    publishedArticles,
    categories,
    subscribers,
    contactMessages,
    settings,
  } = useData();

  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const unreadMessages = contactMessages.filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-950 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-300 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Ponto Financeiro • Painel Administrativo</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Bem-vindo ao CMS do Ponto Financeiro
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Gerencie publicações educativas, monitore a conformidade editorial E-E-A-T, controle os blocos de anúncios do Google AdSense e acompanhe o crescimento dos inscritos na newsletter.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onNewArticle}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Escrever Artigo Educativo</span>
            </button>

            <button
              onClick={() => setAdminTab('ai-assistant')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-300 text-xs font-semibold flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Assistente Editorial IA</span>
            </button>

            <button
              onClick={() => setAdminTab('quality')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Checklist de Qualidade</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Published Articles */}
        <div
          onClick={() => setAdminTab('articles')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Artigos Publicados</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            {publishedArticles.length}
          </div>
          <div className="text-[11px] text-stone-500">
            {draftCount > 0 ? `${draftCount} rascunho(s) pendente(s)` : 'Todos os artigos publicados'}
          </div>
        </div>

        {/* Newsletter Subscribers */}
        <div
          onClick={() => setAdminTab('subscribers')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Assinantes Newsletter</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            {subscribers.length}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            Leitores interessados em finanças
          </div>
        </div>

        {/* Contact Messages */}
        <div
          onClick={() => setAdminTab('messages')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Mensagens de Contato</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            {contactMessages.length}
          </div>
          <div className="text-[11px] text-stone-500">
            {unreadMessages > 0 ? `${unreadMessages} nova(s) não lida(s)` : 'Sem mensagens pendentes'}
          </div>
        </div>

        {/* AdSense Status */}
        <div
          onClick={() => setAdminTab('ads')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Monetização AdSense</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            {settings.adsConfig.enabled ? 'Ativa' : 'Pausada'}
          </div>
          <div className="text-[11px] text-stone-500">
            {settings.adsConfig.adSensePublisherId ? 'Publisher ID configurado' : 'Aguardando aprovação'}
          </div>
        </div>
      </div>

      {/* Two column layout: Recent Articles & Fast Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Articles (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-800" />
              <h3 className="font-bold text-stone-900 text-sm">Artigos Recentes</h3>
            </div>
            <button
              onClick={() => setAdminTab('articles')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos ({articles.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden">
            {articles.slice(0, 5).map((art) => (
              <div
                key={art.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/70 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className={`px-2 py-0.5 rounded font-semibold uppercase tracking-wider ${
                      art.status === 'published'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-amber-50 text-amber-800'
                    }`}>
                      {art.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                    <span className="text-stone-400">•</span>
                    <span className="text-stone-500">{formatDate(art.publishedAt || art.createdAt)}</span>
                  </div>

                  <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base leading-snug">
                    {art.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => navigate(`/blog/${art.slug}`)}
                    className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 cursor-pointer"
                    title="Ver no site"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEditArticle(art.id)}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-700 hover:text-white text-stone-800 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Tools & Health (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Legal & Contact info */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 text-xs">
            <div className="flex items-center gap-2 text-stone-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Transparência Institucional</span>
            </div>

            <div className="space-y-2 text-stone-600">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Localização:</span>
                <span className="font-medium text-stone-800">São Paulo - SP - Brasil</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">WhatsApp Oficial:</span>
                <span className="font-medium text-stone-800">{settings.contactPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">E-mail:</span>
                <span className="font-medium text-stone-800">{settings.contactEmail}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">LGPD & Cookies:</span>
                <span className="font-semibold text-emerald-700">Ativo e Conforme</span>
              </div>
            </div>

            <button
              onClick={() => setAdminTab('settings')}
              className="w-full mt-2 py-2 px-3 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs text-center transition-colors cursor-pointer block"
            >
              Ajustar Configurações Gerais
            </button>
          </div>

          {/* Editorial Quick Tips */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl space-y-2 text-xs text-emerald-950">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Dicas de Qualidade Google AdSense</span>
            </div>
            <ul className="space-y-1.5 list-disc pl-4 text-stone-700 text-[11px] leading-relaxed">
              <li>Mantenha artigos detalhados, com mais de 800 palavras e linguagem didática.</li>
              <li>Cite fontes primárias (Bacen, Tesouro, CVM) em todos os guias de investimento.</li>
              <li>Mantenha as páginas de Termos, Privacidade, Cookies e Sobre sempre atualizadas.</li>
              <li>Evite promessas de ganho fácil ou garantias em renda variável.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

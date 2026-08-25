import React from 'react';
import { useData } from '../context/DataContext';
import { SEOHead } from '../components/common/SEOHead';
import { ArticleCard } from '../components/article/ArticleCard';
import { FinancialCalculator } from '../components/common/FinancialCalculator';
import { NewsletterBox } from '../components/common/NewsletterBox';
import { AdSlot } from '../components/common/AdSlot';
import {
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight,
  BookOpen,
  Scale,
  DollarSign,
  PiggyBank,
} from 'lucide-react';

interface HomeViewProps {
  navigate: (path: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ navigate }) => {
  const { publishedArticles, categories, settings } = useData();

  // Featured article (first featured article or first published)
  const featuredArticle = publishedArticles.find((a) => a.isFeatured) || publishedArticles[0];
  const secondaryArticles = publishedArticles.filter((a) => a.id !== featuredArticle?.id).slice(0, 6);
  const quickArticles = publishedArticles.slice(1, 4);

  return (
    <div className="space-y-12">
      <SEOHead
        title="Ponto Financeiro - Educação Financeira e Investimentos para Iniciantes"
        description="Aprenda a investir do zero com segurança: guias sobre Tesouro Direto, CDBs, reserva de emergência, controle de dívidas e planejamento financeiro."
        canonicalPath="/"
      />

      {/* Top Header Ad (if enabled in settings) */}
      <AdSlot position="header" slotId="slot-home-header" />

      {/* Hero Section: Featured Article + Top Quick Reads */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Destaque Editorial da Semana</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-950 tracking-tight">
              Aprenda a Cuidar do Seu Dinheiro com Segurança
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md">
            Informações claras e sem jargões para você sair das dívidas, montar sua reserva e começar a investir.
          </p>
        </div>

        {/* Featured Big Card */}
        {featuredArticle && (
          <ArticleCard article={featuredArticle} variant="featured" navigate={navigate} />
        )}
      </section>

      {/* Category Pills Navigation */}
      <section className="py-4 border-y border-stone-200">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Navegue por Trilhas Temáticas</span>
          </div>
          <button
            onClick={() => navigate('/blog')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver todos os artigos</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/categoria/${cat.slug}`)}
              className="px-4 py-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50 text-stone-800 hover:text-emerald-950 text-xs font-semibold whitespace-nowrap transition-all shadow-xs cursor-pointer flex items-center gap-2"
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Step-by-Step Educational Road for Beginners */}
      <section className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Por onde começar?
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            A Trilha do Iniciante Inteligente
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Siga os 4 passos essenciais recomendados pelos maiores educadores financeiros do Brasil:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600/30 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/40">
              1
            </div>
            <h3 className="font-bold text-sm text-white">Diagnóstico e Dívidas</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Mapeie receitas e gastos. Elimine juros caros de cartão de crédito e cheque especial.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600/30 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/40">
              2
            </div>
            <h3 className="font-bold text-sm text-white">Reserva de Emergência</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Guarde de 3 a 6 meses do seu custo de vida em Tesouro Selic ou CDB com liquidez diária.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600/30 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/40">
              3
            </div>
            <h3 className="font-bold text-sm text-white">Renda Fixa Segura</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Entenda Tesouro IPCA+, LCIs, LCAs e conte com a proteção de até R$ 250 mil do FGC.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600/30 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/40">
              4
            </div>
            <h3 className="font-bold text-sm text-white">Longo Prazo</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Diversifique com calma em Fundos Imobiliários e Ações mantendo a disciplina mensal.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Financial Simulator Widget */}
      <section>
        <FinancialCalculator />
      </section>

      {/* Recent Guides Grid (3 columns) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Últimos Guias e Artigos Publicados
            </h2>
            <p className="text-xs text-stone-500">
              Conteúdos atualizados com a taxa Selic e o cenário econômico brasileiro
            </p>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver arquivo completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="standard" navigate={navigate} />
          ))}
        </div>
      </section>

      {/* In-List Ad Slot */}
      <AdSlot position="inList" slotId="slot-home-middle" />

      {/* Full-width Newsletter Subscription Box */}
      <section>
        <NewsletterBox source="home-destaque" />
      </section>

      {/* Transparency & E-E-A-T Commitment Banner */}
      <section className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Compromisso com a Transparência & Educação
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
              Nossos conteúdos são redigidos com base em dados oficiais do Banco Central do Brasil, Tesouro Nacional e CVM. Não vendemos produtos financeiros nem fazemos recomendações individuais de investimento.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/politica-editorial')}
            className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 text-xs font-semibold transition-colors cursor-pointer"
          >
            Nossa Política Editorial
          </button>
          <button
            onClick={() => navigate('/sobre')}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Conheça o Portal
          </button>
        </div>
      </section>

      {/* Bottom Footer Ad (if enabled) */}
      <AdSlot position="footer" slotId="slot-home-footer" />
    </div>
  );
};

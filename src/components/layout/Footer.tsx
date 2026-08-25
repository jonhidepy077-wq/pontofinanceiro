import React from 'react';
import { 
  TrendingUp, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowUp,
  FileText,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { settings, categories } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="site-footer" className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <TrendingUp className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                {settings.siteName || 'Ponto Financeiro'}
              </span>
            </div>

            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              {settings.siteDescription || 'Portal brasileiro de educação financeira para iniciantes. Descomplicamos o dinheiro através de guias práticos, transparentes e baseados em fontes oficiais.'}
            </p>

            {/* Responsible and Contact details provided by the user */}
            <div className="pt-2 space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{settings.contactCity || 'São Paulo - SP - Brasil'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {settings.contactPhone || '11961139395'}</span>
              </div>
              {settings.contactEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{settings.contactEmail}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800/80 border border-stone-700 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Conteúdo em conformidade com as diretrizes CVM e LGPD</span>
              </div>
            </div>
          </div>

          {/* Column 2: Temas e Categorias */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Categorias
            </h3>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigate(`/categoria/${cat.slug}`)}
                    className="text-stone-400 hover:text-emerald-400 transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institucional */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Institucional
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/sobre')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Sobre o Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contato')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Fale Conosco
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/politica-editorial')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Política Editorial
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/publicidade')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Publicidade e Divulgação
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/acessibilidade')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Declaração de Acessibilidade
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Políticas e Jurídico */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Privacidade & Termos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/politica-de-privacidade')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Política de Privacidade (LGPD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/politica-de-cookies')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Política de Cookies
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/termos-de-uso')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Termos de Uso
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/direitos-autorais')}
                  className="text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Direitos Autorais
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Mapa do Site (XML)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 pt-8 border-t border-stone-800">
          <div className="bg-stone-950/60 rounded-xl p-5 border border-stone-800 text-xs text-stone-400 leading-relaxed space-y-2">
            <div className="font-semibold text-stone-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Aviso Legal e Educacional Importante:</span>
            </div>
            <p>
              As informações publicadas no portal <strong>{settings.siteName || 'Ponto Financeiro'}</strong> possuem finalidade <strong>estritamente educativa e informativa</strong>. O conteúdo não constitui recomendação personalizada de investimentos, consultoria financeira individual, promessa de rentabilidade ou oferta de valores mobiliários. Rendimentos passados não são garantia de resultados futuros. Antes de tomar qualquer decisão financeira relevante, consulte profissionais certificados credenciados pelos órgãos competentes (CVM, Anbima, Banco Central).
            </p>
          </div>
        </div>

        {/* Bottom copyright and to-top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {settings.siteName || 'Ponto Financeiro'}. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/admin')}
              className="hover:text-stone-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Acesso Administrativo</span>
            </button>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Voltar ao topo"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface NewsletterBoxProps {
  source?: string;
  className?: string;
}

export const NewsletterBox: React.FC<NewsletterBoxProps> = ({ source = 'box-geral', className = '' }) => {
  const { addSubscriber } = useData();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setStatus('error');
      setFeedbackMessage('É necessário aceitar os termos de consentimento para assinar a newsletter.');
      return;
    }

    const res = addSubscriber(email, name, source);
    if (res.success) {
      setStatus('success');
      setFeedbackMessage(res.message);
      setEmail('');
      setName('');
    } else {
      setStatus('error');
      setFeedbackMessage(res.message);
    }
  };

  return (
    <div className={`bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden ${className}`}>
      {/* Subtle decorative background circle */}
      <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-emerald-700/20 blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/30 text-emerald-300 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Boletim Educativo Semanal</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Aprenda Finanças Sem Complicação Toda Semana
        </h3>

        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
          Receba diretamente em seu e-mail resumos práticos sobre Selic, Tesouro Direto, dicas para economizar e guias para investir com segurança. 100% gratuito e livre de spam.
        </p>

        {status === 'success' ? (
          <div className="mt-6 p-4 rounded-xl bg-emerald-800/90 border border-emerald-500 text-white flex items-center justify-center gap-3 animate-in zoom-in-95">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span className="text-xs sm:text-sm font-medium">{feedbackMessage}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/20 transition-all"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-emerald-500/20 shrink-0"
              >
                <span>Inscrever-se</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-stone-400 text-left pt-1">
              <input
                type="checkbox"
                id="newsletter-consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="rounded border-stone-600 text-emerald-500 mt-0.5"
              />
              <label htmlFor="newsletter-consent" className="cursor-pointer leading-tight">
                Concordo em receber conteúdos educacionais e aceito a{' '}
                <a href="/politica-de-privacidade" className="underline text-emerald-400 hover:text-emerald-300">
                  Política de Privacidade
                </a>
                .
              </label>
            </div>

            {status === 'error' && (
              <div className="p-2.5 rounded-lg bg-rose-900/80 border border-rose-600 text-rose-200 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{feedbackMessage}</span>
              </div>
            )}
          </form>
        )}

        <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Seus dados estão protegidos de acordo com a LGPD. Cancele quando quiser.</span>
        </div>
      </div>
    </div>
  );
};

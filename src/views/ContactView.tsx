import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Clock,
} from 'lucide-react';

interface ContactViewProps {
  navigate: (path: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ navigate }) => {
  const { settings, addContactMessage } = useData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setStatus('error');
      setErrorMsg('Por favor, confirme o aceite da Política de Privacidade para enviar sua mensagem.');
      return;
    }

    const res = addContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      subject: subject.trim() || 'Contato Geral',
      message: message.trim(),
    });

    if (res.success) {
      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } else {
      setStatus('error');
      setErrorMsg(res.message);
    }
  };

  const whatsappNumber = settings.contactPhone ? settings.contactPhone.replace(/\D/g, '') : '5511961139395';
  const whatsappUrl = `https://wa.me/55${whatsappNumber}?text=${encodeURIComponent('Olá! Acessei o portal Ponto Financeiro e gostaria de tirar uma dúvida.')}`;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <SEOHead
        title="Fale Conosco e Canais de Atendimento"
        description="Entre em contato com a equipe editorial do Ponto Financeiro. Sugestões de pautas, dúvidas, correções e transparência."
        canonicalPath="/contato"
      />

      <Breadcrumbs items={[{ label: 'Contato' }]} />

      <div className="border-b border-stone-200 pb-4 space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
          Canais de Contato e Transparência
        </h1>
        <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
          Tem dúvidas, sugestões de pautas ou deseja apontar alguma correção de dados em nossos artigos? Nossa equipe editorial está à disposição.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-5">
          <h2 className="font-serif text-xl font-bold text-stone-900">
            Envie uma Mensagem Direta
          </h2>

          {status === 'success' ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-500 text-emerald-950 space-y-2 animate-in zoom-in-95">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Mensagem enviada com sucesso!</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                Agradecemos o seu contato. Nossa equipe revisará sua mensagem e responderá no e-mail informado o mais breve possível.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-3 text-xs font-bold text-emerald-800 underline"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Seu Nome Completo: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Seu E-mail: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joao@email.com"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Telefone / WhatsApp (Opcional):
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Assunto:
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ex: Dúvida sobre Tesouro Selic"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Mensagem: <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva sua mensagem com clareza..."
                  className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs leading-relaxed"
                />
              </div>

              <div className="flex items-start gap-2 pt-1 text-[11px] text-stone-600">
                <input
                  type="checkbox"
                  id="contact-consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="rounded text-emerald-600 mt-0.5"
                />
                <label htmlFor="contact-consent" className="cursor-pointer leading-tight">
                  Concordo com o tratamento dos dados informados para fins exclusivos de atendimento conforme a{' '}
                  <a href="/politica-de-privacidade" className="text-emerald-800 underline">
                    Política de Privacidade
                  </a>
                  .
                </label>
              </div>

              {status === 'error' && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          )}
        </div>

        {/* Institutional Contact Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5 text-xs">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Informações Institucionais
            </h3>

            <div className="space-y-4">
              {/* WhatsApp */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-stone-500 block text-[11px]">WhatsApp Oficial:</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-stone-900 hover:text-emerald-800 font-mono text-sm block"
                  >
                    {settings.contactPhone || '11961139395'}
                  </a>
                  <span className="text-[10px] text-stone-400 block">Clique para abrir conversa</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-800 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-stone-500 block text-[11px]">Localização:</span>
                  <span className="font-bold text-stone-900 block">
                    {settings.contactCity || 'São Paulo - SP - Brasil'}
                  </span>
                  <span className="text-[10px] text-stone-400 block">Operação editorial brasileira</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-stone-500 block text-[11px]">E-mail Editorial:</span>
                  <a
                    href={`mailto:${settings.contactEmail || 'contato@pontofinanceiro.com.br'}`}
                    className="font-bold text-stone-900 hover:text-emerald-800 block"
                  >
                    {settings.contactEmail || 'contato@pontofinanceiro.com.br'}
                  </a>
                  <span className="text-[10px] text-stone-400 block">Atendimento a leitores e parcerias</span>
                </div>
              </div>
            </div>

            {/* Regulatory Notice Box */}
            <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 leading-relaxed space-y-1">
              <div className="flex items-center gap-1 font-bold text-stone-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Aviso Importante de Segurança</span>
              </div>
              <p>
                O portal Ponto Financeiro nunca solicita senhas bancárias, dados de cartão de crédito ou depósitos em contas de terceiros. Nossos canais são estritamente educativos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SEOHead } from '../components/common/SEOHead';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface LoginViewProps {
  navigate: (path: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ navigate }) => {
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('admin@pontofinanceiro.com.br');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect
  if (isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Credenciais incorretas. Verifique seu e-mail e senha.');
    }
  };

  return (
    <div className="py-12 px-4 flex items-center justify-center min-h-[70vh]">
      <SEOHead
        title="Painel Editorial - Autenticação"
        description="Acesso restrito para administradores e editores do Ponto Financeiro."
      />

      <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Painel Administrativo
          </h1>
          <p className="text-xs text-stone-500">
            Ponto Financeiro • Sistema de Gestão de Conteúdo (CMS)
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              E-mail do Editor / Administrador:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pontofinanceiro.com.br"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Senha de Acesso:
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <span>Entrar no CMS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-[11px] text-stone-600 space-y-1">
          <div className="flex items-center gap-1 font-semibold text-stone-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Acesso Demonstrativo Liberado</span>
          </div>
          <p className="text-stone-500 leading-relaxed">
            As credenciais de demonstração já estão preenchidas acima para acesso imediato a todas as ferramentas administrativas.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-stone-500 hover:text-emerald-800 underline cursor-pointer"
          >
            ← Voltar ao site público
          </button>
        </div>
      </div>
    </div>
  );
};

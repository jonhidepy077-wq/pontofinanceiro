import React from 'react';
import { AlertCircle, ShieldAlert, Info, Scale } from 'lucide-react';
import { FinancialDisclaimerType } from '../../types';

interface FinancialDisclaimerProps {
  type: FinancialDisclaimerType;
  className?: string;
}

export const FinancialDisclaimer: React.FC<FinancialDisclaimerProps> = ({ type, className = '' }) => {
  if (type === 'none') return null;

  const disclaimerContent = {
    general: {
      title: 'Aviso Educacional de Finanças',
      icon: Info,
      color: 'bg-amber-50/80 border-amber-200 text-amber-900',
      iconColor: 'text-amber-600',
      text: 'Este conteúdo possui finalidade exclusivamente educativa e informativa. As informações apresentadas não constituem consultoria financeira individualizada, recomendação de compra ou promessa de rentabilidade. Decisões de investimento devem sempre considerar seus objetivos pessoais e tolerância ao risco.',
    },
    fixed_income: {
      title: 'Aviso Sobre Produtos de Renda Fixa',
      icon: Scale,
      color: 'bg-emerald-50/80 border-emerald-200 text-emerald-950',
      iconColor: 'text-emerald-700',
      text: 'Títulos de renda fixa (como Tesouro Direto, CDBs, LCIs e LCAs) podem estar sujeitos a carência para resgate, tributação regressiva de Imposto de Renda e variações por marcação a mercado no caso de resgate antecipado. Garantias do FGC aplicam-se nos limites vigentes de R$ 250 mil por CPF e instituição.',
    },
    variable_income: {
      title: 'Aviso de Risco em Renda Variável',
      icon: ShieldAlert,
      color: 'bg-rose-50/80 border-rose-200 text-rose-950',
      iconColor: 'text-rose-600',
      text: 'Investimentos em ações, ETFs e Fundos Imobiliários envolvem volatilidade diária e risco de perda do capital principal investido. Rendimentos e dividendos passados não são garantia de rendimentos futuros. Nunca invista recursos essenciais para sua sobrevivência imediata em renda variável.',
    },
    credit_debt: {
      title: 'Atenção às Taxas de Crédito',
      icon: AlertCircle,
      color: 'bg-indigo-50/80 border-indigo-200 text-indigo-950',
      iconColor: 'text-indigo-700',
      text: 'As taxas de juros do rotativo de cartão de crédito e cheque especial no Brasil são elevadas. Sempre priorize o pagamento integral da fatura e utilize canais oficiais como o Banco Central e Procon para checar a confiabilidade de instituições credoras.',
    },
  }[type];

  if (!disclaimerContent) return null;
  const Icon = disclaimerContent.icon;

  return (
    <div className={`p-4 rounded-xl border ${disclaimerContent.color} text-xs leading-relaxed my-6 flex items-start gap-3 shadow-xs ${className}`}>
      <Icon className={`w-5 h-5 ${disclaimerContent.iconColor} shrink-0 mt-0.5`} />
      <div className="space-y-1">
        <div className="font-bold">{disclaimerContent.title}</div>
        <p className="text-stone-700">{disclaimerContent.text}</p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Calculator, ShieldCheck, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const FinancialCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'emergency' | 'compound'>('emergency');

  // Emergency Fund State
  const [monthlyExpense, setMonthlyExpense] = useState<number>(2500);
  const [profileType, setProfileType] = useState<'public' | 'clt' | 'freelancer'>('clt');
  const [monthlySavings, setMonthlySavings] = useState<number>(300);

  // Compound Interest State
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(300);
  const [annualRate, setAnnualRate] = useState<number>(10.5); // % a.a.
  const [periodYears, setPeriodYears] = useState<number>(5);

  // Emergency Fund Calculation
  const monthsMultiplier = {
    public: 4,
    clt: 6,
    freelancer: 10,
  }[profileType];

  const targetEmergencyFund = monthlyExpense * monthsMultiplier;
  const monthsToReach = monthlySavings > 0 ? Math.ceil(targetEmergencyFund / monthlySavings) : 0;

  // Compound Interest Calculation
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const totalMonths = periodYears * 12;

  let totalInvested = initialAmount;
  let totalAccumulated = initialAmount;

  for (let i = 1; i <= totalMonths; i++) {
    totalAccumulated = totalAccumulated * (1 + monthlyRate) + monthlyDeposit;
    totalInvested += monthlyDeposit;
  }

  const interestEarned = totalAccumulated - totalInvested;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Simulador Educativo de Finanças
            </h3>
            <p className="text-xs text-stone-500">
              Calcule metas práticas e veja o poder do planejamento no seu bolso
            </p>
          </div>
        </div>

        {/* Tab selector */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'emergency'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Reserva de Emergência
          </button>
          <button
            onClick={() => setActiveTab('compound')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'compound'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Juros Compostos
          </button>
        </div>
      </div>

      {activeTab === 'emergency' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Inputs */}
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Seu Custo de Vida Mensal Básico (R$):
              </label>
              <input
                type="number"
                min="100"
                step="50"
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium text-sm text-stone-900"
              />
              <span className="text-[11px] text-stone-600 mt-1 block">
                Soma de moradia, contas, alimentação, saúde e transporte
              </span>
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Sua Situação Profissional:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setProfileType('public')}
                  className={`py-2 px-2 rounded-lg border text-center font-medium transition-all cursor-pointer ${
                    profileType === 'public'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Concursado (4 meses)
                </button>
                <button
                  type="button"
                  onClick={() => setProfileType('clt')}
                  className={`py-2 px-2 rounded-lg border text-center font-medium transition-all cursor-pointer ${
                    profileType === 'clt'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  CLT (6 meses)
                </button>
                <button
                  type="button"
                  onClick={() => setProfileType('freelancer')}
                  className={`py-2 px-2 rounded-lg border text-center font-medium transition-all cursor-pointer ${
                    profileType === 'freelancer'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Autônomo (10 meses)
                </button>
              </div>
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Quanto Consegue Guardar Por Mês (R$):
              </label>
              <input
                type="number"
                min="10"
                step="50"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium text-sm text-stone-900"
              />
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-stone-900 text-white rounded-xl p-5 space-y-4">
            <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Diagnóstico da Sua Reserva</span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-stone-400">Meta Total Recomendada:</div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white">
                {formatCurrency(targetEmergencyFund)}
              </div>
              <div className="text-[11px] text-stone-400">
                ({monthsMultiplier} meses de segurança cobrindo {formatCurrency(monthlyExpense)}/mês)
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-400 block">Tempo estimado:</span>
                <span className="font-bold text-emerald-400 text-base">
                  {monthsToReach > 0 ? `${monthsToReach} meses` : 'Defina o aporte'}
                </span>
                <span className="text-[10px] text-stone-500 block">
                  (~{(monthsToReach / 12).toFixed(1)} anos)
                </span>
              </div>
              <div>
                <span className="text-stone-400 block">Onde guardar:</span>
                <span className="font-semibold text-stone-200">
                  Tesouro Selic ou CDB 100% CDI
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Compound Interest Inputs */}
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Aporte Inicial (R$):
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium text-sm text-stone-900"
                />
              </div>
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Aporte Mensal (R$):
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium text-sm text-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Taxa Estimada (% ao ano):
                </label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  step="0.5"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium text-sm text-stone-900"
                />
                <span className="text-[10px] text-stone-600 mt-0.5 block">Ex: 10,5% a.a. (~CDI atual)</span>
              </div>
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Prazo (em anos):
                </label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={periodYears}
                  onChange={(e) => setPeriodYears(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium text-sm text-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-stone-900 text-white rounded-xl p-5 space-y-4">
            <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Resultado da Simulação ({periodYears} anos)</span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-stone-400">Total Bruto Acumulado:</div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-400">
                {formatCurrency(totalAccumulated)}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-400 block">Total que saiu do bolso:</span>
                <span className="font-bold text-stone-200 text-sm">
                  {formatCurrency(totalInvested)}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block">Juros gerados (lucro bruto):</span>
                <span className="font-bold text-emerald-400 text-sm">
                  {formatCurrency(interestEarned)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2 text-[11px] text-stone-600">
        <HelpCircle className="w-3.5 h-3.5 text-stone-600 shrink-0" />
        <span>
          Simulação matemática com finalidade puramente pedagógica. Não considera efeitos de inflação futura ou deduções tributárias específicas.
        </span>
      </div>
    </div>
  );
};

import { Article } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-reserva-emergencia',
    title: 'Reserva de Emergência: O Que É, Onde Guardar e Quanto Juntar (Guia Passo a Passo)',
    subtitle: 'O primeiro e mais importante passo antes de fazer qualquer outro investimento no Brasil.',
    slug: 'reserva-de-emergencia-guia-iniciantes',
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
    coverImageAlt: 'Pessoa organizando moedas e planejamento financeiro em uma mesa',
    socialImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
    category: 'financas-pessoais',
    subCategory: 'Organização Financeira',
    tags: ['Reserva de Emergência', 'Finanças Básicas', 'Primeiros Passos', 'Renda Fixa'],
    authorId: 'author-redacao-ponto-financeiro',
    status: 'published',
    createdAt: '2026-08-20T10:00:00.000Z',
    updatedAt: '2026-08-24T14:30:00.000Z',
    publishedAt: '2026-08-20T10:00:00.000Z',
    isFeatured: true,
    isRecommended: true,
    metaTitle: 'Reserva de Emergência: O Que É, Onde Guardar e Quanto Juntar',
    metaDescription: 'Descubra como montar sua reserva de emergência passo a passo, qual o valor ideal para o seu perfil e os melhores lugares seguros com liquidez diária.',
    primaryKeyword: 'reserva de emergência',
    secondaryKeywords: ['quanto guardar na reserva', 'onde investir reserva de emergência', 'tesouro selic reserva', 'cdb liquidez diária'],
    excerpt: 'Montar uma reserva de emergência é o pilar fundamental para não se endividar diante de imprevistos como demissão, problemas de saúde ou consertos urgentes.',
    readingTimeMinutes: 7,
    disclaimerType: 'fixed_income',
    sources: [
      { name: 'Banco Central do Brasil - Educação Financeira', url: 'https://www.bcb.gov.br', dateVerified: '2026-08-24' },
      { name: 'Tesouro Nacional - Títulos Públicos', url: 'https://www.tesourodireto.com.br', dateVerified: '2026-08-24' },
      { name: 'Fundo Garantidor de Créditos (FGC)', url: 'https://www.fgc.org.br', dateVerified: '2026-08-20' },
    ],
    internalLinks: [
      { text: 'O que é CDI e taxa Selic', url: '/blog/o-que-e-cdi-e-taxa-selic-diferenca' },
      { text: 'Tesouro Direto para iniciantes', url: '/blog/tesouro-direto-para-iniciantes-guia' },
      { text: 'CDB, LCI e LCA: qual escolher?', url: '/blog/cdb-lci-lca-qual-melhor-renda-fixa' },
    ],
    externalLinks: [
      { text: 'Simulador Oficial do Tesouro Direto', url: 'https://www.tesourodireto.com.br/simulador/' },
    ],
    viewCount: 1420,
    content: `## O Que É a Reserva de Emergência?

A **reserva de emergência** é uma quantia financeira guardada exclusivamente para proteger você e sua família contra imprevistos financeiros. Pense nela como o "airbag" da sua vida financeira: você torce para não precisar usar, mas, se um imprevisto acontecer, ela evita um desastre no seu orçamento.

Situações típicas em que a reserva deve ser utilizada:
* Perda repentina de emprego ou queda brusca na renda autônoma.
* Gastos médicos ou odontológicos não cobertos por plano de saúde.
* Reparos urgentes na casa (vazamento, fiação) ou no veículo de trabalho.
* Auxílio pontual a um familiar de primeiro grau em situação grave.

> 💡 **Regra de Ouro:** A reserva de emergência NÃO serve para aproveitar promoções de Black Friday, comprar roupas novas ou bancar viagens de férias.

---

## Quanto Devo Guardar na Minha Reserva?

O valor ideal não é um número fixo em reais, mas sim um múltiplo do seu **custo de vida mensal** (a soma de todos os seus gastos essenciais: moradia, alimentação, contas básicas, saúde e transporte).

| Perfil Profissional | Meses de Custo de Vida Recomendados | Motivo |
| :--- | :--- | :--- |
| **Funcionário Público (Estável)** | 3 a 4 meses | Maior estabilidade de receita mensal. |
| **Trabalhador CLT (Carteira Assinada)** | 6 meses | Possui seguro-desemprego e FGTS como apoio. |
| **Autônomo, MEI ou Freelancer** | 9 a 12 meses | Rendimentos variáveis e sem rede de proteção CLT. |

### Exemplo Prático:
Se o seu custo de vida básico é de **R$ 2.500 por mês** e você trabalha como CLT:
* Meta da reserva: **R$ 2.500 × 6 meses = R$ 15.000**.

Se você não tem nada guardado hoje, não se desespere. Comece com uma meta menor: junte os primeiros **R$ 500**, depois **R$ 1.000**, e vá aumentando aos poucos a cada mês.

---

## Onde Guardar a Reserva de Emergência?

O objetivo principal da reserva **NÃO é buscar alta rentabilidade**, mas sim garantir **segurança máxima** e **liquidez diária** (capacidade de resgatar o dinheiro no mesmo dia em que precisar).

### 1. Tesouro Selic (Tesouro Direto)
* **Segurança:** Títulos públicos emitidos pelo Governo Federal (o risco mais baixo do país).
* **Rendimento:** Acompanha a taxa Selic diária.
* **Liquidez:** D+0 para solicitações em dias úteis dentro do horário comercial, ou D+1.

### 2. CDB com Liquidez Diária (a 100% do CDI ou mais)
* **Segurança:** Protegido pelo FGC (Fundo Garantidor de Créditos) em até R$ 250 mil por CPF e por instituição.
* **Praticidade:** Disponível em bancos digitais e tradicionais consolidados, permitindo resgate imediato via aplicativo até nos fins de semana.

### 3. Contas Remuneradas com Lastro em Títulos Públicos
* Contas que rendem 100% do CDI automaticamente sobre o saldo parado, com liquidez a qualquer momento.

---

## O Que EVITAR Para a Sua Reserva

* ❌ **Ações e Fundos Imobiliários:** Têm volatilidade. Se a bolsa cair 20% e você precisar do dinheiro no mesmo dia, terá prejuízo forçado.
* ❌ **CDBs ou LCIs com carência (sem liquidez):** Se o dinheiro ficar travado por 2 anos, você não conseguirá pagar um imprevisto hoje.
* ❌ **Criptomoedas:** Risco excessivo para dinheiro de sobrevivência.
* ❌ **Poupança antiga/tradicional:** Embora seja segura, rende muito abaixo de um CDB 100% do CDI ou Tesouro Selic.

---

## Passo a Passo Para Começar Hoje

1. **Calcule seu custo de vida essencial:** Some apenas o que é obrigatório para viver por 30 dias.
2. **Defina uma meta inicial realizável:** Comece mirando 1 mês de custo de vida.
3. **Abra conta em uma instituição segura e sem taxas:** Escolha corretoras ou bancos autorizados pelo Banco Central.
4. **Automatize seus aportes:** Programe uma transferência assim que o salário cair na conta, tratando a reserva como um compromisso inegociável.
5. **Comemore cada marco atingido:** Atingir 1, 3 e 6 meses de segurança traz uma paz mental impagável.
`,
  },

  {
    id: 'art-cdi-selic',
    title: 'O Que É CDI e Taxa Selic? Entenda a Diferença de Forma Simples',
    subtitle: 'Descubra como esses dois indicadores guiam o rendimento dos seus investimentos e o custo dos empréstimos.',
    slug: 'o-que-e-cdi-e-taxa-selic-diferenca',
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    coverImageAlt: 'Gráfico financeiro com setas e moedas simbolizando taxas de juros no Brasil',
    socialImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    category: 'economia',
    subCategory: 'Indicadores Econômicos',
    tags: ['Selic', 'CDI', 'Taxa de Juros', 'Renda Fixa', 'Economia Básica'],
    authorId: 'author-redacao-ponto-financeiro',
    status: 'published',
    createdAt: '2026-08-18T09:00:00.000Z',
    updatedAt: '2026-08-25T08:00:00.000Z',
    publishedAt: '2026-08-18T09:00:00.000Z',
    isFeatured: true,
    isRecommended: true,
    metaTitle: 'O Que É CDI e Taxa Selic: Entenda a Diferença Sem Complicação',
    metaDescription: 'Entenda de forma clara o que é a taxa Selic, o que é o CDI e como eles impactam o rendimento do seu dinheiro na renda fixa e a inflação.',
    primaryKeyword: 'o que é cdi e selic',
    secondaryKeywords: ['diferenca selic e cdi', 'como funciona o cdi', 'quanto rende 100 do cdi', 'copom taxa selic'],
    excerpt: 'Selic e CDI são as duas siglas mais citadas no noticiário financeiro brasileiro. Entenda como elas funcionam e por que andam sempre de mãos dadas.',
    readingTimeMinutes: 6,
    disclaimerType: 'general',
    sources: [
      { name: 'Banco Central do Brasil - Comitê de Política Monetária (Copom)', url: 'https://www.bcb.gov.br/controleinflacao/taxaselic', dateVerified: '2026-08-25' },
      { name: 'B3 - Brasil, Bolsa, Balcão (Índice CDI)', url: 'https://www.b3.com.br', dateVerified: '2026-08-25' },
    ],
    internalLinks: [
      { text: 'Guia da Reserva de Emergência', url: '/blog/reserva-de-emergencia-guia-iniciantes' },
      { text: 'Tesouro Direto para iniciantes', url: '/blog/tesouro-direto-para-iniciantes-guia' },
    ],
    viewCount: 1980,
    content: `## Por Que Selic e CDI São Tão Importantes?

Se você já pensou em guardar dinheiro em um banco digital ou investir em um título público, com certeza já esbarrou em frases como:
* *"Este CDB rende 100% do CDI"*
* *"O Banco Central manteve a taxa Selic em X% ao ano"*

Apesar dos nomes técnicos, compreender o que eles significam é simples e essencial para quem quer fazer escolhas conscientes no Brasil.

---

## 1. O Que É a Taxa Selic?

A **Taxa Selic** (Sistema Especial de Liquidação e Custódia) é a **taxa básica de juros da economia brasileira**. Ela funciona como o "termômetro" de todos os juros cobrados e pagos no país.

* **Quem define?** O Copom (Comitê de Política Monetária do Banco Central), que se reúne a cada 45 dias para calibrar a taxa.
* **Para que serve?** Controlar a inflação. Quando a inflação está alta, o Banco Central costuma subir a Selic para desaquecer o consumo. Quando a inflação cai, a Selic pode ser reduzida para estimular a economia.

### O Efeito da Selic no Seu Dia a Dia:
* **Selic Alta:** Os investimentos de renda fixa pagam mais, mas financiamentos, empréstimos e juros de cartão de crédito ficam mais caros.
* **Selic Baixa:** Fica mais barato tomar crédito, mas as aplicações conservadoras rendem menos nominalmente.

---

## 2. O Que É o CDI?

**CDI** significa *Certificado de Depósito Interbancário*. 

Por determinação do Banco Central, nenhum banco comercial no Brasil pode fechar o dia com o caixa no negativo. Por isso, os bancos que terminaram o dia com sobra de dinheiro emprestam para os bancos que fecharam com falta.

Esses empréstimos entre bancos são de curtíssimo prazo (geralmente duram apenas 1 dia) e são remunerados por uma taxa: a **Taxa DI** (popularmente chamada de CDI).

---

## Qual a Diferença Entre Selic e CDI?

Na prática, a diferença numérica é mínima:

| Indicador | O que representa | Quem determina |
| :--- | :--- | :--- |
| **Taxa Selic Meta** | Taxa de juros oficial do governo | Copom / Banco Central |
| **CDI** | Taxa média de empréstimos entre bancos | Mercado financeiro (calculado diariamente pela B3) |

> 📌 **Regra prática:** Historicamente, o CDI fica cerca de **0,10 ponto percentual abaixo da taxa Selic**. Por exemplo, se a Selic estiver em **10,50% ao ano**, o CDI estará em torno de **10,40% ao ano**.

---

## O Que Significa "Render 100% do CDI"?

Quando uma instituição financeira diz que sua conta ou seu CDB rende **100% do CDI**, significa que seu dinheiro vai valorizar exatamente no mesmo ritmo que a taxa média interbancária.

### Comparação de Rentabilidade:
* Se o CDI estiver em **10% ao ano**:
  * Uma aplicação que rende **100% do CDI** renderá **10,0% ao ano** (bruto).
  * Uma aplicação que rende **110% do CDI** renderá **11,0% ao ano** (bruto).
  * A poupança antiga renderá consideravelmente menos na maioria dos cenários econômicos.
`,
  },

  {
    id: 'art-tesouro-direto',
    title: 'Tesouro Direto Para Iniciantes: Como Começar a Investir Com Pouco Dinheiro',
    subtitle: 'Descubra os tipos de títulos públicos federais, a segurança do governo e como escolher o título certo.',
    slug: 'tesouro-direto-para-iniciantes-guia',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    coverImageAlt: 'Edifício governamental e moedas representando títulos públicos do Tesouro Nacional',
    socialImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    category: 'renda-fixa',
    subCategory: 'Títulos Públicos',
    tags: ['Tesouro Direto', 'Tesouro Selic', 'Tesouro IPCA', 'Investimento Seguro', 'Renda Fixa'],
    authorId: 'author-redacao-ponto-financeiro',
    status: 'published',
    createdAt: '2026-08-15T11:00:00.000Z',
    updatedAt: '2026-08-23T16:00:00.000Z',
    publishedAt: '2026-08-15T11:00:00.000Z',
    isFeatured: false,
    isRecommended: true,
    metaTitle: 'Tesouro Direto Para Iniciantes: Passo a Passo Completo',
    metaDescription: 'Aprenda o que é o Tesouro Direto, quais os tipos de títulos (Selic, IPCA+ e Prefixado) e como começar a investir a partir de R$ 30 com segurança.',
    primaryKeyword: 'tesouro direto para iniciantes',
    secondaryKeywords: ['como funciona o tesouro direto', 'tesouro selic como investir', 'tesouro ipca aposentadoria', 'qual melhor tesouro direto'],
    excerpt: 'O Tesouro Direto é o programa do Tesouro Nacional que permite que pessoas físicas comprem títulos públicos federais a partir de aproximadamente R$ 30.',
    readingTimeMinutes: 8,
    disclaimerType: 'fixed_income',
    sources: [
      { name: 'Tesouro Nacional - Programa Tesouro Direto', url: 'https://www.tesourodireto.com.br', dateVerified: '2026-08-23' },
      { name: 'Secretaria do Tesouro Nacional (STN)', url: 'https://www.gov.br/tesouronacional', dateVerified: '2026-08-23' },
    ],
    internalLinks: [
      { text: 'Reserva de emergência passo a passo', url: '/blog/reserva-de-emergencia-guia-iniciantes' },
      { text: 'O que é CDI e Selic', url: '/blog/o-que-e-cdi-e-taxa-selic-diferenca' },
    ],
    viewCount: 1650,
    content: `## O Que É o Tesouro Direto?

Criado em 2002 pelo Tesouro Nacional em parceria com a B3, o **Tesouro Direto** é uma plataforma que permite a qualquer cidadão brasileiro comprar frações de títulos da dívida pública federal pela internet.

Em termos bem simples: quando você investe no Tesouro Direto, você está **emprestando dinheiro para o Governo Federal** financiar obras públicas, saúde, educação e infraestrutura. Em troca, o governo devolve seu dinheiro com juros em uma data futura.

---

## Por Que É Considerado o Investimento Mais Seguro do Brasil?

O Governo Federal é o emissor da moeda nacional (o Real). Caso uma crise financeira extrema ocorra, o governo tem ferramentas monetárias e tributárias para honrar suas dívidas antes de qualquer banco privado quebrar. Por essa razão, os títulos públicos federais formam o chamado **"risco soberano"** — a referência de segurança máxima do mercado brasileiro.

---

## Os 3 Principais Tipos de Títulos do Tesouro

| Tipo de Título | Como Rende | Para Qual Objetivo É Indicado? |
| :--- | :--- | :--- |
| **Tesouro Selic** (Pós-fixado) | Acompanha a taxa Selic diária | **Reserva de emergência** e metas de curto prazo (até 2 anos). Não sofre oscilação negativa se resgatado antes do vencimento. |
| **Tesouro IPCA+** (Híbrido) | Inflação oficial (IPCA) + Taxa fixa garantida | Metas de médio e longo prazo (compra de imóvel, faculdade dos filhos, aposentadoria). Garante ganho real acima da inflação se mantido até o vencimento. |
| **Tesouro Prefixado** (Fixo) | Taxa percentual pré-definida no momento da compra (ex: 11% a.a.) | Quando você tem certeza de quando precisará do dinheiro e quer travar exatamente o valor final a receber. |

> ⚠️ **Atenção ao Resgate Antecipado:** O Tesouro Selic pode ser resgatado a qualquer momento sem perdas de principal. Já o **Tesouro IPCA+ e o Tesouro Prefixado** passam por um fenômeno chamado *marcação a mercado*. Se você resgatá-los antes da data de vencimento, poderá receber mais ou menos do que aplicou dependendo das taxas do momento. Por isso, só compre títulos longos com dinheiro que não precisará no curto prazo.

---

## Como Começar em 4 Passos Práticos

1. **Abra conta em uma corretora de valores ou banco credenciado:** A grande maioria das instituições hoje oferece taxa de custódia zero para o Tesouro Direto.
2. **Transfira o valor que deseja aplicar:** Com cerca de R$ 30 a R$ 50 você já consegue comprar frações de títulos.
3. **Selecione o título adequado ao seu objetivo:** Para iniciantes sem reserva, comece sempre pelo **Tesouro Selic**.
4. **Confirme a operação:** O comprovante será enviado para seu e-mail e registrado oficialmente na B3 em seu CPF.
`,
  },

  {
    id: 'art-cartao-sem-dividas',
    title: 'Cartão de Crédito Sem Dívidas: 6 Regras Essenciais Para Usar a Seu Favor',
    subtitle: 'Transforme o cartão em um aliado da sua organização financeira em vez de um pesadelo de juros rotativos.',
    slug: 'como-usar-cartao-de-credito-sem-dividas',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
    coverImageAlt: 'Cartão de crédito em cima de uma carteira de couro e caderno de anotações',
    socialImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
    category: 'cartao-de-credito',
    subCategory: 'Uso Consciente do Crédito',
    tags: ['Cartão de Crédito', 'Controle Financeiro', 'Juros Rotativos', 'Evitar Dívidas'],
    authorId: 'author-editor-chefe',
    status: 'published',
    createdAt: '2026-08-12T14:00:00.000Z',
    updatedAt: '2026-08-22T10:00:00.000Z',
    publishedAt: '2026-08-12T14:00:00.000Z',
    isFeatured: false,
    isRecommended: false,
    metaTitle: 'Cartão de Crédito Sem Dívidas: 6 Regras de Ouro Para Iniciantes',
    metaDescription: 'Descubra como controlar a fatura do cartão de crédito, evitar os perigosos juros do rotativo e acumular benefícios com inteligência financeira.',
    primaryKeyword: 'como usar cartao de credito sem dividas',
    secondaryKeywords: ['juros rotativo cartao', 'pagar fatura total', 'data de fechamento e vencimento', 'limite de cartao consciente'],
    excerpt: 'O cartão de crédito não é uma extensão do seu salário. Aprenda a utilizá-lo com disciplina para aproveitar até 40 dias de prazo sem pagar um centavo de juros.',
    readingTimeMinutes: 6,
    disclaimerType: 'credit_debt',
    sources: [
      { name: 'Banco Central do Brasil - Relatório de Economia Bancária', url: 'https://www.bcb.gov.br', dateVerified: '2026-08-22' },
      { name: 'Procon-SP - Orientações ao Consumidor de Crédito', url: 'https://www.procon.sp.gov.br', dateVerified: '2026-08-22' },
    ],
    internalLinks: [
      { text: 'Como sair das dívidas passo a passo', url: '/blog/como-sair-das-dividas-passo-a-passo' },
      { text: 'Método de orçamento 50-30-20', url: '/blog/metodo-orcamento-50-30-20-como-funciona' },
    ],
    viewCount: 1210,
    content: `## O Cartão É Vilão ou Aliado?

O cartão de crédito é apenas uma ferramenta. Quando bem utilizado, oferece segurança contra fraudes em compras online, até 40 dias de prazo para pagar despesas e eventuais programas de cashback ou pontos.

Por outro lado, quando mal gerenciado, os **juros do crédito rotativo** no Brasil estão entre os mais altos do mundo, podendo ultrapassar 400% ao ano e transformar uma fatura de R$ 1.000 em uma dívida impagável em poucos meses.

---

## As 6 Regras de Ouro do Cartão de Crédito

### 1. Limite Não É Renda
O maior erro do iniciante é somar o limite do cartão ao salário mensal. Se você ganha R$ 3.000 e tem R$ 5.000 de limite, seu poder de compra continua sendo R$ 3.000. Nunca gaste no cartão mais do que o seu saldo bancário permite pagar à vista na data da fatura.

### 2. Sempre Pague o Valor Integral da Fatura
**Nunca, sob hipótese alguma, pague o valor mínimo da fatura.** O pagamento mínimo aciona os juros do rotativo, que cobram juros sobre juros diariamente. Se houver aperto, negocie um parcelamento de fatura fixo com taxa menor ou utilize a reserva de emergência antes de entrar no rotativo.

### 3. Entenda a Diferença Entre Data de Fechamento e Data de Vencimento
* **Data de Fechamento (Melhor Dia de Compra):** É o dia em que o banco "fecha a conta" do mês. Compras feitas a partir desse dia só entrarão na fatura do mês seguinte (gerando até 40 dias de prazo).
* **Data de Vencimento:** É o dia limite para efetuar o pagamento da fatura sem multa nem juros.

### 4. Cuidado com o Parcelamento Sem Juros
Comprar em 10x de R$ 100 parece inofensivo. Mas somar 5 compras parceladas consome R$ 500 da sua renda de todos os meses seguintes, comprometendo sua flexibilidade futura.

### 5. Ajuste o Limite Para Baixo no Próprio App
A maioria dos aplicativos bancários modernos permite reduzir o limite visível. Se o seu salário é R$ 2.500, mantenha seu limite configurado em R$ 1.200 para evitar descontrole por impulso.

### 6. Acompanhe a Fatura Semanalmente
Não espere o susto no dia do fechamento. Abra o app do banco uma vez por semana para checar os gastos acumulados e ajustar seu comportamento antes do fim do mês.
`,
  },

  {
    id: 'art-sair-das-dividas',
    title: 'Como Sair das Dívidas e Limpar o Nome: Estratégia Prática Para Recuperar o Controle',
    subtitle: 'Um roteiro objetivo para quem quer se livrar dos juros, negociar com credores e voltar a ter tranquilidade.',
    slug: 'como-sair-das-dividas-passo-a-passo',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    coverImageAlt: 'Calculadora, recibos e caneta organizados para quitação de contas',
    socialImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    category: 'dividas',
    subCategory: 'Recuperação Financeira',
    tags: ['Dívidas', 'Limpar Nome', 'Renegociação', 'Serasa', 'Planejamento'],
    authorId: 'author-editor-chefe',
    status: 'published',
    createdAt: '2026-08-10T08:00:00.000Z',
    updatedAt: '2026-08-21T11:00:00.000Z',
    publishedAt: '2026-08-10T08:00:00.000Z',
    isFeatured: false,
    isRecommended: true,
    metaTitle: 'Como Sair das Dívidas: 5 Passos Práticos Para Limpar Seu Nome',
    metaDescription: 'Veja o passo a passo comprovado para mapear débitos, negociar com até 90% de desconto nos feirões oficiais e retomar o controle do seu dinheiro.',
    primaryKeyword: 'como sair das dividas',
    secondaryKeywords: ['renegociar divida serasa', 'feirao limpa nome', 'como negociar com o banco', 'priorizar dividas mais caras'],
    excerpt: 'Estar endividado gera angústia, mas com método e informação clara é possível quitar as pendências de forma organizada e realista.',
    readingTimeMinutes: 7,
    disclaimerType: 'credit_debt',
    sources: [
      { name: 'Secretaria Nacional do Consumidor (Senacon) / Consumidor.gov.br', url: 'https://www.consumidor.gov.br', dateVerified: '2026-08-21' },
      { name: 'Banco Central do Brasil - Registrato (SCR)', url: 'https://registrato.bcb.gov.br', dateVerified: '2026-08-21' },
    ],
    internalLinks: [
      { text: 'Regras para usar o cartão de crédito', url: '/blog/como-usar-cartao-de-credito-sem-dividas' },
      { text: 'Método de orçamento 50-30-20', url: '/blog/metodo-orcamento-50-30-20-como-funciona' },
    ],
    viewCount: 1530,
    content: `## O Primeiro Passo: Encarar os Números Sem Culpa

O endividamento é uma realidade que atinge milhões de famílias brasileiras devido a imprevistos, desemprego ou falta de educação financeira básica nas escolas. O primeiro passo para resolver é **não fugir do problema**.

---

## Roteiro de 5 Passos Para a Quitação

### Passo 1: Mapeie Todas as Dívidas
Crie uma lista simples (em papel ou planilha) com as seguintes colunas:
1. Nome do credor (qual banco ou loja)
2. Valor total da dívida original
3. Taxa de juros mensal
4. Custo total atual

Você pode consultar gratuitamente todas as suas operações de crédito oficiais através do sistema **Registrato do Banco Central**.

### Passo 2: Separe as Dívidas Por Prioridade
* **Prioridade Máxima:** Dívidas com bens em garantia (financiamento de casa ou carro) e serviços essenciais (água, luz, gás).
* **Segunda Prioridade:** Dívidas com as taxas de juros mais altas (cheque especial e cartão de crédito rotativo).
* **Terceira Prioridade:** Empréstimos pessoais sem garantia e carnês de lojas.

### Passo 3: Faça um Diagnóstico do Orçamento
Corte temporariamente todos os gastos supérfluos para saber exatamente quanto dinheiro sobra por mês para negociar parcelas realistas. Nunca assine um acordo cuja parcela você não consiga pagar no mês seguinte.

### Passo 4: Negocie nos Canais Oficiais
Aproveite plataformas de renegociação consolidadas como o **Consumidor.gov.br**, os feirões oficiais Limpa Nome ou o programa Desenrola Brasil. É muito comum conseguir descontos de 50% a 90% sobre os juros acumulados para pagamento à vista ou parcelamento fixo.

### Passo 5: Mantenha o Compromisso e Recupere o Score
Após pagar a primeira parcela do acordo de renegociação, a instituição credora tem o prazo legal de até **5 dias úteis** para retirar seu CPF dos cadastros de restrição (SPC/Serasa). Mantenha as contas em dia e seu score de crédito aumentará gradativamente.
`,
  },

  {
    id: 'art-metodo-50-30-20',
    title: 'Método 50-30-20: Como Organizar Seu Salário de Forma Equilibrada',
    subtitle: 'Uma das regras mais famosas e simples do mundo para distribuir seus rendimentos sem estresse.',
    slug: 'metodo-orcamento-50-30-20-como-funciona',
    coverImage: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80',
    coverImageAlt: 'Gráfico circular desenhado em papel com caneta representando distribuição de orçamento',
    socialImage: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80',
    category: 'planejamento-financeiro',
    subCategory: 'Orçamento Pessoal',
    tags: ['Orçamento', 'Método 50-30-20', 'Controle Financeiro', 'Economizar Dinheiro'],
    authorId: 'author-redacao-ponto-financeiro',
    status: 'published',
    createdAt: '2026-08-08T10:00:00.000Z',
    updatedAt: '2026-08-20T17:00:00.000Z',
    publishedAt: '2026-08-08T10:00:00.000Z',
    isFeatured: false,
    isRecommended: true,
    metaTitle: 'Método 50-30-20: O Que É e Como Aplicar no Seu Orçamento',
    metaDescription: 'Aprenda a dividir seu salário líquido em necessidades básicas (50%), desejos pessoais (30%) e metas financeiras/investimentos (20%) com facilidade.',
    primaryKeyword: 'metodo 50 30 20',
    secondaryKeywords: ['como dividir o salario', 'regra 50 30 20 simulador', 'orcamento pessoal simples', 'quanto guardar do salario'],
    excerpt: 'Não sabe para onde vai seu salário no fim do mês? Conheça a regra 50-30-20 e descubra como equilibrar contas obrigatórias, lazer e poupança.',
    readingTimeMinutes: 5,
    disclaimerType: 'general',
    sources: [
      { name: 'Banco Central do Brasil - Guia Cidadão de Educação Financeira', url: 'https://www.bcb.gov.br', dateVerified: '2026-08-20' },
    ],
    internalLinks: [
      { text: 'Passo a passo da Reserva de Emergência', url: '/blog/reserva-de-emergencia-guia-iniciantes' },
      { text: 'Como sair das dívidas', url: '/blog/como-sair-das-dividas-passo-a-passo' },
    ],
    viewCount: 1740,
    content: `## O Que É a Regra 50-30-20?

Criada para simplificar a vida de quem não quer perder horas anotando cada centavo em planilhas complexas, a regra 50-30-20 divide sua renda líquida mensal (o valor que cai na conta após os descontos do holerite) em três grandes categorias:

> **[ 50% Gastos Essenciais ]** + **[ 30% Estilo de Vida e Lazer ]** + **[ 20% Metas e Futuro ]**

---

## Como Dividir Cada Fatia

### 1. 50% para Necessidades Básicas (Essenciais)
São as despesas obrigatórias para sua sobrevivência e manutenção:
* Aluguel, condomínio e IPTU
* Contas de água, luz, gás e internet
* Alimentação básica (supermercado)
* Transporte (combustível ou passe)
* Saúde e remédios essenciais

### 2. 30% para Desejos Pessoais (Lazer e Bem-Estar)
A vida não é só pagar boletos. Essa fatia é reservada para aquilo que traz alegria, sem culpa:
* Jantares fora e pedidos em aplicativos de entrega
* Cinema, passeios e viagens curtas
* Assinaturas de streaming e hobbies
* Roupas não essenciais e cuidados estéticos

### 3. 20% para o Seu Futuro Financeiro (Prioridades)
Essa é a fatia que constrói sua independência e segurança:
* Quitação de dívidas caras (caso você ainda tenha)
* Construção da sua **Reserva de Emergência**
* Aportes mensais no Tesouro Direto ou CDBs para aposentadoria

---

## Simulação Prática com Salário de R$ 3.000 Líquidos

* **R$ 1.500 (50%):** Pagamento de aluguel, contas da casa, supermercado e transporte.
* **R$ 900 (30%):** Lazer, delivery nos fins de semana e assinaturas.
* **R$ 600 (20%):** Aporte mensal na reserva de emergência no Tesouro Selic.

> 💡 **Dica de Adaptação para a Realidade Brasileira:** Se o custo de vida na sua cidade estiver alto e os gastos essenciais consumirem 60% ou 70% da sua renda, não abandone a regra. Adapte para **60-25-15** ou **70-20-10**. O importante é manter o hábito de guardar pelo menos 10% todos os meses.
`,
  },

  {
    id: 'art-cdb-lci-lca',
    title: 'CDB, LCI e LCA: Qual a Melhor Opção de Renda Fixa Para o Seu Momento?',
    subtitle: 'Compare a rentabilidade líquida, a isenção de Imposto de Renda e a garantia do FGC.',
    slug: 'cdb-lci-lca-qual-melhor-renda-fixa',
    coverImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    coverImageAlt: 'Crescimento financeiro com gráficos e moedas douradas em um ambiente corporativo',
    socialImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    category: 'renda-fixa',
    subCategory: 'Renda Fixa Privada',
    tags: ['CDB', 'LCI', 'LCA', 'Renda Fixa', 'FGC', 'Imposto de Renda'],
    authorId: 'author-redacao-ponto-financeiro',
    status: 'published',
    createdAt: '2026-08-05T09:00:00.000Z',
    updatedAt: '2026-08-19T14:00:00.000Z',
    publishedAt: '2026-08-05T09:00:00.000Z',
    isFeatured: false,
    isRecommended: false,
    metaTitle: 'CDB vs LCI vs LCA: Qual Escolher? Comparativo Completo',
    metaDescription: 'Descubra as diferenças entre CDB, LCI e LCA, a tabela regressiva do Imposto de Renda e como calcular a rentabilidade real para não perder dinheiro.',
    primaryKeyword: 'cdb lci lca diferenca',
    secondaryKeywords: ['lci lca vale a pena', 'cdb tem ir', 'calculo equivalencia lci cdb', 'fgc limite renda fixa'],
    excerpt: 'Entenda como funciona a isenção de Imposto de Renda em LCIs e LCAs e aprenda a comparar se um CDB tributado rende mais ou menos no bolso.',
    readingTimeMinutes: 7,
    disclaimerType: 'fixed_income',
    sources: [
      { name: 'Receita Federal do Brasil - Tabela Regressiva de Renda Fixa', url: 'https://www.gov.br/receitafederal', dateVerified: '2026-08-19' },
      { name: 'Fundo Garantidor de Créditos (FGC)', url: 'https://www.fgc.org.br', dateVerified: '2026-08-19' },
    ],
    internalLinks: [
      { text: 'O que é CDI e taxa Selic', url: '/blog/o-que-e-cdi-e-taxa-selic-diferenca' },
      { text: 'Guia do Tesouro Direto', url: '/blog/tesouro-direto-para-iniciantes-guia' },
    ],
    viewCount: 1390,
    content: `## O Que São Títulos de Renda Fixa Privada?

Quando você investe em títulos privados emitidos por instituições financeiras (bancos e financeiras), você está emprestando dinheiro para aquela instituição em troca de uma taxa de remuneração.

Os três mais populares no Brasil são o **CDB**, a **LCI** e a **LCA**.

---

## 1. CDB (Certificado de Depósito Bancário)
* **Destino dos recursos:** O banco usa o dinheiro livremente para conceder empréstimos e financiamentos a seus clientes.
* **Tributação:** Paga Imposto de Renda sobre o rendimento (tabela regressiva de 22,5% a 15%).
* **Garantia:** Coberto pelo FGC em até R$ 250 mil por CPF/instituição.
* **Liquidez:** Existem opções com liquidez diária e opções com prazo fechado (1 a 5 anos).

---

## 2. LCI (Letra de Crédito Imobiliário) e LCA (Letra de Crédito do Agronegócio)
* **Destino dos recursos:** O banco é obrigado por lei a direcionar os recursos especificamente para o setor imobiliário (LCI) ou para o setor agropecuário (LCA).
* **Tributação:** **Isentas de Imposto de Renda** para pessoas físicas.
* **Garantia:** Cobertas pelo FGC em até R$ 250 mil por CPF/instituição.
* **Liquidez:** Possuem prazo mínimo de carência exigido pela regulamentação do Banco Central antes de permitir resgate.

---

## Tabela Regressiva do Imposto de Renda (Aplicável a CDBs e Tesouro)

O Imposto de Renda na renda fixa incide **apenas sobre o rendimento** (lucro), nunca sobre o valor principal investido, e é retido na fonte automaticamente:

| Prazo da Aplicação | Alíquota de IR sobre o Lucro |
| :--- | :--- |
| **Até 180 dias (6 meses)** | 22,5% |
| **De 181 a 360 dias (1 ano)** | 20,0% |
| **De 361 a 720 dias (2 anos)** | 17,5% |
| **Acima de 720 dias (mais de 2 anos)** | 15,0% |

---

## Como Saber Se Uma LCI Isenta Vale Mais Que Um CDB?

Como a LCI/LCA não paga IR, uma taxa de **90% do CDI em uma LCI** pode render mais do que um **CDB de 100% do CDI**.

### Fórmula de Equivalência Rápida:
* Para um prazo de 1 a 2 anos (alíquota de 17,5% de IR):
  * Um CDB a 100% do CDI rende líquido: \`100% × (1 - 0,175) = 82,5% do CDI\`.
  * Portanto, qualquer LCI que pague **mais de 82,5% do CDI** para o mesmo prazo já será mais vantajosa que o CDB de 100%.
`,
  },
];

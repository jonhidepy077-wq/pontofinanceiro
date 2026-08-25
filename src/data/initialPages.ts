import { SitePage } from '../types';

export const INITIAL_PAGES: Record<string, SitePage> = {
  sobre: {
    id: 'page-sobre',
    title: 'Sobre o Ponto Financeiro',
    slug: 'sobre',
    updatedAt: new Date().toISOString(),
    content: `## Nossa Missão: Descomplicar o Dinheiro

O **Ponto Financeiro** nasceu com um propósito simples e urgente: democratizar a educação financeira no Brasil, traduzindo conceitos que antes pareciam distantes ou complicados em guias práticos, didáticos e acessíveis a qualquer pessoa.

Acreditamos que a tranquilidade financeira não é um privilégio restrito a quem já tem muito dinheiro, mas sim o resultado de decisões conscientes, planejamento realista e conhecimento acessível.

---

### Para Quem É o Ponto Financeiro?

Nossos conteúdos são pensados especialmente para:

* **Pessoas que estão no começo:** Quem quer aprender a sair do vermelho, quitar dívidas e organizar o orçamento do mês.
* **Quem deseja guardar os primeiros reais:** Passo a passo para construir uma reserva de emergência sem abrir mão do que é essencial para a sua vida.
* **Novos investidores:** Quem quer entender a diferença entre Tesouro Direto, CDB, LCI, LCA, ações e fundos imobiliários com clareza, transparência e sem promessas milagrosas.

---

### Nossos Princípios Fundamentais

1. **Foco 100% Educacional:** Não fazemos recomendações personalizadas de investimento nem indicamos compra ou venda de ativos específicos. Nosso papel é capacitar você para tomar suas próprias decisões.
2. **Sem Fórmulas Mágicas:** Rejeitamos expressamente qualquer tipo de promessa de enriquecimento rápido, retorno garantido ou esquemas especulativos.
3. **Linguagem Humana e Direta:** Abolimos jargões difíceis ou os explicamos de forma que qualquer brasileiro compreenda no dia a dia.
4. **Fontes Oficiais e Verificáveis:** Nossas publicações baseiam-se em dados de fontes primárias, como Banco Central do Brasil (Bacen), Comissão de Valores Mobiliários (CVM), Tesouro Nacional e IBGE.

---

### Localização e Contato

* **Sede Editorial:** São Paulo - SP - Brasil
* **Canal de Atendimento / WhatsApp:** (11) 96113-9395
* **Página de Contato:** [Acesse aqui nosso canal direto](/contato)
`,
  },

  'politica-editorial': {
    id: 'page-politica-editorial',
    title: 'Política Editorial e Compromisso com a Verdade',
    slug: 'politica-editorial',
    updatedAt: new Date().toISOString(),
    content: `## Como Produzimos Nosso Conteúdo

No **Ponto Financeiro**, o compromisso com o leitor é o pilar central de todas as nossas publicações. Esta Política Editorial estabelece os padrões éticos, metodológicos e de verificação que regem nossa produção de conteúdo.

---

### 1. Independência e Isenção

Nossos artigos são redigidos de forma independente, com foco exclusivo na utilidade e clareza para o leitor iniciante. Nenhuma parceria comercial ou anúncio dita a opinião técnica ou os fatos apresentados em nossos textos educativos.

---

### 2. Uso de Fontes Primárias e Oficiais

Sempre que apresentamos dados estatísticos, índices econômicos (como Selic, IPCA e CDI) ou regras tributárias, buscamos as informações diretamente nos órgãos oficiais reguladores:

* **Banco Central do Brasil (Bacen):** Taxa básica de juros, regulamentação bancária e dados de crédito.
* **Comissão de Valores Mobiliários (CVM):** Normas do mercado de capitais e proteção ao investidor.
* **Tesouro Nacional:** Regras, taxas e prazos dos títulos públicos federais.
* **IBGE:** Indicadores oficiais de inflação e custo de vida.
* **Fundo Garantidor de Créditos (FGC):** Limites e garantias da renda fixa.

---

### 3. Atualização Periódica e Correção de Erros

O mercado financeiro e a economia mudam com frequência. Por isso:

* Informamos explicitamente nos artigos a **data de publicação original** e a **data da última revisão**.
* Caso identifiquemos qualquer incorreção ou desatualização normativa, corrigimos o texto com presteza e transparência.
* Se você identificar alguma informação que necessite de revisão, nosso canal de contato está sempre aberto.

---

### 4. Uso Ético e Responsável de Ferramentas de Apoio (IA)

Podemos utilizar tecnologias modernas de inteligência artificial exclusivamente como ferramenta de suporte editorial (como geração de ideias de pautas, estrutura preliminar ou checagem gramatical). 

**Todo e qualquer conteúdo passa obrigatoriamente por curadoria, verificação de dados, redação e aprovação humana** antes de ser publicado. Não geramos artigos em massa sem revisão.

---

### 5. Transparência Publicitária

Identificamos com clareza qualquer anúncio, banner ou link patrocinado presente no portal. Espaços comerciais nunca se confundem com o corpo do texto editorial.
`,
  },

  'politica-de-privacidade': {
    id: 'page-politica-de-privacidade',
    title: 'Política de Privacidade e Proteção de Dados (LGPD)',
    slug: 'politica-de-privacidade',
    updatedAt: new Date().toISOString(),
    content: `## 1. Introdução e Compromisso com a LGPD

O **Ponto Financeiro** valoriza a privacidade e a segurança dos dados pessoais de seus visitantes. Esta Política de Privacidade foi elaborada em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais do Brasil (**Lei nº 13.709/2018 - LGPD**) e as melhores práticas internacionais da web.

---

### 2. Dados que Podemos Coletar

* **Dados Fornecidos Voluntariamente:** Nome, e-mail ou telefone quando você preenche nosso formulário de contato ou assina nossa newsletter educativa.
* **Dados de Navegação e Técnicos:** Endereço IP anonimizado, tipo de navegador, sistema operacional, páginas visitadas e tempo de permanência, coletados automaticamente para fins estatísticos e de segurança.
* **Cookies e Identificadores:** Pequenos arquivos armazenados em seu dispositivo para lembrar preferências e otimizar a exibição de conteúdos e anúncios.

---

### 3. Finalidade do Tratamento dos Dados

Os dados coletados são utilizados exclusivamente para:

1. Responder a dúvidas, sugestões ou solicitações enviadas através dos nossos canais de contato.
2. Enviar artigos, informativos e novidades para quem autorizou expressamente a inscrição na newsletter.
3. Analisar métricas agregadas de audiência para aprimorar a qualidade dos nossos artigos.
4. Exibir publicidade contextual relevante através de parceiros autorizados (como Google AdSense).
5. Garantir a integridade, segurança e funcionamento técnico de nossa infraestrutura.

---

### 4. Compartilhamento de Dados com Terceiros

Não vendemos, alugamos ou comercializamos dados pessoais. O compartilhamento ocorre apenas com provedores de infraestrutura estritamente necessários para a operação do site:

* Provedores de hospedagem em nuvem e banco de dados com altos padrões de segurança (ex: Firebase / Google Cloud).
* Redes de publicidade (Google AdSense) em conformidade com as diretrizes de consentimento.

---

### 5. Seus Direitos como Titular de Dados (Art. 18 da LGPD)

Você possui o direito de, a qualquer momento:

* Confirmar a existência de tratamento dos seus dados.
* Solicitar acesso, correção ou exclusão de dados pessoais informados.
* Revogar o consentimento para envio de comunicações ou cookies não essenciais.

Para exercer seus direitos, envie uma solicitação pela nossa [página de contato](/contato) informando o assunto "Privacidade de Dados / LGPD".
`,
  },

  'politica-de-cookies': {
    id: 'page-politica-de-cookies',
    title: 'Política de Cookies e Tecnologias de Rastreamento',
    slug: 'politica-de-cookies',
    updatedAt: new Date().toISOString(),
    content: `## O que São Cookies?

Cookies são pequenos arquivos de texto salvos em seu navegador quando você visita um site. Eles servem para fazer a página funcionar corretamente, lembrar suas preferências de navegação e fornecer informações estatísticas anônimas aos administradores.

---

### Tipos de Cookies Utilizados no Ponto Financeiro

1. **Cookies Estritamente Necessários:**
   * Essenciais para o carregamento do portal, segurança, navegação entre páginas e registro de suas opções de privacidade. Não podem ser desativados.
2. **Cookies Analíticos / de Desempenho:**
   * Coletam dados anônimos sobre quais artigos são mais lidos e como os visitantes interagem com o site, ajudando-nos a produzir conteúdos cada vez mais úteis.
3. **Cookies de Publicidade / Terceiros:**
   * Utilizados por parceiros como o Google para veicular anúncios não invasivos e relevantes aos interesses do usuário, de acordo com as políticas do programa Google AdSense.

---

### Como Gerenciar ou Desativar Cookies?

Você pode alterar suas preferências a qualquer momento através do nosso **Banner de Consentimento** presente no rodapé da página ou diretamente nas configurações do seu navegador de internet (Chrome, Firefox, Safari, Edge).

A desativação de cookies essenciais pode impactar a exibição correta de alguns recursos do portal.
`,
  },

  'termos-de-uso': {
    id: 'page-termos-de-uso',
    title: 'Termos de Uso e Condições Gerais',
    slug: 'termos-de-uso',
    updatedAt: new Date().toISOString(),
    content: `## 1. Aceitação dos Termos

Ao acessar e navegar no portal **Ponto Financeiro**, você concorda integralmente com as condições estipuladas nestes Termos de Uso. Caso não concorde, recomendamos a não utilização do site.

---

### 2. Natureza Estritamente Educacional (Aviso Legal)

* O conteúdo disponibilizado neste portal tem finalidade **exclusivamente educativa e informativa**.
* As informações sobre produtos financeiros (como títulos públicos, fundos, ações, CDBs ou cartões) **não constituem, sob nenhuma hipótese, consultoria de investimentos, recomendação personalizada ou oferta pública de valores mobiliários**.
* Rentabilidade passada não representa garantia de rentabilidade futura. Investimentos envolvem riscos de perda patrimonial ou oscilação de mercado.
* O leitor é o único responsável por suas decisões financeiras e deve consultar profissionais certificados (como consultores autorizados pela CVM) antes de realizar investimentos substanciais.

---

### 3. Propriedade Intelectual

Todo o material produzido pelo Ponto Financeiro (textos, gráficos, ilustrações, design e logomarca) é protegido pela Lei de Direitos Autorais (**Lei nº 9.610/1998**). É proibida a reprodução integral não autorizada para fins comerciais. Citações breves são permitidas desde que acompanhadas do devido crédito e link de referência.

---

### 4. Limitação de Responsabilidade

Trabalhamos diligentemente para manter todas as informações exatas e atualizadas. Contudo, não nos responsabilizamos por eventuais indisponibilidades técnicas do servidor ou alterações imprevistas de alíquotas e taxas por parte de instituições terceiras.
`,
  },

  publicidade: {
    id: 'page-publicidade',
    title: 'Política de Publicidade, Afiliados e Divulgação',
    slug: 'publicidade',
    updatedAt: new Date().toISOString(),
    content: `## Transparência e Financiamento do Portal

Para mantermos o portal **Ponto Financeiro** 100% gratuito e acessível a todos os leitores brasileiros, recorremos a modelos de monetização digital transparentes e éticos.

---

### 1. Espaços de Anúncios (Google AdSense e Redes Display)

Exibimos anúncios distribuídos estrategicamente pelas páginas do site através de redes automatizadas de publicidade. Estes anúncios são identificados de forma clara com a legenda **"PUBLICIDADE"** ou rótulos equivalentes.

* Não permitimos anúncios invasivos que cubram a tela, bloqueiem a leitura ou simulem botões do sistema.
* Não realizamos ou incentivamos práticas que induzam o leitor a cliques acidentais.

---

### 2. Links Afiliados e Parcerias

Ocasionalmente, artigos educativos podem conter links para livros, ferramentas ou serviços que consideramos úteis para o aprendizado financeiro.

* Caso você decida adquirir algum produto por meio desses links, poderemos receber uma pequena comissão sem qualquer custo adicional para você.
* Nossas análises e artigos permanecem rigorosamente honestos, priorizando sempre as vantagens e desvantagens reais para o consumidor.

---

### 3. Conteúdos Patrocinados

Caso venhamos a publicar algum conteúdo patrocinado por uma marca parceira, este será categorizado e identificado ostensivamente desde o início do texto como **"Conteúdo Patrocinado"** ou **"Publieditorial"**, respeitando as normas do CONAR e do Código de Defesa do Consumidor.
`,
  },

  'direitos-autorais': {
    id: 'page-direitos-autorais',
    title: 'Política de Direitos Autorais e Uso de Conteúdo',
    slug: 'direitos-autorais',
    updatedAt: new Date().toISOString(),
    content: `## Proteção Autoral e Compartilhamento Consciente

Todos os artigos, análises, infográficos, códigos e estruturas editoriais presentes no **Ponto Financeiro** são de propriedade exclusiva deste portal, protegidos pela Lei de Direitos Autorais (**Lei Federal nº 9.610/1998**).

---

### O que Você PODE Fazer:
* Compartilhar links de nossos artigos em redes sociais, aplicativos de mensagens e fóruns.
* Citar pequenos trechos (de até 2 parágrafos) em seu blog ou trabalho acadêmico, **desde que insira atribuição explícita com link direto (do-follow)** para a página original no Ponto Financeiro.

---

### O que Você NÃO PODE Fazer:
* Copiar integralmente textos, artigos ou tutoriais (prática de scraping / plágio).
* Utilizar nossos conteúdos para alimentar bases de dados comerciais sem prévia autorização por escrito.
* Remover ou alterar marcas, nomes de autores e avisos de direitos autorais.

Para solicitações de republicação ou licenciamento editorial, entre em contato via nosso canal oficial.
`,
  },

  acessibilidade: {
    id: 'page-acessibilidade',
    title: 'Declaração de Acessibilidade Digital',
    slug: 'acessibilidade',
    updatedAt: new Date().toISOString(),
    content: `## Nosso Compromisso com a Inclusão

O **Ponto Financeiro** tem como princípio garantir que a educação financeira esteja ao alcance de todos os cidadãos, independentemente de suas capacidades visuais, motoras, auditivas ou cognitivas.

---

### Medidas Implementadas:

* **Contraste de Cores Apropriado:** Padrões de contraste que atendem às recomendações WCAG 2.1 (nível AA) para leitura confortável e sem fadiga visual.
* **Tipografia Legível:** Escala tipográfica generosa, com espaçamento entre linhas e largura de coluna calculada para máxima legibilidade.
* **Navegação por Teclado e Foco Visível:** Todos os botões, menus e links podem ser operados por teclado com realce claro do elemento ativo.
* **Textos Alternativos em Imagens (Alt Text):** Descrições precisas em imagens editoriais para leitores de tela.
* **Hierarquia Semântica Rigorosa:** Uso correto de tags de cabeçalho (H1, H2, H3) e pontos de referência (landmarks) HTML5.

Caso você encontre qualquer barreira de acessibilidade em nosso portal, por favor nos avise através da nossa página de contato para que possamos implementar melhorias imediatas.
`,
  },
};

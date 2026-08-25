import type { Config, Context } from '@netlify/functions';
import { GoogleGenAI } from '@google/genai';

// Editorial AI assistant for the CMS — ported from the original Express route.
// Uses Netlify AI Gateway, so no API key management is needed in production.

const SYSTEM_INSTRUCTION = `Você é o Assistente Editorial do portal 'Ponto Financeiro' (portal brasileiro de educação financeira para iniciantes).
Sua missão é ajudar o editor a planejar, estruturar e refinar artigos em português brasileiro com clareza, rigor pedagógico, transparência e respeito às diretrizes da CVM, Banco Central e E-E-A-T.
REGRAS:
1. NUNCA prometa ganhos garantidos ou 'fique rico rápido'.
2. NUNCA faça recomendações de compra personalizada de ativos.
3. Use linguagem simples, didática e acessível para iniciantes.
4. Identifique conceitos como CDI, Selic, IPCA, Tesouro Direto, CDB, etc. de forma prática.
5. Indique sempre a necessidade de fontes oficiais (Banco Central, CVM, Tesouro Nacional, B3).
6. Priorize respostas úteis, bem estruturadas em Markdown e prontas para uso editorial.`;

function buildPrompt(action: string, topic: string, currentText: string, category: string, keywords: string) {
  switch (action) {
    case 'suggest_topics':
      return `Gere 5 ideias de pautas quentes e altamente educativas sobre '${topic || 'educação financeira para iniciantes'}' para a categoria '${category || 'Geral'}'.
Para cada pauta, forneça:
- Título sugerido (atraente, sem clickbait)
- Objetivo pedagógico (o que o leitor vai aprender)
- Principais dúvidas que o artigo deve responder
- Fontes oficiais recomendadas`;
    case 'generate_outline':
      return `Crie a estrutura detalhada (outline) para um artigo com o título/tema: '${topic}'.
Inclua:
1. Título principal (H1)
2. Resumo executivo (Lead)
3. Estrutura de tópicos (H2 e H3)
4. Exemplos práticos do dia a dia do brasileiro (ex: compras, juros de cartão, rentabilidade de R$ 1.000)
5. Tabela comparativa ou caixa de destaque sugerida
6. Aviso financeiro e de risco adequado
7. Seção de Perguntas Frequentes (FAQ com 3 perguntas comuns)
8. Fontes e referências oficiais sugeridas`;
    case 'suggest_titles_and_seo':
      return `Para o tema '${topic}' com palavras-chave '${keywords || ''}', forneça:
1. 5 sugestões de títulos clicáveis e honestos (sem promessas falsas de riqueza)
2. Meta description otimizada (máximo 155 caracteres) com gatilho claro de utilidade
3. Palavra-chave principal e 4 palavras-chave secundárias de cauda longa
4. Sugestão de slug amigável (ex: o-que-e-cdi)`;
    case 'review_clarity_and_compliance':
      return `Analise o seguinte rascunho de artigo sobre '${topic || 'Finanças'}':
---
${currentText}
---
Forneça uma avaliação editorial completa:
1. Nível de clareza para um iniciante (1 a 10 e pontos de melhoria)
2. Conformidade e riscos regulatórios (existe alguma promessa indevida de retorno?)
3. Termos técnicos que precisam de explicação simplificada
4. Sugestões de links internos e fontes oficiais a citar
5. Sugestão de chamada para ação educativa`;
    case 'generate_faq':
      return `Para o tema de finanças '${topic}', crie 4 perguntas e respostas frequentes (FAQ) objetivas, claras e didáticas para iniciantes.`;
    default:
      return `Forneça orientações editoriais e sugestões práticas sobre o tema: ${topic}`;
  }
}

const FALLBACKS: Record<string, (topic: string) => string> = {
  suggest_topics: (topic) => `### 💡 Sugestões de Pautas para Iniciantes (${topic || 'Geral'})

1. **Como Começar a Investir com Menos de R$ 50 no Tesouro Direto**
2. **CDB com Liquidez Diária vs. Poupança: Qual a Diferença Real?**
3. **Guia Definitivo do Cartão de Crédito: 5 Regras para Não Pagar Juros**
4. **Reserva de Emergência: Onde Guardar e Quanto Guardar?**
5. **Inflação (IPCA) e Taxa Selic: Como Elas Afetam o Preço do Mercado e Seu Salário**`,
  generate_outline: (topic) => `### 📋 Estrutura Sugerida para o Artigo: ${topic}

#### 1. Introdução e Lead
#### 2. Conceito Fundamental (Explicado sem Jargões)
#### 3. Como Funciona na Prática (Passo a Passo)
#### 4. Vantagens, Riscos e Cuidados
#### 5. Perguntas Frequentes (FAQ)
#### 6. Conclusão e Próximos Passos`,
  suggest_titles_and_seo: (topic) => `### 🎯 Otimização de SEO e Títulos

**Títulos:** ${topic}: Guia Completo para Iniciantes Passo a Passo
**Meta description:** Descubra o que é ${topic}, como funciona na prática e as melhores dicas para iniciantes.
**Palavra-chave principal:** ${topic.toLowerCase()}`,
};

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  try {
    const { action, topic, currentText, category, keywords } = await req.json();

    if (!topic && !currentText) {
      return Response.json({ error: 'Tópico ou texto são necessários.' }, { status: 400 });
    }

    const prompt = buildPrompt(action, topic ?? '', currentText ?? '', category ?? '', keywords ?? '');

    try {
      const ai = new GoogleGenAI({});
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 },
      });

      const reply = response.text || 'Não foi possível gerar a resposta no momento.';
      return Response.json({ result: reply, source: 'gemini-3-flash-preview' });
    } catch (aiError) {
      console.error('AI Gateway call failed, using heuristic fallback:', aiError);
      const fallback = FALLBACKS[action]?.(topic ?? '') ?? FALLBACKS.suggest_topics(topic ?? '');
      return Response.json({
        result: fallback,
        source: 'heuristic-editorial-assistant',
        note: 'Não foi possível conectar ao provedor de IA neste momento; exibindo sugestões heurísticas.',
      });
    }
  } catch (err: any) {
    console.error('Erro no assistente de IA:', err);
    return Response.json({ error: err.message || 'Falha ao processar solicitação com o assistente editorial.' }, { status: 500 });
  }
};

export const config: Config = {
  path: '/api/ai/assistant',
};

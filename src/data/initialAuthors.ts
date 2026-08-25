import { Author } from '../types';

export const INITIAL_AUTHORS: Author[] = [
  {
    id: 'author-redacao-ponto-financeiro',
    name: 'Equipe Editorial Ponto Financeiro',
    slug: 'redacao-ponto-financeiro',
    role: 'Redação & Curadoria Educativa',
    bio: 'Equipe dedicada a traduzir conceitos econômicos e de investimentos em linguagem acessível, prática e transparente para quem está dando os primeiros passos no universo das finanças.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    email: '',
    socials: {
      website: 'https://pontofinanceiro.com.br',
    },
  },
  {
    id: 'author-editor-chefe',
    name: 'Redator Responsável',
    slug: 'redator-responsavel',
    role: 'Editor de Conteúdo de Finanças',
    bio: 'Pesquisador e redator focado em organização financeira pessoal, orçamento doméstico e produtos de renda fixa para pessoas iniciantes no mercado brasileiro.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    email: '',
    socials: {
      website: 'https://pontofinanceiro.com.br',
    },
  },
];

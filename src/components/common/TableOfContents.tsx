import React from 'react';
import { List, ChevronRight } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const headings = React.useMemo(() => {
    const lines = content.split('\n');
    const items: Array<{ id: string; text: string; level: number }> = [];

    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);

      if (h2Match) {
        const text = h2Match[1].replace(/[*_~`]/g, '').trim();
        const id = text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        items.push({ id, text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].replace(/[*_~`]/g, '').trim();
        const id = text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        items.push({ id, text, level: 3 });
      }
    });

    return items;
  }, [content]);

  if (headings.length < 2) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200 my-6">
      <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
        <List className="w-4 h-4 text-emerald-700" />
        <span>Neste Artigo (Sumário Rápido)</span>
      </div>

      <ul className="space-y-1.5 text-xs text-stone-700 list-none p-0 m-0">
        {headings.map((item, index) => (
          <li key={index} className={item.level === 3 ? 'pl-4' : 'pl-0'}>
            <button
              onClick={() => scrollToHeading(item.id)}
              className="hover:text-emerald-800 transition-colors text-left flex items-start gap-1.5 group cursor-pointer py-0.5"
            >
              <ChevronRight className="w-3 h-3 text-stone-400 group-hover:text-emerald-700 shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
              <span className="group-hover:underline">{item.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

import React from 'react';
import { AdSlot } from '../common/AdSlot';

interface ArticleContentRendererProps {
  content: string;
  navigate: (path: string) => void;
  showInArticleAd?: boolean;
}

export const ArticleContentRenderer: React.FC<ArticleContentRendererProps> = ({
  content,
  navigate,
  showInArticleAd = true,
}) => {
  // Parse markdown-like content cleanly into semantic components
  const blocks = React.useMemo(() => {
    const rawBlocks = content.split(/\n\n+/);
    return rawBlocks.filter((b) => b.trim().length > 0);
  }, [content]);

  // Insert in-article ad slot roughly in the middle (e.g. index 3 or 4)
  const adPositionIndex = Math.min(3, Math.max(1, Math.floor(blocks.length / 2)));

  const renderFormattedInlineText = (text: string) => {
    // Process markdown links [text](url), bold **text**, italic *text*, code `text`
    const elements: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    // Simple regex parser for markdown inlines
    const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      // Preceding plain text
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }

      if (match[2] && match[3]) {
        // Link [text](url)
        const linkText = match[2];
        const linkUrl = match[3];
        const isInternal = linkUrl.startsWith('/');

        if (isInternal) {
          elements.push(
            <button
              key={keyIdx++}
              onClick={() => navigate(linkUrl)}
              className="text-emerald-700 font-medium underline underline-offset-2 hover:text-emerald-900 cursor-pointer inline"
            >
              {linkText}
            </button>
          );
        } else {
          elements.push(
            <a
              key={keyIdx++}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-medium underline underline-offset-2 hover:text-emerald-900 inline"
            >
              {linkText}
            </a>
          );
        }
      } else if (match[4]) {
        // Bold **text**
        elements.push(<strong key={keyIdx++} className="font-bold text-stone-900">{match[4]}</strong>);
      } else if (match[5]) {
        // Italic *text*
        elements.push(<em key={keyIdx++} className="italic text-stone-800">{match[5]}</em>);
      } else if (match[6]) {
        // Code `text`
        elements.push(
          <code key={keyIdx++} className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-800 font-mono text-[13px]">
            {match[6]}
          </code>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements.length > 0 ? elements : text;
  };

  const renderBlock = (block: string, index: number) => {
    const trimmed = block.trim();

    // H2 Heading
    if (trimmed.startsWith('## ')) {
      const headingText = trimmed.replace(/^##\s+/, '').replace(/[*_]/g, '');
      const id = headingText
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      return (
        <h2
          id={id}
          key={index}
          className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mt-10 mb-4 pt-4 border-t border-stone-100 scroll-mt-24"
        >
          {renderFormattedInlineText(trimmed.replace(/^##\s+/, ''))}
        </h2>
      );
    }

    // H3 Heading
    if (trimmed.startsWith('### ')) {
      const headingText = trimmed.replace(/^###\s+/, '').replace(/[*_]/g, '');
      const id = headingText
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      return (
        <h3
          id={id}
          key={index}
          className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-8 mb-3 scroll-mt-24"
        >
          {renderFormattedInlineText(trimmed.replace(/^###\s+/, ''))}
        </h3>
      );
    }

    // H4 Heading
    if (trimmed.startsWith('#### ')) {
      return (
        <h4 key={index} className="font-serif text-lg font-bold text-stone-900 mt-6 mb-2">
          {renderFormattedInlineText(trimmed.replace(/^####\s+/, ''))}
        </h4>
      );
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteText = trimmed.replace(/^>\s+/, '');
      return (
        <blockquote
          key={index}
          className="p-4 sm:p-5 my-6 rounded-xl bg-emerald-50/70 border-l-4 border-emerald-600 text-stone-800 text-sm sm:text-base leading-relaxed italic"
        >
          {renderFormattedInlineText(quoteText)}
        </blockquote>
      );
    }

    // Markdown Table
    if (trimmed.includes('|') && trimmed.split('\n').length >= 2) {
      const lines = trimmed.split('\n').filter((l) => l.trim().length > 0);
      const headerLine = lines[0];
      const dataLines = lines.slice(2); // skip separator line

      const parseRow = (line: string) => {
        return line
          .split('|')
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
          .map((cell) => cell.trim());
      };

      const headers = parseRow(headerLine);

      return (
        <div key={index} className="my-8 overflow-x-auto rounded-xl border border-stone-200 shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-100 text-stone-900 border-b border-stone-200">
              <tr>
                {headers.map((h, hIdx) => (
                  <th key={hIdx} className="py-3 px-4 font-bold text-stone-800">
                    {renderFormattedInlineText(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {dataLines.map((rowLine, rIdx) => {
                const cells = parseRow(rowLine);
                return (
                  <tr key={rIdx} className="hover:bg-stone-50/80 transition-colors">
                    {cells.map((cell, cIdx) => (
                      <td key={cIdx} className="py-3 px-4 text-stone-700 leading-relaxed">
                        {renderFormattedInlineText(cell)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // Code block
    if (trimmed.startsWith('```')) {
      const codeContent = trimmed.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '');
      return (
        <pre key={index} className="my-6 p-4 rounded-xl bg-stone-900 text-stone-100 text-xs font-mono overflow-x-auto">
          <code>{codeContent}</code>
        </pre>
      );
    }

    // Unordered List
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').map((line) => line.replace(/^[\*\-]\s+/, '').trim());
      return (
        <ul key={index} className="my-4 space-y-2 list-none p-0 pl-1 text-sm sm:text-base text-stone-700 leading-relaxed">
          {items.map((item, iIdx) => (
            <li key={iIdx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2.5"></span>
              <span>{renderFormattedInlineText(item)}</span>
            </li>
          ))}
        </ul>
      );
    }

    // Ordered List (1. 2. 3.)
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split('\n').map((line) => line.replace(/^\d+\.\s+/, '').trim());
      return (
        <ol key={index} className="my-4 space-y-2 list-none p-0 text-sm sm:text-base text-stone-700 leading-relaxed">
          {items.map((item, iIdx) => (
            <li key={iIdx} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-stone-200">
                {iIdx + 1}
              </span>
              <span className="flex-1">{renderFormattedInlineText(item)}</span>
            </li>
          ))}
        </ol>
      );
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      return <hr key={index} className="my-8 border-stone-200" />;
    }

    // Standard Paragraph
    return (
      <p key={index} className="my-4 text-base sm:text-lg text-stone-800 leading-relaxed font-sans">
        {renderFormattedInlineText(trimmed)}
      </p>
    );
  };

  return (
    <div className="article-body font-sans text-stone-800 leading-relaxed">
      {blocks.map((block, idx) => (
        <React.Fragment key={idx}>
          {renderBlock(block, idx)}
          {showInArticleAd && idx === adPositionIndex && (
            <AdSlot position="inArticle" slotId="slot-article-mid" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

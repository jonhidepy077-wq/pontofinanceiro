import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check, MessageSquare, Twitter, Facebook } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`${title}\n\nLeia este artigo educativo no Ponto Financeiro: ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(`${title} via @pontofinanceiro`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-4 border-y border-stone-200 my-6">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 mr-2">
        <Share2 className="w-4 h-4 text-emerald-700" />
        <span>Compartilhar este guia:</span>
      </div>

      <button
        onClick={shareWhatsApp}
        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        aria-label="Compartilhar no WhatsApp"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </button>

      <button
        onClick={shareTwitter}
        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        aria-label="Compartilhar no Twitter / X"
      >
        <Twitter className="w-3.5 h-3.5" />
        <span>X / Twitter</span>
      </button>

      <button
        onClick={shareFacebook}
        className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        aria-label="Compartilhar no Facebook"
      >
        <Facebook className="w-3.5 h-3.5" />
        <span>Facebook</span>
      </button>

      <button
        onClick={handleCopyLink}
        className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
          copied 
            ? 'bg-emerald-50 border-emerald-500 text-emerald-800' 
            : 'bg-white border-stone-300 hover:bg-stone-50 text-stone-700'
        }`}
        aria-label="Copiar link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <LinkIcon className="w-3.5 h-3.5" />}
        <span>{copied ? 'Link copiado!' : 'Copiar link'}</span>
      </button>
    </div>
  );
};

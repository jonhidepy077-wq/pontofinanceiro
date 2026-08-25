import React from 'react';
import { useData } from '../../context/DataContext';

interface AdSlotProps {
  position: 'header' | 'inArticle' | 'sidebar' | 'footer' | 'inList';
  slotId?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ position, slotId, className = '' }) => {
  const { settings } = useData();
  const ads = settings.adsConfig;

  // Check if ads are globally enabled and enabled for this position
  if (!ads || !ads.enabled) return null;

  const isPositionEnabled = 
    (position === 'header' && ads.headerAd) ||
    (position === 'inArticle' && ads.inArticleAd) ||
    (position === 'sidebar' && ads.sidebarAd) ||
    (position === 'footer' && ads.footerAd) ||
    (position === 'inList' && ads.inListAd);

  if (!isPositionEnabled) return null;

  const heightClasses = {
    header: 'min-h-[90px] max-h-[100px]',
    inArticle: 'min-h-[120px] max-h-[250px]',
    sidebar: 'min-h-[250px] max-h-[600px]',
    footer: 'min-h-[100px] max-h-[150px]',
    inList: 'min-h-[100px] max-h-[140px]',
  }[position];

  return (
    <div
      aria-label="Espaço publicitário"
      className={`my-6 mx-auto w-full max-w-4xl rounded-xl border border-dashed border-stone-300 bg-stone-50/80 p-3 text-center transition-all ${className}`}
    >
      <div className="flex items-center justify-between px-2 pb-1.5 border-b border-stone-200/60 mb-2">
        <span className="text-[10px] font-semibold tracking-wider text-stone-600 uppercase">
          Publicidade
        </span>
        <span className="text-[10px] text-stone-600">
          Espaço reservado para Google AdSense
        </span>
      </div>

      <div className={`flex flex-col items-center justify-center ${heightClasses} text-stone-600 text-xs px-4 py-3`}>
        {ads.adSensePublisherId ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="font-mono text-[11px] text-stone-600">
              [AdSense Slot: {slotId || position} | Pub: {ads.adSensePublisherId}]
            </span>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="font-medium text-stone-600">Espaço de Anúncio Responsivo</div>
            <div className="text-[11px] text-stone-600">
              Formato compatível com as diretrizes de qualidade do Google AdSense
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

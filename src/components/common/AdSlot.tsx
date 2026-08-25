import React, { useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';

interface AdSlotProps {
  position: 'header' | 'inArticle' | 'sidebar' | 'footer' | 'inList';
  slotId?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export const AdSlot: React.FC<AdSlotProps> = ({
  position,
  slotId,
  className = '',
}) => {
  const { settings } = useData();
  const ads = settings.adsConfig;
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!ads?.enabled || !adRef.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Erro ao carregar Google AdSense:', error);
    }
  }, [ads?.enabled, slotId]);

  if (!ads || !ads.enabled) return null;

  const isPositionEnabled =
    (position === 'header' && ads.headerAd) ||
    (position === 'inArticle' && ads.inArticleAd) ||
    (position === 'sidebar' && ads.sidebarAd) ||
    (position === 'footer' && ads.footerAd) ||
    (position === 'inList' && ads.inListAd);

  if (!isPositionEnabled) return null;

  const heightClasses = {
    header: 'min-h-[90px]',
    inArticle: 'min-h-[120px]',
    sidebar: 'min-h-[250px]',
    footer: 'min-h-[100px]',
    inList: 'min-h-[100px]',
  }[position];

  return (
    <div
      aria-label="Publicidade"
      className={`my-6 mx-auto w-full ${className}`}
    >
      <div
        className={`flex items-center justify-center ${heightClasses}`}
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            minHeight:
              position === 'sidebar'
                ? '250px'
                : position === 'inArticle'
                ? '120px'
                : '90px',
          }}
          data-ad-client="ca-pub-7946949899642195"
          data-ad-slot="2101771888"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { useData } from '../../context/DataContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    authorName?: string;
    section?: string;
    tags?: string[];
  };
  noIndex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  canonicalPath = '',
  ogImage,
  ogType = 'website',
  articleData,
  noIndex = false,
}) => {
  const { settings } = useData();

  const fullTitle = title 
    ? `${title} | ${settings.siteName || 'Ponto Financeiro'}`
    : `${settings.siteName || 'Ponto Financeiro'} - ${settings.siteTagline || 'Educação Financeira para Iniciantes'}`;

  const metaDesc = description || settings.siteDescription || 'Portal de educação financeira para iniciantes.';
  const defaultImage = ogImage || 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80';
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://pontofinanceiro.com.br';
  const fullUrl = `${baseUrl}${canonicalPath}`;

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update Standard Meta
    setMetaTag('name', 'description', metaDesc);
    if (keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    }
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Update Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDesc);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:image', defaultImage);
    setMetaTag('property', 'og:site_name', settings.siteName || 'Ponto Financeiro');
    setMetaTag('property', 'og:locale', 'pt_BR');

    // Update Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDesc);
    setMetaTag('name', 'twitter:image', defaultImage);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // Schema.org Structured Data
    const schemaId = 'schema-structured-data';
    let schemaScript = document.getElementById(schemaId);
    if (schemaScript) {
      schemaScript.remove();
    }

    schemaScript = document.createElement('script');
    schemaScript.id = schemaId;
    schemaScript.setAttribute('type', 'application/ld+json');

    let schemaContent: any;

    if (ogType === 'article' && articleData) {
      schemaContent = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: metaDesc,
        image: [defaultImage],
        datePublished: articleData.publishedTime || new Date().toISOString(),
        dateModified: articleData.modifiedTime || articleData.publishedTime || new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: articleData.authorName || settings.responsibleName || 'Equipe Ponto Financeiro',
        },
        publisher: {
          '@type': 'Organization',
          name: settings.siteName || 'Ponto Financeiro',
          logo: {
            '@type': 'ImageObject',
            url: settings.logoUrl || defaultImage,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl,
        },
        articleSection: articleData.section,
        keywords: articleData.tags?.join(', '),
      };
    } else {
      schemaContent = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: settings.siteName || 'Ponto Financeiro',
        url: baseUrl,
        description: settings.siteDescription,
        publisher: {
          '@type': 'Organization',
          name: settings.siteName || 'Ponto Financeiro',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'São Paulo',
            addressRegion: 'SP',
            addressCountry: 'BR',
          },
          telephone: settings.contactPhone || '11961139395',
        },
      };
    }

    schemaScript.textContent = JSON.stringify(schemaContent);
    document.head.appendChild(schemaScript);

    return () => {
      // clean up schema on unmount
      const s = document.getElementById(schemaId);
      if (s) s.remove();
    };
  }, [fullTitle, metaDesc, defaultImage, fullUrl, ogType, noIndex, articleData, keywords, settings]);

  return null;
};

export type ArticleStatus = 'published' | 'draft' | 'scheduled';

export type FinancialDisclaimerType = 
  | 'none' 
  | 'general' 
  | 'fixed_income' 
  | 'variable_income' 
  | 'credit_debt';

export interface ArticleSource {
  name: string;
  url?: string;
  dateVerified?: string;
  note?: string;
}

export interface ArticleLink {
  text: string;
  url: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string; // Markdown / rich block string
  slug: string;
  coverImage: string;
  coverImageAlt: string;
  socialImage?: string;
  category: string; // Category slug
  subCategory?: string;
  tags: string[];
  authorId: string;
  status: ArticleStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  publishedAt?: string; // ISO string
  scheduledFor?: string; // ISO string
  isFeatured: boolean;
  isRecommended: boolean;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  excerpt: string;
  readingTimeMinutes: number;
  disclaimerType: FinancialDisclaimerType;
  sources: ArticleSource[];
  internalLinks?: ArticleLink[];
  externalLinks?: ArticleLink[];
  canonicalUrl?: string;
  viewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  iconName?: string;
  color?: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: string;
  email?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}

export interface SitePage {
  id: string;
  title: string;
  slug: string;
  content: string;
  updatedAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

export type Page = SitePage;

export interface AdsConfig {
  enabled: boolean;
  headerAd: boolean;
  inArticleAd: boolean;
  sidebarAd: boolean;
  footerAd: boolean;
  inListAd: boolean;
  autoAdsEnabled?: boolean;
  adSensePublisherId?: string;
  adSlotTop?: string;
  adSlotArticle?: string;
  adSlotSidebar?: string;
  adSlotFooter?: string;
  customAdScript?: string;
}

export interface CookieSettings {
  bannerTitle: string;
  bannerText: string;
  privacyPolicyUrl: string;
  cookiePolicyUrl: string;
  acceptAllButtonText?: string;
  rejectNonEssentialButtonText?: string;
  customizeButtonText?: string;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  logoUrl?: string;
  faviconUrl?: string;
  contactPhone: string;
  contactCity: string;
  contactEmail: string;
  responsibleName: string;
  responsibleBio: string;
  responsibleAvatar?: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    telegram?: string;
    twitter?: string;
  };
  adsConfig: AdsConfig;
  cookieSettings: CookieSettings;
  analyticsId?: string;
  searchConsoleVerification?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  subscribedAt?: string;
  source: string;
  status?: string;
  consentGiven: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  alt: string;
  createdAt: string;
  category?: string;
}

export interface CookieConsentPreferences {
  necessary: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  hasInteracted: boolean;
}

export interface AuditCheckItem {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'editorial' | 'legal' | 'seo';
  passed: boolean;
  actionUrl?: string;
}

export type AdminTab = 
  | 'dashboard'
  | 'articles'
  | 'editor'
  | 'new-article'
  | 'categories'
  | 'authors'
  | 'pages'
  | 'media'
  | 'ai-assistant'
  | 'quality'
  | 'subscribers'
  | 'messages'
  | 'ads'
  | 'cookies'
  | 'settings'
  | 'database'
  | 'backup';

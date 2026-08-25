import { pgTable, text, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";

// Mirrors src/types.ts. JSON-shaped fields (tags, sources, socials, adsConfig, etc.)
// are stored as jsonb rather than normalized into separate tables, since the app
// treats them as opaque structured blobs edited as a whole in the CMS admin UI.

export const articles = pgTable("articles", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").default(""),
  content: text("content").notNull().default(""),
  slug: text("slug").notNull().unique(),
  coverImage: text("cover_image").notNull(),
  coverImageAlt: text("cover_image_alt").notNull().default(""),
  socialImage: text("social_image"),
  category: text("category").notNull(),
  subCategory: text("sub_category").default(""),
  tags: jsonb("tags").notNull().default([]),
  authorId: text("author_id").notNull(),
  status: text("status").notNull().default("draft"), // published | draft | scheduled
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  publishedAt: timestamp("published_at"),
  scheduledFor: timestamp("scheduled_for"),
  isFeatured: boolean("is_featured").notNull().default(false),
  isRecommended: boolean("is_recommended").notNull().default(false),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
  primaryKeyword: text("primary_keyword").notNull().default(""),
  secondaryKeywords: jsonb("secondary_keywords").notNull().default([]),
  excerpt: text("excerpt").notNull().default(""),
  readingTimeMinutes: integer("reading_time_minutes").notNull().default(1),
  disclaimerType: text("disclaimer_type").notNull().default("general"),
  sources: jsonb("sources").notNull().default([]),
  internalLinks: jsonb("internal_links").default([]),
  externalLinks: jsonb("external_links").default([]),
  canonicalUrl: text("canonical_url"),
  viewCount: integer("view_count").notNull().default(0),
});

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  icon: text("icon"),
  iconName: text("icon_name"),
  color: text("color").default("emerald"),
});

export const authors = pgTable("authors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  role: text("role").notNull().default(""),
  bio: text("bio").notNull().default(""),
  avatar: text("avatar").notNull().default(""),
  email: text("email"),
  socials: jsonb("socials"),
});

export const pages = pgTable("pages", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull().default(""),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
});

export const settings = pgTable("settings", {
  // Singleton row, id is always 'default'.
  id: text("id").primaryKey().default("default"),
  siteName: text("site_name").notNull().default("Ponto Financeiro"),
  siteTagline: text("site_tagline").notNull().default(""),
  siteDescription: text("site_description").notNull().default(""),
  logoUrl: text("logo_url"),
  faviconUrl: text("favicon_url"),
  contactPhone: text("contact_phone").notNull().default(""),
  contactCity: text("contact_city").notNull().default(""),
  contactEmail: text("contact_email").notNull().default(""),
  responsibleName: text("responsible_name").notNull().default(""),
  responsibleBio: text("responsible_bio").notNull().default(""),
  responsibleAvatar: text("responsible_avatar"),
  socialLinks: jsonb("social_links").notNull().default({}),
  adsConfig: jsonb("ads_config").notNull().default({}),
  cookieSettings: jsonb("cookie_settings").notNull().default({}),
  analyticsId: text("analytics_id"),
  searchConsoleVerification: text("search_console_verification"),
});

export const subscribers = pgTable("subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  subscribedAt: timestamp("subscribed_at"),
  source: text("source").notNull().default("newsletter-box"),
  status: text("status"),
  consentGiven: boolean("consent_given").notNull().default(true),
});

export const contactMessages = pgTable("contact_messages", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull().default(""),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: text("status").notNull().default("unread"), // unread | read | replied
});

export const mediaItems = pgTable("media_items", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  alt: text("alt").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  category: text("category"),
});

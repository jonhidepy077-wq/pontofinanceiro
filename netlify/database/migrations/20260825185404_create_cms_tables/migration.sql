CREATE TABLE "articles" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"subtitle" text DEFAULT '',
	"content" text DEFAULT '' NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"cover_image" text NOT NULL,
	"cover_image_alt" text DEFAULT '' NOT NULL,
	"social_image" text,
	"category" text NOT NULL,
	"sub_category" text DEFAULT '',
	"tags" jsonb DEFAULT '[]' NOT NULL,
	"author_id" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp,
	"scheduled_for" timestamp,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_recommended" boolean DEFAULT false NOT NULL,
	"meta_title" text DEFAULT '' NOT NULL,
	"meta_description" text DEFAULT '' NOT NULL,
	"primary_keyword" text DEFAULT '' NOT NULL,
	"secondary_keywords" jsonb DEFAULT '[]' NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"reading_time_minutes" integer DEFAULT 1 NOT NULL,
	"disclaimer_type" text DEFAULT 'general' NOT NULL,
	"sources" jsonb DEFAULT '[]' NOT NULL,
	"internal_links" jsonb DEFAULT '[]',
	"external_links" jsonb DEFAULT '[]',
	"canonical_url" text,
	"view_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "authors" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"role" text DEFAULT '' NOT NULL,
	"bio" text DEFAULT '' NOT NULL,
	"avatar" text DEFAULT '' NOT NULL,
	"email" text,
	"socials" jsonb
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"description" text DEFAULT '' NOT NULL,
	"icon" text,
	"icon_name" text,
	"color" text DEFAULT 'emerald'
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"subject" text DEFAULT '' NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'unread' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_items" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"category" text
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" text PRIMARY KEY,
	"slug" text NOT NULL UNIQUE,
	"title" text NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"meta_title" text,
	"meta_description" text
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" text PRIMARY KEY DEFAULT 'default',
	"site_name" text DEFAULT 'Ponto Financeiro' NOT NULL,
	"site_tagline" text DEFAULT '' NOT NULL,
	"site_description" text DEFAULT '' NOT NULL,
	"logo_url" text,
	"favicon_url" text,
	"contact_phone" text DEFAULT '' NOT NULL,
	"contact_city" text DEFAULT '' NOT NULL,
	"contact_email" text DEFAULT '' NOT NULL,
	"responsible_name" text DEFAULT '' NOT NULL,
	"responsible_bio" text DEFAULT '' NOT NULL,
	"responsible_avatar" text,
	"social_links" jsonb DEFAULT '{}' NOT NULL,
	"ads_config" jsonb DEFAULT '{}' NOT NULL,
	"cookie_settings" jsonb DEFAULT '{}' NOT NULL,
	"analytics_id" text,
	"search_console_verification" text
);
--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" text PRIMARY KEY,
	"email" text NOT NULL UNIQUE,
	"name" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"subscribed_at" timestamp,
	"source" text DEFAULT 'newsletter-box' NOT NULL,
	"status" text,
	"consent_given" boolean DEFAULT true NOT NULL
);

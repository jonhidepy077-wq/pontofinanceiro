import type { Config, Context } from '@netlify/functions';
import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import {
  articles,
  categories,
  authors,
  pages,
  settings,
  subscribers,
  contactMessages,
  mediaItems,
} from '../../db/schema.js';
import { INITIAL_ARTICLES } from '../../src/data/initialArticles.js';
import { INITIAL_CATEGORIES } from '../../src/data/initialCategories.js';
import { INITIAL_AUTHORS } from '../../src/data/initialAuthors.js';
import { INITIAL_PAGES } from '../../src/data/initialPages.js';
import { INITIAL_SETTINGS } from '../../src/data/initialSettings.js';

// Resources are stored as rows, but the app models timestamps as ISO strings
// and a couple of jsonb blobs as opaque objects — these helpers translate
// between the Postgres row shape and the shape the client already expects.

const TABLES: Record<string, any> = {
  articles,
  categories,
  authors,
  pages,
  subscribers,
  'contact-messages': contactMessages,
  media: mediaItems,
};

function toDate(v: unknown) {
  return v ? new Date(v as string) : null;
}

function rowFromArticle(a: any) {
  return {
    ...a,
    createdAt: toDate(a.createdAt) ?? new Date(),
    updatedAt: toDate(a.updatedAt) ?? new Date(),
    publishedAt: toDate(a.publishedAt),
    scheduledFor: toDate(a.scheduledFor),
  };
}

function articleFromRow(r: any) {
  return {
    ...r,
    createdAt: r.createdAt?.toISOString?.() ?? r.createdAt,
    updatedAt: r.updatedAt?.toISOString?.() ?? r.updatedAt,
    publishedAt: r.publishedAt?.toISOString?.() ?? r.publishedAt ?? undefined,
    scheduledFor: r.scheduledFor?.toISOString?.() ?? r.scheduledFor ?? undefined,
  };
}

function rowFromTimestamped(item: any, field = 'createdAt') {
  return { ...item, [field]: toDate(item[field]) ?? new Date() };
}

function timestampedFromRow(row: any, fields: string[]) {
  const out = { ...row };
  for (const f of fields) {
    out[f] = row[f]?.toISOString?.() ?? row[f] ?? undefined;
  }
  return out;
}

async function seedIfEmpty() {
  const [existingArticles, existingCategories, existingAuthors, existingSettings] = await Promise.all([
    db.select().from(articles).limit(1),
    db.select().from(categories).limit(1),
    db.select().from(authors).limit(1),
    db.select().from(settings).limit(1),
  ]);

  if (existingArticles.length === 0 && INITIAL_ARTICLES.length) {
    await db.insert(articles).values(INITIAL_ARTICLES.map((a: any) => rowFromArticle(a)));
  }
  if (existingCategories.length === 0 && INITIAL_CATEGORIES.length) {
    await db.insert(categories).values(INITIAL_CATEGORIES as any);
  }
  if (existingAuthors.length === 0 && INITIAL_AUTHORS.length) {
    await db.insert(authors).values(INITIAL_AUTHORS as any);
  }
  if (existingSettings.length === 0) {
    await db.insert(settings).values({ id: 'default', ...INITIAL_SETTINGS } as any);
  }
  const existingPages = await db.select().from(pages).limit(1);
  if (existingPages.length === 0) {
    const pageRows = Object.values(INITIAL_PAGES as Record<string, any>).map((p) => rowFromTimestamped(p, 'updatedAt'));
    if (pageRows.length) await db.insert(pages).values(pageRows as any);
  }
}

export default async (req: Request, context: Context) => {
  const resource = context.params.resource;
  const id = context.params.id;

  if (resource === 'all') {
    await seedIfEmpty();
    const [art, cat, auth, pg, set, sub, msg, media] = await Promise.all([
      db.select().from(articles),
      db.select().from(categories),
      db.select().from(authors),
      db.select().from(pages),
      db.select().from(settings).where(eq(settings.id, 'default')),
      db.select().from(subscribers),
      db.select().from(contactMessages),
      db.select().from(mediaItems),
    ]);

    const pagesRecord: Record<string, any> = {};
    for (const p of pg) pagesRecord[p.slug] = timestampedFromRow(p, ['updatedAt']);

    return Response.json({
      articles: art.map(articleFromRow),
      categories: cat,
      authors: auth,
      pages: pagesRecord,
      settings: set[0] ?? INITIAL_SETTINGS,
      subscribers: sub.map((s) => timestampedFromRow(s, ['createdAt', 'subscribedAt'])),
      contactMessages: msg.map((m) => timestampedFromRow(m, ['createdAt'])),
      mediaItems: media.map((m) => timestampedFromRow(m, ['createdAt'])),
    });
  }

  if (resource === 'settings') {
    if (req.method === 'PUT') {
      const updates = await req.json();
      const [row] = await db
        .update(settings)
        .set(updates)
        .where(eq(settings.id, 'default'))
        .returning();
      return Response.json(row);
    }
    return new Response('Method not allowed', { status: 405 });
  }

  if (resource === 'pages') {
    if (req.method === 'PUT' && id) {
      const updates = await req.json();
      const existing = await db.select().from(pages).where(eq(pages.slug, id));
      if (existing.length === 0) {
        const [row] = await db
          .insert(pages)
          .values({ id: `page-${id}`, slug: id, title: updates.title || id, content: updates.content || '', ...updates })
          .returning();
        return Response.json(timestampedFromRow(row, ['updatedAt']));
      }
      const [row] = await db
        .update(pages)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(pages.slug, id))
        .returning();
      return Response.json(timestampedFromRow(row, ['updatedAt']));
    }
    return new Response('Method not allowed', { status: 405 });
  }

  const table = TABLES[resource as string];
  if (!table) return new Response('Unknown resource', { status: 404 });

  if (req.method === 'POST') {
    const body = await req.json();
    const value = resource === 'articles' ? rowFromArticle(body) : rowFromTimestamped(body);
    const [row] = await db.insert(table).values(value).returning();
    return Response.json(resource === 'articles' ? articleFromRow(row) : row, { status: 201 });
  }

  if (req.method === 'PUT' && id) {
    const updates = await req.json();
    const value = resource === 'articles' ? rowFromArticle({ ...updates }) : updates;
    // Only set fields that were actually provided.
    const setValue: Record<string, any> = {};
    for (const key of Object.keys(updates)) setValue[key] = (value as any)[key];
    const [row] = await db.update(table).set(setValue).where(eq(table.id, id)).returning();
    if (!row) return new Response('Not found', { status: 404 });
    return Response.json(resource === 'articles' ? articleFromRow(row) : row);
  }

  if (req.method === 'DELETE' && id) {
    await db.delete(table).where(eq(table.id, id));
    return new Response(null, { status: 204 });
  }

  return new Response('Method not allowed', { status: 405 });
};

export const config: Config = {
  path: ['/api/cms/:resource', '/api/cms/:resource/:id'],
};

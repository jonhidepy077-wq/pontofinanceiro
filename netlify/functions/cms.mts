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

/**
 * ============================================================
 * TABELAS
 * ============================================================
 */

const TABLES: Record<string, any> = {
  articles,
  categories,
  authors,
  pages,
  subscribers,
  'contact-messages': contactMessages,
  media: mediaItems,
};

/**
 * ============================================================
 * HELPERS DE DATA
 * ============================================================
 */

function toDate(value: unknown): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return value;
  }

  const date = new Date(value as string);

  return Number.isNaN(date.getTime()) ? null : date;
}

function isoOrUndefined(value: unknown): string | undefined {
  if (!value) return undefined;

  if (value instanceof Date) {
    return value.toISOString();
  }

  const date = new Date(value as string);

  return Number.isNaN(date.getTime())
    ? undefined
    : date.toISOString();
}

/**
 * ============================================================
 * ARTICLES
 * ============================================================
 */

function articleToDatabase(article: any) {
  const now = new Date();

  return {
    ...article,

    createdAt:
      toDate(article.createdAt) ?? now,

    updatedAt:
      toDate(article.updatedAt) ?? now,

    publishedAt:
      toDate(article.publishedAt),

    scheduledFor:
      toDate(article.scheduledFor),
  };
}

function articleFromDatabase(article: any) {
  return {
    ...article,

    createdAt:
      isoOrUndefined(article.createdAt) ??
      new Date().toISOString(),

    updatedAt:
      isoOrUndefined(article.updatedAt) ??
      new Date().toISOString(),

    publishedAt:
      isoOrUndefined(article.publishedAt),

    scheduledFor:
      isoOrUndefined(article.scheduledFor),
  };
}

/**
 * IMPORTANTE:
 * Em um PUT parcial de artigo, só convertemos os campos
 * de data que realmente foram enviados.
 *
 * Isso evita que um simples update de título altere
 * createdAt/publishedAt/scheduledFor sem necessidade.
 */
function articleUpdatesToDatabase(updates: any) {
  const result: Record<string, any> = {
    ...updates,
  };

  if ('createdAt' in updates) {
    result.createdAt =
      toDate(updates.createdAt);
  }

  if ('updatedAt' in updates) {
    result.updatedAt =
      toDate(updates.updatedAt);
  }

  if ('publishedAt' in updates) {
    result.publishedAt =
      toDate(updates.publishedAt);
  }

  if ('scheduledFor' in updates) {
    result.scheduledFor =
      toDate(updates.scheduledFor);
  }

  return result;
}

/**
 * ============================================================
 * GENERIC TIMESTAMP HELPERS
 * ============================================================
 */

function resourceToDatabase(
  resource: string,
  item: any
) {
  const result = {
    ...item,
  };

  if (
    resource === 'subscribers' ||
    resource === 'contact-messages' ||
    resource === 'media'
  ) {
    if ('createdAt' in result) {
      result.createdAt =
        toDate(result.createdAt) ?? new Date();
    }
  }

  if (resource === 'subscribers') {
    if ('subscribedAt' in result) {
      result.subscribedAt =
        toDate(result.subscribedAt);
    }
  }

  if (resource === 'pages') {
    if ('updatedAt' in result) {
      result.updatedAt =
        toDate(result.updatedAt) ?? new Date();
    }
  }

  return result;
}

function resourceFromDatabase(
  resource: string,
  item: any
) {
  const result = {
    ...item,
  };

  if (
    resource === 'subscribers' ||
    resource === 'contact-messages' ||
    resource === 'media'
  ) {
    if ('createdAt' in result) {
      result.createdAt =
        isoOrUndefined(result.createdAt);
    }
  }

  if (resource === 'subscribers') {
    if ('subscribedAt' in result) {
      result.subscribedAt =
        isoOrUndefined(result.subscribedAt);
    }
  }

  if (resource === 'pages') {
    if ('updatedAt' in result) {
      result.updatedAt =
        isoOrUndefined(result.updatedAt);
    }
  }

  return result;
}

/**
 * ============================================================
 * SEED INICIAL
 * ============================================================
 */

async function seedIfEmpty() {
  const [
    existingArticles,
    existingCategories,
    existingAuthors,
    existingSettings,
    existingPages,
  ] = await Promise.all([
    db.select().from(articles).limit(1),
    db.select().from(categories).limit(1),
    db.select().from(authors).limit(1),
    db.select().from(settings).limit(1),
    db.select().from(pages).limit(1),
  ]);

  /**
   * ARTICLES
   */
  if (
    existingArticles.length === 0 &&
    INITIAL_ARTICLES.length > 0
  ) {
    await db
      .insert(articles)
      .values(
        INITIAL_ARTICLES.map((article: any) =>
          articleToDatabase(article)
        )
      );
  }

  /**
   * CATEGORIES
   */
  if (
    existingCategories.length === 0 &&
    INITIAL_CATEGORIES.length > 0
  ) {
    await db
      .insert(categories)
      .values(
        INITIAL_CATEGORIES as any
      );
  }

  /**
   * AUTHORS
   */
  if (
    existingAuthors.length === 0 &&
    INITIAL_AUTHORS.length > 0
  ) {
    await db
      .insert(authors)
      .values(
        INITIAL_AUTHORS as any
      );
  }

  /**
   * SETTINGS
   */
  if (existingSettings.length === 0) {
    await db
      .insert(settings)
      .values({
        id: 'default',
        ...INITIAL_SETTINGS,
      } as any);
  }

  /**
   * PAGES
   */
  if (
    existingPages.length === 0 &&
    Object.keys(INITIAL_PAGES).length > 0
  ) {
    const pageRows = Object.values(
      INITIAL_PAGES as Record<string, any>
    ).map((page) =>
      resourceToDatabase('pages', page)
    );

    await db
      .insert(pages)
      .values(pageRows as any);
  }
}

/**
 * ============================================================
 * HANDLER PRINCIPAL
 * ============================================================
 */

export default async (
  req: Request,
  context: Context
) => {
  try {
    const resource =
      context.params.resource;

    const id =
      context.params.id;

    /**
     * ========================================================
     * /api/cms/all
     * ========================================================
     */

    if (resource === 'all') {
      await seedIfEmpty();

      const [
        articleRows,
        categoryRows,
        authorRows,
        pageRows,
        settingsRows,
        subscriberRows,
        messageRows,
        mediaRows,
      ] = await Promise.all([
        db.select().from(articles),

        db.select().from(categories),

        db.select().from(authors),

        db.select().from(pages),

        db
          .select()
          .from(settings)
          .where(
            eq(settings.id, 'default')
          ),

        db.select().from(subscribers),

        db.select().from(contactMessages),

        db.select().from(mediaItems),
      ]);

      /**
       * Converte páginas para:
       *
       * {
       *   "slug-da-pagina": {...}
       * }
       */

      const pagesRecord: Record<
        string,
        any
      > = {};

      for (const page of pageRows) {
        pagesRecord[page.slug] =
          resourceFromDatabase(
            'pages',
            page
          );
      }

      return Response.json({
        articles:
          articleRows.map(
            articleFromDatabase
          ),

        categories:
          categoryRows,

        authors:
          authorRows,

        pages:
          pagesRecord,

        settings:
          settingsRows[0] ??
          INITIAL_SETTINGS,

        subscribers:
          subscriberRows.map(
            (subscriber) =>
              resourceFromDatabase(
                'subscribers',
                subscriber
              )
          ),

        contactMessages:
          messageRows.map(
            (message) =>
              resourceFromDatabase(
                'contact-messages',
                message
              )
          ),

        mediaItems:
          mediaRows.map(
            (media) =>
              resourceFromDatabase(
                'media',
                media
              )
          ),
      });
    }

    /**
     * ========================================================
     * SETTINGS
     * ========================================================
     */

    if (resource === 'settings') {
      if (req.method !== 'PUT') {
        return new Response(
          'Method not allowed',
          { status: 405 }
        );
      }

      const updates =
        await req.json();

      /**
       * Nunca permite que o cliente altere
       * o ID principal das configurações.
       */
      delete updates.id;

      const [row] =
        await db
          .update(settings)
          .set(updates)
          .where(
            eq(settings.id, 'default')
          )
          .returning();

      if (!row) {
        return new Response(
          'Settings not found',
          { status: 404 }
        );
      }

      return Response.json(row);
    }

    /**
     * ========================================================
     * PAGES
     * ========================================================
     */

    if (resource === 'pages') {
      if (
        req.method !== 'PUT' ||
        !id
      ) {
        return new Response(
          'Method not allowed',
          { status: 405 }
        );
      }

      const updates =
        await req.json();

      /**
       * O slug vem da URL.
       * Não deixamos o body sobrescrever.
       */
      delete updates.id;

      delete updates.slug;

      const existing =
        await db
          .select()
          .from(pages)
          .where(
            eq(pages.slug, id)
          );

      if (existing.length === 0) {
        const now = new Date();

        const [row] =
          await db
            .insert(pages)
            .values({
              id: `page-${id}`,
              slug: id,
              title:
                updates.title || id,
              content:
                updates.content || '',
              ...updates,
              slug: id,
              updatedAt: now,
            } as any)
            .returning();

        return Response.json(
          resourceFromDatabase(
            'pages',
            row
          ),
          { status: 201 }
        );
      }

      const [row] =
        await db
          .update(pages)
          .set({
            ...updates,
            updatedAt: new Date(),
          })
          .where(
            eq(pages.slug, id)
          )
          .returning();

      if (!row) {
        return new Response(
          'Page not found',
          { status: 404 }
        );
      }

      return Response.json(
        resourceFromDatabase(
          'pages',
          row
        )
      );
    }

    /**
     * ========================================================
     * RESOURCE NORMAL
     * ========================================================
     */

    const table =
      TABLES[resource as string];

    if (!table) {
      return new Response(
        'Unknown resource',
        { status: 404 }
      );
    }

    /**
     * ========================================================
     * POST
     * ========================================================
     */

    if (req.method === 'POST') {
      const body =
        await req.json();

      let value;

      if (resource === 'articles') {
        value =
          articleToDatabase(body);
      } else {
        value =
          resourceToDatabase(
            resource,
            body
          );
      }

      const [row] =
        await db
          .insert(table)
          .values(value)
          .returning();

      if (resource === 'articles') {
        return Response.json(
          articleFromDatabase(row),
          { status: 201 }
        );
      }

      return Response.json(
        resourceFromDatabase(
          resource,
          row
        ),
        { status: 201 }
      );
    }

    /**
     * ========================================================
     * PUT
     * ========================================================
     */

    if (
      req.method === 'PUT' &&
      id
    ) {
      const updates =
        await req.json();

      let databaseUpdates;

      /**
       * ARTIGOS
       *
       * Aqui está uma das principais correções.
       * Não usamos articleToDatabase()
       * porque o PUT é parcial.
       */
      if (resource === 'articles') {
        databaseUpdates =
          articleUpdatesToDatabase(
            updates
          );
      } else {
        databaseUpdates =
          resourceToDatabase(
            resource,
            updates
          );
      }

      /**
       * Não permitimos que um PUT altere
       * o ID do registro.
       */
      delete databaseUpdates.id;

      /**
       * Para artigos, categorias, autores,
       * mensagens etc., o ID vem da URL.
       */
      const [row] =
        await db
          .update(table)
          .set(databaseUpdates)
          .where(
            eq(table.id, id)
          )
          .returning();

      if (!row) {
        return new Response(
          'Not found',
          { status: 404 }
        );
      }

      if (resource === 'articles') {
        return Response.json(
          articleFromDatabase(row)
        );
      }

      return Response.json(
        resourceFromDatabase(
          resource,
          row
        )
      );
    }

    /**
     * ========================================================
     * DELETE
     * ========================================================
     */

    if (
      req.method === 'DELETE' &&
      id
    ) {
      const result =
        await db
          .delete(table)
          .where(
            eq(table.id, id)
          )
          .returning();

      if (result.length === 0) {
        return new Response(
          'Not found',
          { status: 404 }
        );
      }

      return new Response(
        null,
        { status: 204 }
      );
    }

    /**
     * ========================================================
     * MÉTODO NÃO SUPORTADO
     * ========================================================
     */

    return new Response(
      'Method not allowed',
      { status: 405 }
    );

  } catch (error) {
    console.error(
      'CMS API error:',
      error
    );

    return Response.json(
      {
        error:
          'Erro interno na API do CMS.',
      },
      { status: 500 }
    );
  }
};

/**
 * ============================================================
 * NETLIFY CONFIG
 * ============================================================
 */

export const config: Config = {
  path: [
    '/api/cms/:resource',
    '/api/cms/:resource/:id',
  ],
};

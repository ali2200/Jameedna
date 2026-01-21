import {
  users, articles, contacts, quotes, settings, products,
  type User, type InsertUser,
  type Article, type InsertArticle,
  type Contact, type InsertContact,
  type Quote, type InsertQuote,
  type Setting,
  type Product, type InsertProduct
} from "../shared/schema";
import { db } from "./db";
import { eq, desc, like, sql, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  getAllUsers(): Promise<User[]>;

  getArticle(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, data: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;
  getAllArticles(options?: { search?: string; status?: string; page?: number; limit?: number }): Promise<{ articles: Article[]; total: number }>;
  getPublishedArticles(): Promise<Article[]>;
  getScheduledArticlesDue(): Promise<Article[]>;
  incrementArticleViews(id: number): Promise<void>;

  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  markContactAsRead(id: number): Promise<boolean>;
  deleteContact(id: number): Promise<boolean>;
  getAllContacts(): Promise<Contact[]>;
  getUnreadContactsCount(): Promise<number>;

  getQuote(id: number): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  markQuoteAsRead(id: number): Promise<boolean>;
  deleteQuote(id: number): Promise<boolean>;
  getAllQuotes(): Promise<Quote[]>;
  getUnreadQuotesCount(): Promise<number>;

  getSetting(key: string): Promise<string | undefined>;
  setSetting(key: string, value: string): Promise<void>;
  getAllSettings(): Promise<Setting[]>;

  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  getAllProducts(): Promise<Product[]>;
  getActiveProducts(): Promise<Product[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const [updated] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return updated || undefined;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return true;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users).orderBy(desc(users.createdAt));
  }

  async getArticle(id: number): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article || undefined;
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.slug, slug));
    return article || undefined;
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const [newArticle] = await db.insert(articles).values(article).returning();
    return newArticle;
  }

  async updateArticle(id: number, data: Partial<InsertArticle>): Promise<Article | undefined> {
    const [updated] = await db
      .update(articles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteArticle(id: number): Promise<boolean> {
    await db.delete(articles).where(eq(articles.id, id));
    return true;
  }

  async getAllArticles(options?: { search?: string; status?: string; page?: number; limit?: number }): Promise<{ articles: Article[]; total: number }> {
    const { search, status, page = 1, limit = 10 } = options || {};
    const offset = (page - 1) * limit;

    let whereClause;
    if (search && status) {
      whereClause = and(like(articles.title, `%${search}%`), eq(articles.status, status));
    } else if (search) {
      whereClause = like(articles.title, `%${search}%`);
    } else if (status) {
      whereClause = eq(articles.status, status);
    }

    const [totalResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(articles)
      .where(whereClause);

    const articlesList = await db
      .select()
      .from(articles)
      .where(whereClause)
      .orderBy(desc(articles.createdAt))
      .limit(limit)
      .offset(offset);

    return { articles: articlesList, total: Number(totalResult?.count || 0) };
  }

  async getPublishedArticles(): Promise<Article[]> {
    return db
      .select()
      .from(articles)
      .where(eq(articles.status, "published"))
      .orderBy(desc(articles.publishedAt));
  }

  async getScheduledArticlesDue(): Promise<Article[]> {
    const now = new Date();
    return db
      .select()
      .from(articles)
      .where(
        and(
          eq(articles.status, "scheduled"),
          sql`${articles.scheduledAt} <= ${now}`
        )
      );
  }

  async incrementArticleViews(id: number): Promise<void> {
    await db
      .update(articles)
      .set({ viewCount: sql`${articles.viewCount} + 1` })
      .where(eq(articles.id, id));
  }

  async getContact(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact || undefined;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async markContactAsRead(id: number): Promise<boolean> {
    await db.update(contacts).set({ isRead: true }).where(eq(contacts.id, id));
    return true;
  }

  async deleteContact(id: number): Promise<boolean> {
    await db.delete(contacts).where(eq(contacts.id, id));
    return true;
  }

  async getAllContacts(): Promise<Contact[]> {
    return db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async getUnreadContactsCount(): Promise<number> {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(contacts)
      .where(eq(contacts.isRead, false));
    return Number(result?.count || 0);
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));
    return quote || undefined;
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const [newQuote] = await db.insert(quotes).values(quote).returning();
    return newQuote;
  }

  async markQuoteAsRead(id: number): Promise<boolean> {
    await db.update(quotes).set({ isRead: true }).where(eq(quotes.id, id));
    return true;
  }

  async deleteQuote(id: number): Promise<boolean> {
    await db.delete(quotes).where(eq(quotes.id, id));
    return true;
  }

  async getAllQuotes(): Promise<Quote[]> {
    return db.select().from(quotes).orderBy(desc(quotes.createdAt));
  }

  async getUnreadQuotesCount(): Promise<number> {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(quotes)
      .where(eq(quotes.isRead, false));
    return Number(result?.count || 0);
  }

  async getSetting(key: string): Promise<string | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting?.value || undefined;
  }

  async setSetting(key: string, value: string): Promise<void> {
    await db
      .insert(settings)
      .values({ key, value, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: settings.key,
        set: { value, updatedAt: new Date() },
      });
  }

  async getAllSettings(): Promise<Setting[]> {
    return db.select().from(settings);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteProduct(id: number): Promise<boolean> {
    await db.delete(products).where(eq(products.id, id));
    return true;
  }

  async getAllProducts(): Promise<Product[]> {
    return db.select().from(products).orderBy(products.sortOrder);
  }

  async getActiveProducts(): Promise<Product[]> {
    return db
      .select()
      .from(products)
      .where(eq(products.isActive, true))
      .orderBy(products.sortOrder);
  }
}

export const storage = new DatabaseStorage();

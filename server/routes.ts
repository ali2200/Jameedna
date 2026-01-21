import { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";
import * as cheerio from "cheerio";
import { storage } from "./storage";
import { insertContactSchema, insertQuoteSchema, insertArticleSchema, insertProductSchema } from "../shared/schema";

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = "./public/uploads";
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "غير مصرح" });
  }
  const user = await storage.getUser(req.session.userId);
  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: "غير مسموح" });
  }
  next();
};

export function registerRoutes(app: Express) {
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "البريد الإلكتروني وكلمة المرور مطلوبان" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "بيانات الدخول غير صحيحة" });
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({ message: "بيانات الدخول غير صحيحة" });
      }

      req.session.userId = user.id;
      
      res.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "حدث خطأ في النظام" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "فشل تسجيل الخروج" });
      }
      res.json({ message: "تم تسجيل الخروج بنجاح" });
    });
  });

  app.get("/api/auth/user", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "غير مسجل" });
    }
    
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "المستخدم غير موجود" });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      },
    });
  });

  app.get("/api/admin/stats", requireAuth, async (req, res) => {
    try {
      const { articles, total: totalArticles } = await storage.getAllArticles();
      const publishedArticles = articles.filter(a => a.status === "published").length;
      const contacts = await storage.getAllContacts();
      const unreadContacts = await storage.getUnreadContactsCount();
      const quotes = await storage.getAllQuotes();
      const unreadQuotes = await storage.getUnreadQuotesCount();
      const users = await storage.getAllUsers();

      res.json({
        totalArticles,
        publishedArticles,
        totalContacts: contacts.length,
        unreadContacts,
        totalQuotes: quotes.length,
        unreadQuotes,
        totalUsers: users.length,
      });
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.get("/api/admin/articles", requireAuth, async (req, res) => {
    try {
      const { search, status, page = "1", limit = "10" } = req.query;
      const result = await storage.getAllArticles({
        search: search as string,
        status: status as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      });
      res.json(result);
    } catch (error) {
      console.error("Articles error:", error);
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.get("/api/admin/articles/:id", requireAuth, async (req, res) => {
    try {
      const article = await storage.getArticle(parseInt(req.params.id));
      if (!article) {
        return res.status(404).json({ message: "المقال غير موجود" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.post("/api/admin/articles", requireAuth, upload.single("coverImage"), async (req, res) => {
    try {
      const data = req.body;
      
      if (!data.title || !data.slug) {
        return res.status(400).json({ message: "العنوان والرابط مطلوبان" });
      }

      const existing = await storage.getArticleBySlug(data.slug);
      if (existing) {
        return res.status(400).json({ message: "هذا الرابط مستخدم بالفعل" });
      }

      const coverImage = req.file ? `/uploads/${req.file.filename}` : data.coverImage;

      const article = await storage.createArticle({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content || null,
        coverImage: coverImage || null,
        author: data.author || "فريق الفرسان",
        status: data.status || "draft",
        tags: data.tags || null,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || null,
        focusKeyword: data.focusKeyword || null,
        canonicalUrl: data.canonicalUrl || null,
        ogTitle: data.ogTitle || null,
        ogDescription: data.ogDescription || null,
        ogImage: data.ogImage || null,
        robotsDirective: data.robotsDirective || null,
        readingTime: data.readingTime || null,
        publishedAt: data.status === "published" ? new Date() : null,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
      });

      res.status(201).json(article);
    } catch (error) {
      console.error("Create article error:", error);
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.put("/api/admin/articles/:id", requireAuth, upload.single("coverImage"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;

      const existing = await storage.getArticle(id);
      if (!existing) {
        return res.status(404).json({ message: "المقال غير موجود" });
      }

      if (data.slug && data.slug !== existing.slug) {
        const slugExists = await storage.getArticleBySlug(data.slug);
        if (slugExists) {
          return res.status(400).json({ message: "هذا الرابط مستخدم بالفعل" });
        }
      }

      const coverImage = req.file ? `/uploads/${req.file.filename}` : data.coverImage;

      const updateData: any = {};
      if (data.title !== undefined) updateData.title = data.title;
      if (data.slug !== undefined) updateData.slug = data.slug;
      if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
      if (data.content !== undefined) updateData.content = data.content;
      if (coverImage !== undefined) updateData.coverImage = coverImage;
      if (data.author !== undefined) updateData.author = data.author;
      if (data.status !== undefined) {
        updateData.status = data.status;
        if (data.status === "published" && !existing.publishedAt) {
          updateData.publishedAt = new Date();
        }
      }
      if (data.tags !== undefined) updateData.tags = data.tags;
      if (data.metaTitle !== undefined) updateData.metaTitle = data.metaTitle;
      if (data.metaDescription !== undefined) updateData.metaDescription = data.metaDescription;
      if (data.metaKeywords !== undefined) updateData.metaKeywords = data.metaKeywords;
      if (data.focusKeyword !== undefined) updateData.focusKeyword = data.focusKeyword;
      if (data.canonicalUrl !== undefined) updateData.canonicalUrl = data.canonicalUrl;
      if (data.ogTitle !== undefined) updateData.ogTitle = data.ogTitle;
      if (data.ogDescription !== undefined) updateData.ogDescription = data.ogDescription;
      if (data.ogImage !== undefined) updateData.ogImage = data.ogImage;
      if (data.robotsDirective !== undefined) updateData.robotsDirective = data.robotsDirective;
      if (data.readingTime !== undefined) updateData.readingTime = data.readingTime;
      if (data.scheduledAt !== undefined) updateData.scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : null;

      const article = await storage.updateArticle(id, updateData);
      res.json(article);
    } catch (error) {
      console.error("Update article error:", error);
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.delete("/api/admin/articles/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteArticle(parseInt(req.params.id));
      res.json({ message: "تم حذف المقال" });
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.post("/api/admin/upload", requireAuth, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "لم يتم رفع ملف" });
      }
      res.json({ url: `/uploads/${req.file.filename}` });
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ في رفع الملف" });
    }
  });

  app.get("/api/admin/contacts", requireAuth, async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.patch("/api/admin/contacts/:id/read", requireAuth, async (req, res) => {
    try {
      await storage.markContactAsRead(parseInt(req.params.id));
      res.json({ message: "تم التحديد كمقروءة" });
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.delete("/api/admin/contacts/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteContact(parseInt(req.params.id));
      res.json({ message: "تم حذف الرسالة" });
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.get("/api/admin/quotes", requireAuth, async (req, res) => {
    try {
      const quotes = await storage.getAllQuotes();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.patch("/api/admin/quotes/:id/read", requireAuth, async (req, res) => {
    try {
      await storage.markQuoteAsRead(parseInt(req.params.id));
      res.json({ message: "تم التحديد كمقروء" });
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.delete("/api/admin/quotes/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteQuote(parseInt(req.params.id));
      res.json({ message: "تم حذف الطلب" });
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.get("/api/admin/users", requireAuth, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users.map(u => ({
        id: u.id,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        isAdmin: u.isAdmin,
        createdAt: u.createdAt,
      })));
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.post("/api/admin/users", requireAuth, async (req, res) => {
    try {
      const { email, password, firstName, lastName, isAdmin } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "البريد الإلكتروني وكلمة المرور مطلوبان" });
      }

      const existing = await storage.getUserByEmail(email);
      if (existing) {
        return res.status(400).json({ message: "البريد الإلكتروني مستخدم بالفعل" });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        email,
        passwordHash,
        firstName: firstName || null,
        lastName: lastName || null,
        isAdmin: isAdmin ?? true,
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } catch (error) {
      console.error("Create user error:", error);
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.patch("/api/admin/users/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { email, password, firstName, lastName, isAdmin } = req.body;

      const updateData: any = {};
      if (email) updateData.email = email;
      if (password) updateData.passwordHash = await bcrypt.hash(password, 10);
      if (firstName !== undefined) updateData.firstName = firstName;
      if (lastName !== undefined) updateData.lastName = lastName;
      if (isAdmin !== undefined) updateData.isAdmin = isAdmin;

      const user = await storage.updateUser(id, updateData);
      if (!user) {
        return res.status(404).json({ message: "المستخدم غير موجود" });
      }

      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.delete("/api/admin/users/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (id === req.session.userId) {
        return res.status(400).json({ message: "لا يمكنك حذف حسابك" });
      }
      await storage.deleteUser(id);
      res.json({ message: "تم حذف المستخدم" });
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.get("/api/admin/settings", requireAuth, async (req, res) => {
    try {
      const settings = await storage.getAllSettings();
      const settingsObj: Record<string, string> = {};
      settings.forEach(s => {
        if (s.value) settingsObj[s.key] = s.value;
      });
      res.json(settingsObj);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.put("/api/admin/settings", requireAuth, async (req, res) => {
    try {
      const { notificationEmail } = req.body;
      if (notificationEmail !== undefined) {
        await storage.setSetting("notificationEmail", notificationEmail);
      }
      res.json({ message: "تم حفظ الإعدادات" });
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "البيانات غير صحيحة" });
      }
      const contact = await storage.createContact(result.data);
      res.status(201).json({ message: "تم إرسال الرسالة بنجاح" });
    } catch (error) {
      console.error("Create contact error:", error);
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.post("/api/quotes", async (req, res) => {
    try {
      const result = insertQuoteSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "البيانات غير صحيحة" });
      }
      const quote = await storage.createQuote(result.data);
      res.status(201).json({ message: "تم إرسال طلب عرض السعر بنجاح" });
    } catch (error) {
      console.error("Create quote error:", error);
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getPublishedArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await storage.getArticleBySlug(req.params.slug);
      if (!article || article.status !== "published") {
        return res.status(404).json({ message: "المقال غير موجود" });
      }
      await storage.incrementArticleViews(article.id);
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.post("/api/admin/setup", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      if (users.length > 0) {
        return res.status(400).json({ message: "النظام مُعد مسبقاً" });
      }

      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "البريد الإلكتروني وكلمة المرور مطلوبان" });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        email,
        passwordHash,
        firstName: "Admin",
        lastName: "User",
        isAdmin: true,
      });

      req.session.userId = user.id;

      res.status(201).json({
        message: "تم إنشاء حساب الأدمن بنجاح",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
        },
      });
    } catch (error) {
      console.error("Setup error:", error);
      res.status(500).json({ message: "حدث خطأ في إعداد النظام" });
    }
  });

  app.get("/api/admin/setup/check", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json({ isSetup: users.length > 0 });
    } catch (error) {
      res.json({ isSetup: false });
    }
  });

  const htmlUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "text/html" || file.originalname.endsWith(".html") || file.originalname.endsWith(".htm")) {
        cb(null, true);
      } else {
        cb(new Error("يجب أن يكون الملف HTML"));
      }
    },
  });

  app.post("/api/admin/import-html", requireAuth, htmlUpload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "لم يتم رفع ملف" });
      }

      const htmlContent = req.file.buffer.toString("utf-8");
      const $ = cheerio.load(htmlContent);

      $("script, style, noscript, object, embed, iframe").remove();
      $("nav, .sidebar, .comments, .share-buttons, .ads, form, header, footer").remove();

      const title = $("h1").first().text() || $("title").text() || "";
      const metaTitle = $("title").text() || title;
      const metaDescription = $('meta[name="description"]').attr("content") || "";
      const metaKeywords = $('meta[name="keywords"]').attr("content") || "";
      const ogTitle = $('meta[property="og:title"]').attr("content") || "";
      const ogDescription = $('meta[property="og:description"]').attr("content") || "";
      const ogImage = $('meta[property="og:image"]').attr("content") || "";
      const canonicalUrl = $('link[rel="canonical"]').attr("href") || "";
      const robotsDirective = $('meta[name="robots"]').attr("content") || "index,follow";

      const contentSelectors = ["article", "main", ".content", ".article-content", ".post-content", ".entry-content", "#content", "body"];
      let content = "";
      
      for (const selector of contentSelectors) {
        const element = $(selector);
        if (element.length && element.html()?.trim()) {
          content = element.html()?.trim() || "";
          break;
        }
      }

      if (!content) {
        content = $("body").html()?.trim() || htmlContent;
      }

      const text = $("body").text().replace(/\s+/g, " ").trim();
      const words = text.split(/\s+/);
      const excerpt = words.slice(0, 50).join(" ") + (words.length > 50 ? "..." : "");
      
      const wordCount = words.length;
      const readingTime = `${Math.ceil(wordCount / 200)} دقيقة`;

      const wordFrequency: Record<string, number> = {};
      const arabicWords = text.match(/[\u0600-\u06FF]+/g) || [];
      arabicWords.forEach((word) => {
        if (word.length > 3) {
          wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
      });
      const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]);
      const focusKeyword = sortedWords[0]?.[0] || "";

      res.json({
        title,
        metaTitle,
        content,
        excerpt,
        metaDescription,
        metaKeywords,
        ogTitle,
        ogDescription,
        ogImage,
        canonicalUrl,
        robotsDirective,
        readingTime,
        focusKeyword,
      });
    } catch (error) {
      console.error("HTML import error:", error);
      res.status(500).json({ message: "حدث خطأ في استيراد الملف" });
    }
  });

  // Products Admin API
  app.get("/api/admin/products", requireAuth, async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Get products error:", error);
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.get("/api/admin/products/:id", requireAuth, async (req, res) => {
    try {
      const product = await storage.getProduct(parseInt(req.params.id));
      if (!product) {
        return res.status(404).json({ message: "المنتج غير موجود" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.post("/api/admin/products", requireAuth, upload.single("image"), async (req, res) => {
    try {
      const data = req.body;
      
      if (!data.nameAr || !data.nameEn || !data.slug) {
        return res.status(400).json({ message: "اسم المنتج والرابط مطلوبان" });
      }

      const existing = await storage.getProductBySlug(data.slug);
      if (existing) {
        return res.status(400).json({ message: "هذا الرابط مستخدم بالفعل" });
      }

      const image = req.file ? `/uploads/${req.file.filename}` : data.image;

      const product = await storage.createProduct({
        slug: data.slug,
        nameAr: data.nameAr,
        nameEn: data.nameEn,
        descriptionAr: data.descriptionAr || null,
        descriptionEn: data.descriptionEn || null,
        ingredientsAr: data.ingredientsAr || null,
        ingredientsEn: data.ingredientsEn || null,
        featuresAr: data.featuresAr || null,
        featuresEn: data.featuresEn || null,
        sizesAr: data.sizesAr || null,
        sizesEn: data.sizesEn || null,
        certificates: data.certificates || null,
        image: image || null,
        gradientFrom: data.gradientFrom || null,
        gradientTo: data.gradientTo || null,
        isActive: data.isActive !== "false",
        sortOrder: parseInt(data.sortOrder) || 0,
      });

      res.status(201).json(product);
    } catch (error) {
      console.error("Create product error:", error);
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.put("/api/admin/products/:id", requireAuth, upload.single("image"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;

      const existing = await storage.getProduct(id);
      if (!existing) {
        return res.status(404).json({ message: "المنتج غير موجود" });
      }

      if (data.slug && data.slug !== existing.slug) {
        const slugExists = await storage.getProductBySlug(data.slug);
        if (slugExists) {
          return res.status(400).json({ message: "هذا الرابط مستخدم بالفعل" });
        }
      }

      const image = req.file ? `/uploads/${req.file.filename}` : data.image;

      const updateData: any = {};
      if (data.slug !== undefined) updateData.slug = data.slug;
      if (data.nameAr !== undefined) updateData.nameAr = data.nameAr;
      if (data.nameEn !== undefined) updateData.nameEn = data.nameEn;
      if (data.descriptionAr !== undefined) updateData.descriptionAr = data.descriptionAr;
      if (data.descriptionEn !== undefined) updateData.descriptionEn = data.descriptionEn;
      if (data.ingredientsAr !== undefined) updateData.ingredientsAr = data.ingredientsAr;
      if (data.ingredientsEn !== undefined) updateData.ingredientsEn = data.ingredientsEn;
      if (data.featuresAr !== undefined) updateData.featuresAr = data.featuresAr;
      if (data.featuresEn !== undefined) updateData.featuresEn = data.featuresEn;
      if (data.sizesAr !== undefined) updateData.sizesAr = data.sizesAr;
      if (data.sizesEn !== undefined) updateData.sizesEn = data.sizesEn;
      if (data.certificates !== undefined) updateData.certificates = data.certificates;
      if (image !== undefined) updateData.image = image;
      if (data.gradientFrom !== undefined) updateData.gradientFrom = data.gradientFrom;
      if (data.gradientTo !== undefined) updateData.gradientTo = data.gradientTo;
      if (data.isActive !== undefined) updateData.isActive = data.isActive === "true" || data.isActive === true;
      if (data.sortOrder !== undefined) updateData.sortOrder = parseInt(data.sortOrder) || 0;

      const product = await storage.updateProduct(id, updateData);
      res.json(product);
    } catch (error) {
      console.error("Update product error:", error);
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.delete("/api/admin/products/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteProduct(parseInt(req.params.id));
      res.json({ message: "تم حذف المنتج" });
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  // Public Products API
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getActiveProducts();
      res.json(products);
    } catch (error) {
      console.error("Get products error:", error);
      res.status(500).json({ message: "حدث خطأ" });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product || !product.isActive) {
        return res.status(404).json({ message: "المنتج غير موجود" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "حدث خطأ" });
    }
  });
}

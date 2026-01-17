import { storage } from "./storage";

let schedulerInterval: NodeJS.Timeout | null = null;

async function publishScheduledArticles() {
  try {
    const scheduledArticles = await storage.getScheduledArticlesDue();
    
    for (const article of scheduledArticles) {
      await storage.updateArticle(article.id, {
        status: "published",
        publishedAt: article.scheduledAt || new Date(),
      });
      console.log(`[Scheduler] Published article: ${article.title}`);
    }
    
    if (scheduledArticles.length > 0) {
      console.log(`[Scheduler] Published ${scheduledArticles.length} scheduled articles`);
    }
  } catch (error) {
    console.error("[Scheduler] Error publishing scheduled articles:", error);
  }
}

export function startScheduler() {
  if (schedulerInterval) {
    return;
  }
  
  console.log("[Scheduler] Started - checking for scheduled articles every minute");
  
  publishScheduledArticles();
  
  schedulerInterval = setInterval(publishScheduledArticles, 60 * 1000);
}

export function stopScheduler() {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
    console.log("[Scheduler] Stopped");
  }
}

import { fetchNews } from '@/services/newsApi';
import { getNewsFromCache, saveNewsToCache } from '@/services/cacheService';
import { NewsArticle, NewsCategory } from '@/types/news';

export async function getNewsWithCache(category?: NewsCategory, isOnline?: boolean): Promise<NewsArticle[]> {
  try {
    if (isOnline) {
      console.log("🌐 Online → Fetch news");
      const data = await fetchNews(category);
      await saveNewsToCache(data);
      return data;
    } else {
      console.log("📦 Offline → Load from cache");
      const cachedData = await getNewsFromCache();
      if (!cachedData) return [];
      if (category) {
        return cachedData.filter(item => item.category === category);
      }
      return cachedData;
    }
  } catch (error) {
    console.error("❌ getNewsWithCache error:", error);
    return [];
  }
}

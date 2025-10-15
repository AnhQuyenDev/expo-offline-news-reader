// newsApi.ts
import { NewsArticle, NewsCategory } from '@/types/news';
import NetInfo from '@react-native-community/netinfo';
import { getNewsFromCache } from './cacheService';

const API_KEY = '7d51a6b95dd04c82b24300f5bf004f10';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';
const COUNTRY = 'us';

function mapApiResponseToNewsArticles(articles: any[]): NewsArticle[] {
  return articles.map((item, index) => ({
    id: item.url ?? String(index), // phòng khi không có id thật
    title: item.title,
    summary: item.description ?? '',
    content: item.content ?? item.description ?? '',
    category: item.source?.name?.toLowerCase() || 'general',
    imageUrl: item.urlToImage || 'https://via.placeholder.com/300',
    author: item.author || 'Unknown',
    publishedAt: item.publishedAt || new Date().toISOString(),
  }));
}

export async function fetchNews(category?: NewsCategory): Promise<NewsArticle[]> {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.append('country', COUNTRY);
    url.searchParams.append('apiKey', API_KEY);
    if (category) url.searchParams.append('category', category);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);

    const data = await res.json();
    return mapApiResponseToNewsArticles(data.articles);
  } catch (error) {
    console.error('fetchNews error:', error);
    return [];
  }
}

export async function fetchNewsById(id: string) {
  try {
    const state = await NetInfo.fetch();
    const isOnline = state.isConnected;

    if (isOnline) {
      console.log("🌐 Fetch detail online");
      const allNews = await fetchNews();
      return allNews.find(a => a.id === id) || null;
    } else {
      console.log("📦 Load detail from cache");
      const cachedNews = await getNewsFromCache();
      if (!cachedNews) return null;
      return cachedNews.find(a => a.id === id) || null;
    }
  } catch (error) {
    console.error('❌ fetchNewsById error:', error);
    return null;
  }
}
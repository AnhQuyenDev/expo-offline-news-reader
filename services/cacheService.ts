import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsArticle } from '@/types/news';

const CACHE_KEY = '@news_cache';
const CACHE_TIMESTAMP_KEY = '@news_cache_timestamp';
const CACHE_DURATION = 1000 * 60 * 30;

export async function saveNewsToCache(news: NewsArticle[]): Promise<void> {
  try {
    const jsonValue = JSON.stringify(news);
    const timestamp = Date.now().toString();
    await AsyncStorage.multiSet([
      [CACHE_KEY, jsonValue],
      [CACHE_TIMESTAMP_KEY, timestamp],
    ]);
  } catch (error) {
    console.error('Error saving news to cache:', error);
  }
}

export async function getNewsFromCache(): Promise<NewsArticle[] | null> {
  try {
    const [[, jsonValue], [, timestamp]] = await AsyncStorage.multiGet([
      CACHE_KEY,
      CACHE_TIMESTAMP_KEY,
    ]);

    if (!jsonValue || !timestamp) {
      return null;
    }

    const cacheAge = Date.now() - parseInt(timestamp, 10);
    if (cacheAge > CACHE_DURATION) {
      return null;
    }

    const news = JSON.parse(jsonValue);
    return news;
  } catch (error) {
    console.error('Error getting news from cache:', error);
    return null;
  }
}

export async function clearNewsCache(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([CACHE_KEY, CACHE_TIMESTAMP_KEY]);
  } catch (error) {
    console.error('Error clearing news cache:', error);
  }
}

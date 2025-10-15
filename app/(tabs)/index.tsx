import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { WifiOff } from 'lucide-react-native';
import { NewsArticle, NewsCategory } from '@/types/news';
import { fetchNews } from '@/services/newsApi';
import { saveNewsToCache, getNewsFromCache } from '@/services/cacheService';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { NewsCard } from '@/components/NewsCard';
import { CategoryFilter } from '@/components/CategoryFilter';

export default function NewsScreen() {
  const router = useRouter();
  const { isOnline, isChecking } = useNetworkStatus();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNews = useCallback(async (refresh = false) => {
    try {
      if (refresh) setIsRefreshing(true);
      else setIsLoading(true);
      setError(null);

      if (isOnline) {
        const data = await fetchNews(selectedCategory || undefined);
        setNews(data);
        setFilteredNews(data);
        await saveNewsToCache(data);
      } else {
        const cachedData = await getNewsFromCache();
        if (cachedData) {
          const filtered = selectedCategory
            ? cachedData.filter(article => article.category === selectedCategory)
            : cachedData;
          setNews(cachedData);
          setFilteredNews(filtered);
        } else {
          setError('No cached news available. Please connect to the internet.');
        }
      }
    } catch (err) {
      setError('Failed to load news. Please try again.');
      console.error('Error loading news:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [isOnline, selectedCategory]);

  useEffect(() => {
    if (!isChecking) {
      loadNews();
    }
  }, [isChecking, loadNews]);

  useEffect(() => {
    if (news.length > 0) {
      const filtered = selectedCategory
        ? news.filter(article => article.category === selectedCategory)
        : news;
      setFilteredNews(filtered);
    }
  }, [selectedCategory, news]);

  const handleRefresh = () => {
    if (isOnline) {
      loadNews(true);
    }
  };

  const handleArticlePress = (article: NewsArticle) => {
    router.push({
      pathname: '/article/[id]',
      params: { id: article.id },
    });
  };

  if (isLoading && !isRefreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News</Text>
        {!isOnline && (
          <View style={styles.offlineBadge}>
            <WifiOff size={16} color="#FFFFFF" />
            <Text style={styles.offlineText}>Offline Mode</Text>
          </View>
        )}
      </View>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredNews}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <NewsCard article={item} onPress={() => handleArticlePress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              enabled={isOnline}
              tintColor="#007AFF"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No news articles available</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000000',
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  offlineText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingVertical: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});

export type NewsCategory = 'technology' | 'business' | 'sports' | 'entertainment' | 'health';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: NewsCategory;
  imageUrl: string;
  author: string;
  publishedAt: string;
}

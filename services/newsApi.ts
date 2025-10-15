import { NewsArticle, NewsCategory } from '@/types/news';

const MOCK_NEWS_DATA: NewsArticle[] = [
  {
    id: '1',
    title: 'Breakthrough in AI Technology Reshapes Industry',
    summary: 'New advances in artificial intelligence are transforming how businesses operate worldwide.',
    content: 'Artificial intelligence has reached a new milestone with the development of more efficient neural networks. Companies are now implementing these technologies to streamline operations and enhance customer experiences. The breakthrough promises to revolutionize multiple industries, from healthcare to finance, offering unprecedented capabilities in data analysis and decision-making processes.',
    category: 'technology',
    imageUrl: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',
    author: 'Sarah Chen',
    publishedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Global Markets Show Strong Recovery',
    summary: 'Stock markets worldwide experience significant growth as economic indicators improve.',
    content: 'Financial markets across the globe are showing signs of robust recovery, with major indices reaching new highs. Analysts attribute this growth to improved economic policies, increased consumer spending, and renewed investor confidence. The trend suggests a positive outlook for the coming quarters, with businesses expanding and employment rates rising steadily.',
    category: 'business',
    imageUrl: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg',
    author: 'Michael Johnson',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    title: 'Championship Finals Draw Record Viewership',
    summary: 'Sports fans worldwide tune in for the most-watched championship game in history.',
    content: 'The championship finals broke all previous viewership records, with millions of fans around the world watching the intense competition. The game featured outstanding performances from both teams, with dramatic plays that kept viewers on the edge of their seats until the final moments. This historic event marks a new era in sports broadcasting and fan engagement.',
    category: 'sports',
    imageUrl: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg',
    author: 'David Martinez',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '4',
    title: 'New Blockbuster Movie Breaks Box Office Records',
    summary: 'Latest film release shatters opening weekend expectations with unprecedented ticket sales.',
    content: 'The entertainment industry is celebrating as the latest blockbuster release has exceeded all projections, earning record-breaking revenues in its opening weekend. Critics and audiences alike praise the film\'s innovative storytelling and stunning visual effects. Theater owners report sold-out screenings across major cities, indicating strong sustained interest in the coming weeks.',
    category: 'entertainment',
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
    author: 'Emily Rodriguez',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: '5',
    title: 'Revolutionary Health Study Reveals New Benefits',
    summary: 'Medical researchers discover unexpected health advantages of daily exercise routines.',
    content: 'A comprehensive health study involving thousands of participants has uncovered new benefits of regular exercise that extend beyond physical fitness. Researchers found significant improvements in mental health, cognitive function, and overall well-being among those who maintained consistent exercise routines. The findings suggest that even moderate daily activity can have profound long-term health impacts.',
    category: 'health',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    author: 'Dr. Amanda Lee',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: '6',
    title: 'Tech Giants Announce Major Partnership',
    summary: 'Industry leaders join forces to develop next-generation computing platforms.',
    content: 'In a surprising move, several major technology companies have announced a collaborative effort to create revolutionary computing platforms. The partnership aims to address current limitations in processing power and energy efficiency. Industry experts believe this collaboration could accelerate innovation and bring significant advancements to consumers within the next few years.',
    category: 'technology',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    author: 'Robert Kim',
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
  },
  {
    id: '7',
    title: 'Startup Raises Record-Breaking Funding Round',
    summary: 'Young company secures massive investment to expand innovative services.',
    content: 'A promising startup has successfully closed a funding round that sets a new record for early-stage investments. The company, which focuses on sustainable technology solutions, attracted interest from major venture capital firms impressed by its rapid growth and market potential. The funds will be used to scale operations and expand into new markets globally.',
    category: 'business',
    imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    author: 'Jessica Taylor',
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
  },
  {
    id: '8',
    title: 'Olympic Athletes Prepare for Upcoming Games',
    summary: 'Top competitors from around the world intensify training for the international event.',
    content: 'Athletes representing dozens of countries are in the final stages of preparation for the upcoming Olympic Games. Training facilities worldwide are bustling with activity as competitors fine-tune their skills and strategies. Coaches report unprecedented levels of dedication and performance, suggesting that spectators can expect to witness remarkable achievements and possibly new world records.',
    category: 'sports',
    imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
    author: 'Chris Anderson',
    publishedAt: new Date(Date.now() - 25200000).toISOString(),
  },
];

export async function fetchNews(category?: NewsCategory): Promise<NewsArticle[]> {
  await new Promise(resolve => setTimeout(resolve, 800));

  if (category) {
    return MOCK_NEWS_DATA.filter(article => article.category === category);
  }

  return MOCK_NEWS_DATA;
}

export async function fetchNewsById(id: string): Promise<NewsArticle | null> {
  await new Promise(resolve => setTimeout(resolve, 400));

  const article = MOCK_NEWS_DATA.find(article => article.id === id);
  return article || null;
}

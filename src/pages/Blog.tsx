import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, ArrowRight, Search, Mail, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  coverImage: string | null;
  author: string | null;
  status: string;
  tags: string | null;
  readingTime: string | null;
  publishedAt: string | null;
  createdAt: string;
}

const Blog = () => {
  const { language, t, dir } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["public-articles"],
    queryFn: async () => {
      const response = await fetch("/api/articles");
      if (!response.ok) throw new Error("Failed to fetch articles");
      return response.json();
    },
  });

  useEffect(() => {
    document.title = language === 'ar'
      ? "أخبارنا ومقالاتنا - الفرسان الرباعية | Our News & Articles"
      : "Our News & Articles - Al-Fursan Al-Rubaiah | Latest Updates";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        language === 'ar'
          ? 'تابع آخر أخبار الفرسان الرباعية واكتشف المزيد عن عالم الجميد التقليدي والمعارض والفعاليات'
          : 'Follow the latest news from Al-Fursan Al-Rubaiah and discover more about traditional products, exhibitions and events'
      );
    }
  }, [language]);

  const categories = [
    { id: 'all', name: language === 'ar' ? 'جميع المقالات' : 'All Articles' },
    { id: 'company-news', name: language === 'ar' ? 'أخبار الشركة' : 'Company News' },
    { id: 'exhibitions', name: language === 'ar' ? 'معارض ومشاركات' : 'Exhibitions & Events' },
    { id: 'jameed-insights', name: language === 'ar' ? 'مقالات عن الجميد' : 'Jameed Insights' },
    { id: 'market-export', name: language === 'ar' ? 'السوق والتصدير' : 'Market & Export' }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleNewsletterSignup = () => {
    if (email) {
      console.log('Newsletter signup:', email);
      setEmail('');
    }
  };

  const parseTags = (tagsString: string | null): string[] => {
    if (!tagsString) return [];
    try {
      return JSON.parse(tagsString);
    } catch {
      return tagsString.split(',').map(t => t.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      
      <main className="pt-24">
        <section className="relative py-20 bg-gradient-hero">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90" />
          <div className="absolute inset-0 bg-[url('/src/assets/factory-exterior.jpg')] bg-cover bg-center opacity-20" />
          
          <div className="relative container-section">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('blog.hero.title')}
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                {t('blog.hero.description')}
              </p>
              <p className="text-lg opacity-80">
                {t('blog.hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        <div className="container-section py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">{t('blog.search')}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Search className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
                      <Input
                        placeholder={t('blog.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={dir === 'rtl' ? 'pr-10' : 'pl-10'}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">{t('blog.categories')}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full ${dir === 'rtl' ? 'text-right' : 'text-left'} px-3 py-2 rounded-lg transition-colors duration-200 ${
                            selectedCategory === category.id
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <h3 className="font-semibold text-primary">{t('blog.newsletter')}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t('blog.newsletterDesc')}
                    </p>
                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Button 
                        onClick={handleNewsletterSignup}
                        className="w-full"
                        size="sm"
                      >
                        <Mail className={`h-4 w-4 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                        {t('blog.subscribe')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>

            <div className="lg:w-3/4">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="h-48 w-full" />
                      <CardContent className="p-6 space-y-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-10 w-32" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden hover:shadow-card transition-shadow duration-300 group">
                      <div className="relative overflow-hidden">
                        <img 
                          src={article.coverImage || '/assets/images/factory-building.png'}
                          alt={article.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {parseTags(article.tags)[0] && (
                          <Badge 
                            className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} bg-primary/90 text-primary-foreground`}
                          >
                            {parseTags(article.tags)[0]}
                          </Badge>
                        )}
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4 rtl:space-x-reverse">
                          <div className="flex items-center">
                            <Calendar className={`h-4 w-4 ${dir === 'rtl' ? 'mr-1' : 'ml-1'}`} />
                            <span>
                              {new Date(article.publishedAt || article.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                            </span>
                          </div>
                          {article.author && (
                            <div className="flex items-center">
                              <User className={`h-4 w-4 ${dir === 'rtl' ? 'mr-1' : 'ml-1'}`} />
                              <span>{article.author}</span>
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                          {article.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {article.excerpt || ''}
                        </p>

                        {article.readingTime && (
                          <p className="text-xs text-muted-foreground mb-4">
                            {language === 'ar' ? `وقت القراءة: ${article.readingTime}` : `Reading time: ${article.readingTime}`}
                          </p>
                        )}
                        
                        <Link to={`/blog/${article.slug}`}>
                          <Button variant="outline" className="group/btn">
                            {t('common.readMore')}
                            <ArrowRight className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'} ${dir === 'rtl' ? 'rotate-180' : ''} group-hover/btn:translate-x-1 ${dir === 'rtl' ? 'group-hover/btn:-translate-x-1' : ''} transition-transform duration-200`} />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {!isLoading && filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    {language === 'ar' ? 'لا توجد مقالات منشورة حالياً' : 'No published articles at the moment'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {language === 'ar' ? 'تابعنا لأحدث الأخبار والمقالات' : 'Follow us for the latest news and articles'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

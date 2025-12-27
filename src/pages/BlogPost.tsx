import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Facebook, Twitter, Linkedin, Clock, Loader2 } from "lucide-react";
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

const BlogPost = () => {
  const { slug } = useParams();
  const { language, t, dir } = useLanguage();

  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: ["public-article", slug],
    queryFn: async () => {
      const response = await fetch(`/api/articles/${slug}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error("not_found");
        throw new Error("Failed to fetch article");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | ${language === 'ar' ? 'الفرسان الرباعية' : 'Al-Fursan Al-Rubaiah'}`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && article.excerpt) {
        metaDescription.setAttribute('content', article.excerpt);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [article, language]);

  const parseTags = (tagsString: string | null): string[] => {
    if (!tagsString) return [];
    try {
      return JSON.parse(tagsString);
    } catch {
      return tagsString.split(',').map(t => t.trim());
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background" dir={dir}>
        <Header />
        <main className="pt-24">
          <div className="h-96 bg-gradient-hero">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="container-section py-16">
            <div className="max-w-4xl mx-auto space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background" dir={dir}>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container-section">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'المقال غير موجود' : 'Article Not Found'}
              </h1>
              <p className="text-muted-foreground mb-8">
                {language === 'ar' ? 'عذراً، لم يتم العثور على المقال المطلوب' : 'Sorry, the requested article was not found'}
              </p>
              <Link to="/blog">
                <Button>{language === 'ar' ? 'العودة للمقالات' : 'Back to Articles'}</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = article.title;
  const tags = parseTags(article.tags);

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      
      <main className="pt-24">
        <article>
          <div className="relative h-96 bg-gradient-hero">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary-dark/70" />
            <img 
              src={article.coverImage || '/assets/images/factory-building.png'}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="container-section">
                <div className="max-w-4xl mx-auto text-white">
                  {tags[0] && (
                    <Badge className="mb-4 bg-white/20 text-white border-white/30">
                      {tags[0]}
                    </Badge>
                  )}
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {article.title}
                  </h1>
                  <div className="flex items-center text-white/90 space-x-6 rtl:space-x-reverse flex-wrap gap-4">
                    <div className="flex items-center">
                      <Calendar className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                      <span>
                        {new Date(article.publishedAt || article.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                      </span>
                    </div>
                    {article.author && (
                      <div className="flex items-center">
                        <User className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                        <span>{article.author}</span>
                      </div>
                    )}
                    {article.readingTime && (
                      <div className="flex items-center">
                        <Clock className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                        <span>{article.readingTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-section py-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-3/4">
                  <div className={`prose prose-lg max-w-none ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
                    <div 
                      dangerouslySetInnerHTML={{ __html: article.content || '' }}
                      className="article-content space-y-6"
                    />
                  </div>

                  {tags.length > 0 && (
                    <div className="mt-8 pt-8 border-t">
                      <h3 className="font-semibold mb-4">
                        {language === 'ar' ? 'العلامات:' : 'Tags:'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 pt-8 border-t">
                    <h3 className="font-semibold mb-4">
                      {language === 'ar' ? 'شارك المقال:' : 'Share Article:'}
                    </h3>
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}
                      >
                        <Facebook className={`h-4 w-4 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                        {language === 'ar' ? 'فيسبوك' : 'Facebook'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, '_blank')}
                      >
                        <Twitter className={`h-4 w-4 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                        {language === 'ar' ? 'تويتر' : 'Twitter'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}
                      >
                        <Linkedin className={`h-4 w-4 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                        {language === 'ar' ? 'لينكد إن' : 'LinkedIn'}
                      </Button>
                    </div>
                  </div>
                </div>

                <aside className="lg:w-1/4">
                  <div className="sticky top-8 space-y-6">
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-6 text-center">
                        <h3 className="font-semibold text-primary mb-3">
                          {language === 'ar' ? 'المزيد من المقالات' : 'More Articles'}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {language === 'ar' ? 'تصفح المزيد من مقالاتنا وأخبارنا' : 'Browse more of our articles and news'}
                        </p>
                        <Link to="/blog">
                          <Button variant="outline" className="w-full">
                            {language === 'ar' ? 'جميع المقالات' : 'All Articles'}
                            <ArrowRight className={`h-4 w-4 ${dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;

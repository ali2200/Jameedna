import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import factoryImage from "@/assets/factory-exterior.jpg";

interface Article {
  id: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  category: string;
  categoryEn: string;
  author: string;
  date: string;
  image: string;
  slug: string;
}

const Blog = () => {
  useEffect(() => {
    document.title = "مقالاتنا - الفرسان الرباعية | Our Articles";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const article: Article = {
    id: '1',
    title: 'الفرسان الرباعية: رحلة التميز في صناعة الجميد الأردني',
    titleEn: 'Al Fursan Quadruple: Journey of Excellence in Jordanian Jameed Manufacturing',
    excerpt: 'شركة الفرسان الرباعية للإدارة والاستثمار هي شركة رائدة في صناعة المنتجات الأردنية الأصيلة، تأسست منذ أكثر من 20 عاماً من الخبرة في مجال الأغذية. بدأنا كعمل عائلي، ونمت خبرتنا لتصبح علامة تجارية ناجحة تمتلك قاعدة عملاء واسعة محلياً ودولياً. نلتزم بمعالجة المواد الخام بأقصى درجات الاهتمام للحفاظ على جودتها الطبيعية وطعمها الأصيل، مع تطبيق أحدث التقنيات وأعلى معايير الجودة العالمية.',
    excerptEn: 'Al Fursan Quadruple for Management and Investment is a leading company in authentic Jordanian products manufacturing, established over 20 years ago with expertise in food industry. We started as a family business and grew our experience to become a successful brand with an extensive customer base locally and internationally.',
    category: 'company-news',
    categoryEn: 'Company News',
    author: 'إدارة الفرسان الرباعية',
    date: '2024-10-21',
    image: factoryImage,
    slug: 'alfursan-excellence-journey'
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-hero text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20" data-testid="badge-blog">
              مقالاتنا
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="heading-blog">
              أخبارنا ومقالاتنا
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto" data-testid="text-blog-intro">
              تعرف على المزيد عن الفرسان الرباعية ورحلة تميزنا في صناعة الجميد الأردني
            </p>
          </div>
        </section>

        {/* Article Section */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="overflow-hidden hover:shadow-glow transition-shadow duration-300 animate-fade-in-up" data-testid="card-article">
              <div className="relative overflow-hidden h-96">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  data-testid="img-article"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Badge 
                  className="absolute top-6 right-6 bg-primary text-primary-foreground"
                  data-testid="badge-category"
                >
                  {article.categoryEn}
                </Badge>
              </div>
              
              <CardContent className="p-8">
                <div className="flex items-center text-sm text-muted-foreground mb-4 gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span data-testid="text-date">{new Date(article.date).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span data-testid="text-author">{article.author}</span>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold mb-6 text-foreground" data-testid="heading-article-title">
                  {article.title}
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-6" data-testid="text-excerpt">
                  {article.excerpt}
                </p>
                
                <Link to={`/blog/${article.slug}`}>
                  <Button className="group" data-testid="button-read-more">
                    اقرأ المزيد
                    <ArrowRight className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, ArrowRight, Search, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import factoryImage from "@/assets/factory-building.png";

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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');

  const categories = [
    { id: 'all', name: 'جميع المقالات', nameEn: 'All Articles' },
    { id: 'company-news', name: 'أخبار الشركة', nameEn: 'Company News' },
    { id: 'exhibitions', name: 'معارض ومشاركات', nameEn: 'Exhibitions & Events' },
    { id: 'jameed-insights', name: 'مقالات عن الجميد', nameEn: 'Jameed Insights' },
    { id: 'market-export', name: 'السوق والتصدير', nameEn: 'Market & Export' }
  ];

  const articles: Article[] = [
    {
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
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsletterSignup = () => {
    if (email) {
      console.log('Newsletter signup:', email);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90" />
          <div className="absolute inset-0 bg-[url('/src/assets/factory-exterior.jpg')] bg-cover bg-center opacity-20" />
          
          <div className="relative container-section">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-6">
                أخبارنا ومقالاتنا
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                تابع آخر أخبار الفرسان الرباعية واكتشف المزيد عن عالم الجميد التقليدي
              </p>
              <p className="text-lg opacity-80">
                Our News & Articles
              </p>
            </div>
          </div>
        </section>

        <div className="container-section py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-1/4">
              <div className="space-y-6">
                {/* Search */}
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">البحث</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="ابحث في المقالات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Categories */}
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">التصنيفات</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-right px-3 py-2 rounded-lg transition-colors duration-200 ${
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

                {/* Newsletter Signup */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <h3 className="font-semibold text-primary">اشترك في النشرة البريدية</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      احصل على آخر الأخبار والمقالات مباشرة في بريدك الإلكتروني
                    </p>
                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder="بريدك الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Button 
                        onClick={handleNewsletterSignup}
                        className="w-full"
                        size="sm"
                      >
                        <Mail className="h-4 w-4 ml-2 rtl:ml-0 rtl:mr-2" />
                        اشتراك
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-card transition-shadow duration-300 group">
                    <div className="relative overflow-hidden">
                      <img 
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge 
                        className="absolute top-4 right-4 bg-primary/90 text-primary-foreground"
                      >
                        {categories.find(cat => cat.id === article.category)?.name}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4 rtl:space-x-reverse">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 ml-1 rtl:ml-0 rtl:mr-1" />
                          <span>{new Date(article.date).toLocaleDateString('ar-SA')}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 ml-1 rtl:ml-0 rtl:mr-1" />
                          <span>{article.author}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <Link to={`/blog/${article.slug}`}>
                        <Button variant="outline" className="group/btn">
                          اقرأ المزيد
                          <ArrowRight className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform duration-200" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* No Results */}
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    لم يتم العثور على مقالات تطابق البحث
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
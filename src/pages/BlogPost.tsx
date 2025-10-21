import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Facebook, Twitter, Linkedin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import factoryImage from "@/assets/factory-building.png";

interface BlogPost {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  category: string;
  categoryEn: string;
  author: string;
  date: string;
  image: string;
  slug: string;
  tags: string[];
}

const BlogPost = () => {
  const { slug } = useParams();
  const { language, t, dir } = useLanguage();

  const blogPosts: Record<string, BlogPost> = {
    'alfursan-excellence-journey': {
      id: '1',
      title: 'الفرسان الرباعية: رحلة التميز في صناعة الجميد الأردني',
      titleEn: 'Al Fursan Quadruple: Journey of Excellence in Jordanian Jameed Manufacturing',
      content: `
        <p class="lead text-lg font-medium">شركة الفرسان الرباعية للإدارة والاستثمار هي شركة رائدة في صناعة المنتجات الأردنية الأصيلة، تأسست منذ أكثر من 20 عاماً من الخبرة في مجال الأغذية. بدأنا كعمل عائلي، ونمت خبرتنا لتصبح علامة تجارية ناجحة تمتلك قاعدة عملاء واسعة محلياً ودولياً.</p>

        <h2>البداية: من عمل عائلي إلى علامة تجارية رائدة</h2>
        <p>في الفرسان الرباعية، نؤمن بالاستفادة من وفرة وغنى الأردن، حيث يتم التعامل مع منتجاتنا الغذائية بأقصى درجات العناية والاهتمام للحفاظ على نضارتها وخصائصها الأصيلة. بدأت رحلتنا كعمل عائلي صغير، حيث نشأت الإدارة العليا في هذا المجال وطبقت معرفتها العميقة لتحقيق منتجات عالية الجودة.</p>

        <p>اليوم، أصبحنا علامة تجارية رائدة وناجحة في الأردن، مع تاريخ عريق في السوق وقاعدة عملاء واسعة. استطاع فريق الفرسان بناء حضور وسمعة قوية محلياً ودولياً بفضل التزامنا الراسخ بالجودة والأصالة.</p>

        <h2>رؤيتنا: الريادة في المنتجات الأردنية الأصيلة</h2>
        <p>رؤيتنا هي أن نكون الخيار الأول للمنتجات الغذائية الأردنية الأصيلة عالمياً، من خلال الحفاظ على التراث والأصالة مع تطبيق أعلى معايير الجودة العالمية. نسعى للاستفادة من غنى الأردن وخيراته، ومعالجة منتجاتنا بعناية فائقة للحفاظ على نضارتها وخصائصها الطبيعية الأصيلة.</p>

        <h2>رسالتنا: الالتزام بالجودة والتميز</h2>
        <p>نلتزم بإنتاج منتجات عالية الجودة من خلال استخدام التكنولوجيا المتقدمة والالتزام الصارم بمعايير السلامة. عملياتنا مبنية على الكفاءة والاستدامة، مدفوعة بالتزام وخبرة فريقنا بأكمله.</p>

        <p>نستثمر باستمرار في:</p>
        <ul>
          <li>موظفينا المتميزين وتدريبهم المستمر</li>
          <li>التكنولوجيا المتطورة والمعدات الحديثة</li>
          <li>أنظمة الجودة والسلامة الصارمة</li>
          <li>البحث والتطوير لمنتجات جديدة</li>
        </ul>

        <h2>قيمنا الأساسية</h2>
        
        <h3>1. الالتزام</h3>
        <p>نلتزم بفعل الصواب في جميع الأوقات، سواء في تعاملنا مع عملائنا، موظفينا، أو في عملياتنا الإنتاجية. الالتزام هو حجر الأساس لكل ما نقوم به.</p>

        <h3>2. التواصل</h3>
        <p>نؤمن بالتواصل الواضح والفعال والتغذية الراجعة كأساس للنجاح. نحرص على الاستماع لعملائنا وفريق العمل والعالم من حولنا لنكون دائماً في تحسين مستمر.</p>

        <h3>3. النزاهة</h3>
        <p>نمارس أعمالنا بمعايير أخلاقية عالية وشفافية تامة وصدق في كل تعاملاتنا. النزاهة ليست خياراً، بل هي جزء من هويتنا.</p>

        <h3>4. المسؤولية</h3>
        <p>نتحمل مسؤولياتنا ونسعى لتجاوز التوقعات في كل ما نقوم به. نتخذ المبادرة في امتلاك مسؤولياتنا وتحقيق نتائج استثنائية.</p>

        <h3>5. العائلة</h3>
        <p>نحب ونهتم وندعم بعضنا البعض كعائلة واحدة. فريق الفرسان الرباعية هو عائلة كبيرة تعمل معاً بروح الفريق الواحد.</p>

        <h2>التميز في الإنتاج والجودة</h2>
        <p>نحرص على معالجة المواد الخام لإنتاج منتجات غذائية عالية الجودة بأقصى درجات الاهتمام والنزاهة فيما يتعلق بالنظافة والحفاظ على جودتها الطبيعية وطعمها الأصيل.</p>

        <h3>مصنعنا الحديث</h3>
        <p>يضم مصنعنا:</p>
        <ul>
          <li><strong>خطوط إنتاج متطورة:</strong> مجهزة بأحدث التقنيات الأوروبية</li>
          <li><strong>مختبرات حديثة:</strong> لفحص الجودة والسلامة في كل مرحلة</li>
          <li><strong>أنظمة تحكم إلكترونية:</strong> لضمان دقة العمليات الإنتاجية</li>
          <li><strong>مرافق تخزين مثالية:</strong> للحفاظ على المنتجات بأفضل حالة</li>
        </ul>

        <h2>الشهادات والاعتمادات الدولية</h2>
        <p>حصلنا على أهم الشهادات العالمية التي تؤكد التزامنا بالجودة:</p>
        <ul>
          <li><strong>ISO 22000:</strong> نظام إدارة سلامة الغذاء</li>
          <li><strong>ISO 9001:</strong> نظام إدارة الجودة</li>
          <li><strong>HACCP:</strong> تحليل المخاطر ونقاط التحكم الحرجة</li>
          <li><strong>HALAL:</strong> شهادة الحلال المعتمدة</li>
          <li><strong>FDA Approved:</strong> موافقة إدارة الغذاء والدواء الأمريكية</li>
          <li><strong>TÜV AUSTRIA:</strong> شهادة الجودة الأوروبية</li>
        </ul>

        <h2>منتجاتنا المميزة</h2>
        
        <h3>جميدنا زمان</h3>
        <p>خط إنتاج متميز يحمل الطابع التقليدي الأصيل، مصنوع من حليب الأغنام الطازج 100% بطرق تقليدية محسّنة بتقنيات حديثة.</p>

        <h3>جميد بدوية</h3>
        <p>يمثل أصالة البادية الأردنية، مصنوع من حليب الماعز الطبيعي بجودة عالية تحافظ على المذاق التقليدي.</p>

        <p class="text-lg font-medium mt-8">الفرسان الرباعية ليست مجرد شركة، بل هي قصة نجاح أردنية تجمع بين الأصالة والحداثة، التراث والتكنولوجيا، الجودة والشغف.</p>
      `,
      contentEn: '',
      category: 'company-news',
      categoryEn: 'Company News',
      author: language === 'ar' ? 'إدارة الفرسان الرباعية' : 'Al Fursan Management',
      date: '2024-10-21',
      image: factoryImage,
      slug: 'alfursan-excellence-journey',
      tags: language === 'ar' 
        ? ['الفرسان الرباعية', 'جميد أردني', 'جودة', 'تراث', 'منتجات أصيلة', 'تصدير']
        : ['Al Fursan', 'Jordanian Jameed', 'Quality', 'Heritage', 'Authentic Products', 'Export']
    }
  };

  const post = slug ? blogPosts[slug] : null;

  useEffect(() => {
    if (post) {
      document.title = language === 'ar'
        ? `${post.title} | الفرسان الرباعية`
        : `${post.titleEn} | Al Fursan Quadruple`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        const excerpt = post.content.replace(/<[^>]+>/g, '').substring(0, 160);
        metaDescription.setAttribute('content', excerpt);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [post, language]);

  if (!post) {
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

  const relatedPosts = Object.values(blogPosts)
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const shareUrl = window.location.href;
  const shareTitle = language === 'ar' ? post.title : post.titleEn;

  const getCategoryName = (category: string) => {
    if (language === 'en') {
      const categories: Record<string, string> = {
        'exhibitions': 'Exhibitions & Events',
        'company-news': 'Company News',
        'jameed-insights': 'Jameed Insights',
        'market-export': 'Market & Export'
      };
      return categories[category] || category;
    }
    const categories: Record<string, string> = {
      'exhibitions': 'معارض ومشاركات',
      'company-news': 'أخبار الشركة',
      'jameed-insights': 'مقالات عن الجميد',
      'market-export': 'السوق والتصدير'
    };
    return categories[category] || category;
  };

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      
      <main className="pt-24">
        <article>
          {/* Hero Image */}
          <div className="relative h-96 bg-gradient-hero">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary-dark/70" />
            <img 
              src={post.image}
              alt={language === 'ar' ? post.title : post.titleEn}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="container-section">
                <div className="max-w-4xl mx-auto text-white">
                  <Badge className="mb-4 bg-white/20 text-white border-white/30">
                    {getCategoryName(post.category)}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {language === 'ar' ? post.title : post.titleEn}
                  </h1>
                  <div className="flex items-center text-white/90 space-x-6 rtl:space-x-reverse">
                    <div className="flex items-center">
                      <Calendar className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                      <span>{new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</span>
                    </div>
                    <div className="flex items-center">
                      <User className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="container-section py-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="lg:w-3/4">
                  <div className={`prose prose-lg max-w-none ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
                    <div 
                      dangerouslySetInnerHTML={{ __html: post.content }}
                      className="article-content space-y-6"
                    />
                  </div>

                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="font-semibold mb-4">
                      {language === 'ar' ? 'العلامات:' : 'Tags:'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Share Buttons */}
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

                {/* Sidebar */}
                <aside className="lg:w-1/4">
                  <div className="sticky top-8 space-y-6">
                    {/* Related Articles */}
                    {relatedPosts.length > 0 && (
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-semibold mb-4">
                            {language === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
                          </h3>
                          <div className="space-y-4">
                            {relatedPosts.map((relatedPost) => (
                              <Link 
                                key={relatedPost.id}
                                to={`/blog/${relatedPost.slug}`}
                                className="block group"
                              >
                                <div className="flex space-x-3 rtl:space-x-reverse">
                                  <img 
                                    src={relatedPost.image}
                                    alt={language === 'ar' ? relatedPost.title : relatedPost.titleEn}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors duration-200 line-clamp-2">
                                      {language === 'ar' ? relatedPost.title : relatedPost.titleEn}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {new Date(relatedPost.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Back to Blog */}
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

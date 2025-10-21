import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faBullseye, faHandshake, faComments, faBalanceScale, faUserCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Factory, FlaskConical } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import factoryWorkerImage from "@/assets/image_1761005884070.png";
import productionLineImage from "@/assets/image_1761005902339.png";
import laboratoryImage from "@/assets/image_1761005921388.png";

const About = () => {
  const { language, t, dir } = useLanguage();

  useEffect(() => {
    document.title = language === 'ar' 
      ? "من نحن - الفرسان الرباعية | About Al Fursan Quadruple"
      : "About - Al Fursan Quadruple | Traditional Jordanian Jameed";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'ar'
        ? 'تعرف على الفرسان الرباعية - أكثر من 20 عامًا من الخبرة في صناعة الجميد الأردني الأصيل، رؤيتنا ورسالتنا وقيمنا'
        : 'Learn about Al Fursan Quadruple - Over 20 years of experience in producing authentic Jordanian Jameed, our vision, mission and values'
      );
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 px-6 py-2" data-testid="badge-about">
              {t('about.hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up" data-testid="heading-about">
              {language === 'ar' ? 'الفرسان الرباعية للإدارة والاستثمار' : 'Al Fursan Quadruple for Management & Investment'}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }} data-testid="text-tagline">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </section>

        {/* من نحن - قصة الشركة */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4 animate-fade-in-up">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1" data-testid="badge-story">
                  {t('about.story.title')}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight" data-testid="heading-story">
                  {language === 'ar' ? 'التزام راسخ بالجودة المثالية' : 'Firm Commitment to Perfect Quality'}
                </h2>
                <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                  <p className="text-lg font-medium text-primary" data-testid="text-story-intro">
                    {language === 'ar' 
                      ? 'في الفرسان الرباعية، نؤمن بالاستفادة من وفرة وغنى الأردن، حيث يتم التعامل مع منتجاتنا الغذائية بأقصى درجات العناية والاهتمام للحفاظ على نضارتها وخصائصها الأصيلة.'
                      : 'At Al Fursan Quadruple, we believe in leveraging the abundance and richness of Jordan, where our food products are handled with the utmost care and attention to preserve their freshness and authentic characteristics.'}
                  </p>
                  <p data-testid="text-story-1">
                    {language === 'ar'
                      ? 'نحن شركة تمتلك خبرة تزيد عن عشرين عامًا في صناعة الأغذية. بدأنا كعمل عائلي، حيث نشأت الإدارة العليا في هذا المجال وطبقت معرفتها لتحقيق منتجات عالية الجودة.'
                      : 'We are a company with over twenty years of experience in the food industry. We started as a family business, where senior management grew up in this field and applied their knowledge to achieve high-quality products.'}
                  </p>
                  <p data-testid="text-story-2">
                    {language === 'ar'
                      ? 'كعلامة تجارية رائدة وناجحة في الأردن، مع تاريخ عريق في السوق وقاعدة عملاء واسعة، استطاع فريق الفرسان بناء حضور وسمعة قوية محليًا ودوليًا.'
                      : 'As a leading and successful brand in Jordan, with a rich market history and broad customer base, the Al Fursan team has built a strong presence and reputation locally and internationally.'}
                  </p>
                  <p data-testid="text-story-3">
                    {language === 'ar'
                      ? 'نحرص على معالجة المواد الخام لإنتاج منتجات غذائية عالية الجودة بأقصى درجات الاهتمام والنزاهة فيما يتعلق بالنظافة والحفاظ على جودتها الطبيعية وطعمها الأصيل.'
                      : 'We ensure processing raw materials to produce high-quality food products with the utmost attention and integrity regarding cleanliness and preserving their natural quality and authentic taste.'}
                  </p>
                </div>
              </div>
              
              <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-20 blur-2xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-glow">
                  <img 
                    src={factoryWorkerImage}
                    alt={language === 'ar' ? 'عامل في مصنع الفرسان الرباعية' : 'Worker at Al Fursan Quadruple factory'}
                    className="w-full h-auto object-cover"
                    data-testid="img-factory-worker"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* الرؤية والرسالة */}
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1" data-testid="badge-vision-mission">
                {language === 'ar' ? 'رؤيتنا ورسالتنا' : 'Our Vision & Mission'}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" data-testid="heading-vision-mission">
                {language === 'ar' ? 'نحو مستقبل أفضل' : 'Towards a Better Future'}
              </h2>
              <p className="text-base text-muted-foreground max-w-3xl mx-auto">
                {language === 'ar' 
                  ? 'نسعى لتحقيق رؤية طموحة من خلال رسالة واضحة ومبادئ راسخة'
                  : 'We strive to achieve an ambitious vision through a clear mission and firm principles'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* الرؤية */}
              <Card className="group hover:shadow-glow transition-all duration-500 border-2 border-transparent hover:border-primary/20 animate-fade-in-up" data-testid="card-vision">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 border-4 border-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon icon={faEye} className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-4" data-testid="heading-vision">
                        {t('about.vision.title')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base" data-testid="text-vision">
                        {language === 'ar'
                          ? 'أن نكون الخيار الأول للمنتجات الغذائية الأردنية الأصيلة عالميًا، من خلال الحفاظ على التراث والأصالة مع تطبيق أعلى معايير الجودة العالمية. نسعى للاستفادة من غنى الأردن وخيراته، ومعالجة منتجاتنا بعناية فائقة للحفاظ على نضارتها وخصائصها الطبيعية الأصيلة.'
                          : 'To be the first choice for authentic Jordanian food products globally, by preserving heritage and authenticity while applying the highest international quality standards. We strive to leverage Jordan\'s richness and bounties, and process our products with utmost care to preserve their freshness and authentic natural characteristics.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* الرسالة */}
              <Card className="group hover:shadow-glow transition-all duration-500 border-2 border-transparent hover:border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.1s' }} data-testid="card-mission">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 border-4 border-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon icon={faBullseye} className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-4" data-testid="heading-mission">
                        {t('about.mission.title')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base" data-testid="text-mission">
                        {language === 'ar'
                          ? 'نلتزم بإنتاج منتجات عالية الجودة من خلال استخدام التكنولوجيا المتقدمة والالتزام الصارم بمعايير السلامة. عملياتنا مبنية على الكفاءة والاستدامة، مدفوعة بالتزام وخبرة فريقنا بأكمله. نستثمر باستمرار في موظفينا والتكنولوجيا المتطورة والمعدات الحديثة لضمان جودة لا هوادة فيها وخدمة عملاء استثنائية.'
                          : 'We commit to producing high-quality products through advanced technology and strict adherence to safety standards. Our operations are built on efficiency and sustainability, driven by the commitment and expertise of our entire team. We continuously invest in our employees, advanced technology, and modern equipment to ensure uncompromising quality and exceptional customer service.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* القيم */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-2" data-testid="heading-values">
                <span className="text-muted-foreground">{language === 'ar' ? 'قيمنا' : 'Our'}</span>{" "}
                <span className="text-primary">{language === 'ar' ? 'الأساسية' : 'Core Values'}</span>
              </h2>
              <div className="w-32 h-1 bg-primary mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-2xl">
              {/* الالتزام */}
              <div className="bg-primary text-white p-8 flex flex-col items-center text-center animate-fade-in-up" data-testid="value-commitment">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <FontAwesomeIcon icon={faHandshake} className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{language === 'ar' ? 'الالتزام' : 'Commitment'}</h3>
                <p className="text-sm text-primary-foreground/90 leading-relaxed">
                  {language === 'ar' ? 'نلتزم بفعل الصواب في جميع الأوقات' : 'We commit to doing what is right at all times'}
                </p>
              </div>

              {/* التواصل */}
              <div className="bg-muted text-foreground p-8 flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }} data-testid="value-communication">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <FontAwesomeIcon icon={faComments} className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-4">{language === 'ar' ? 'التواصل' : 'Communication'}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === 'ar' ? 'نؤمن بالتواصل الواضح والفعال والتغذية الراجعة كأساس للنجاح' : 'We believe in clear and effective communication as a foundation for success'}
                </p>
              </div>

              {/* النزاهة */}
              <div className="bg-primary text-white p-8 flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }} data-testid="value-integrity">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <FontAwesomeIcon icon={faBalanceScale} className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{language === 'ar' ? 'النزاهة' : 'Integrity'}</h3>
                <p className="text-sm text-primary-foreground/90 leading-relaxed">
                  {language === 'ar' ? 'نمارس أعمالنا بمعايير أخلاقية عالية وشفافية تامة' : 'We conduct business with high ethical standards and complete transparency'}
                </p>
              </div>

              {/* المسؤولية */}
              <div className="bg-muted text-foreground p-8 flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }} data-testid="value-accountability">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <FontAwesomeIcon icon={faUserCheck} className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-4">{language === 'ar' ? 'المسؤولية' : 'Accountability'}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === 'ar' ? 'نتحمل مسؤولياتنا ونسعى لتجاوز التوقعات' : 'We take responsibility and strive to exceed expectations'}
                </p>
              </div>

              {/* العائلة */}
              <div className="bg-primary text-white p-8 flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }} data-testid="value-family">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <FontAwesomeIcon icon={faUsers} className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{language === 'ar' ? 'العائلة' : 'Family'}</h3>
                <p className="text-sm text-primary-foreground/90 leading-relaxed">
                  {language === 'ar' ? 'نحب ونهتم وندعم بعضنا البعض كعائلة واحدة' : 'We love, care for, and support each other as one family'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* الجودة والتكنولوجيا */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1" data-testid="badge-quality">
                {language === 'ar' ? 'الجودة والتكنولوجيا' : 'Quality & Technology'}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" data-testid="heading-quality">
                {language === 'ar' ? 'ضمان الجودة والتميز التقني' : 'Quality Assurance & Technical Excellence'}
              </h2>
              <p className="text-base text-muted-foreground max-w-3xl mx-auto" data-testid="text-quality-intro">
                {language === 'ar'
                  ? 'نستخدم أحدث التقنيات والأنظمة لضمان أعلى معايير الجودة في كل مرحلة من مراحل الإنتاج'
                  : 'We use the latest technologies and systems to ensure the highest quality standards at every stage of production'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* نظام التحكم الإلكتروني */}
              <Card className="group overflow-hidden hover:shadow-glow transition-all duration-500 animate-fade-in-up" data-testid="card-production">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={productionLineImage}
                    alt={language === 'ar' ? 'خطوط الإنتاج الحديثة' : 'Modern production lines'}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-testid="img-production-line"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center ${dir === 'rtl' ? 'ml-4' : 'mr-4'}`}>
                      <Factory className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground" data-testid="heading-production">
                      {language === 'ar' ? 'نظام التحكم الإلكتروني' : 'Electronic Control System'}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-base" data-testid="text-production">
                    {language === 'ar'
                      ? 'يتم تشغيل جميع آلات المصنع من خلال نظام الإدارة الداخلي الذي يتم تحديثه وصيانته بانتظام. ما يميز هذا النظام هو أن جميع الآلات يتم التحكم بها إلكترونيًا وتسجل جميع المعلومات بدقة الثانية، مع تسجيل كافة بيانات الإنتاج.'
                      : 'All factory machines operate through an internal management system that is regularly updated and maintained. What distinguishes this system is that all machines are electronically controlled and record all information to the second, with complete production data logging.'}
                  </p>
                </CardContent>
              </Card>

              {/* الصيانة والجاهزية */}
              <Card className="group overflow-hidden hover:shadow-glow transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.1s' }} data-testid="card-laboratory">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={laboratoryImage}
                    alt={language === 'ar' ? 'مختبر اختبارات الجودة' : 'Quality testing laboratory'}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-testid="img-laboratory"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center ${dir === 'rtl' ? 'ml-4' : 'mr-4'}`}>
                      <FlaskConical className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground" data-testid="heading-laboratory">
                      {language === 'ar' ? 'الصيانة والجاهزية' : 'Maintenance & Readiness'}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-base" data-testid="text-laboratory">
                    {language === 'ar'
                      ? 'تفخر الفرسان بتوفير جميع قطع الغيار في الموقع مع وجود مهندسين مستعدين لإصلاح أي مشاكل قد تنشأ، مما يضمن استمرارية الإنتاج وأعلى مستويات الجودة في جميع الأوقات.'
                      : 'Al Fursan takes pride in providing all spare parts on-site with engineers ready to fix any issues that may arise, ensuring production continuity and highest quality levels at all times.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;

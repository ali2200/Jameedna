import { useEffect } from "react";
import { Award, Users, Target, Heart, MessageSquare, ShieldCheck, UserCheck, Factory, FlaskConical } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  useEffect(() => {
    document.title = "من نحن - الفرسان الرباعية | About Al Fursan Quadruple";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'تعرف على الفرسان الرباعية - أكثر من 20 عامًا من الخبرة في صناعة الجميد الأردني الأصيل، رؤيتنا ورسالتنا وقيمنا');
    }
  }, []);

  const values = [
    {
      icon: ShieldCheck,
      title: "الالتزام",
      description: "نلتزم بفعل الصواب في جميع الأوقات",
      color: "text-primary"
    },
    {
      icon: MessageSquare,
      title: "التواصل",
      description: "نؤمن بالتواصل الواضح والفعال كأساس للنجاح",
      color: "text-jameed-red"
    },
    {
      icon: Award,
      title: "النزاهة",
      description: "نمارس أعمالنا بمعايير أخلاقية عالية وشفافية تامة",
      color: "text-badawya-gold"
    },
    {
      icon: UserCheck,
      title: "المسؤولية",
      description: "نتحمل مسؤولياتنا ونسعى لتجاوز التوقعات",
      color: "text-primary-light"
    },
    {
      icon: Heart,
      title: "العائلة",
      description: "نحب ونهتم وندعم بعضنا البعض كعائلة واحدة",
      color: "text-jameed-burgundy"
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 bg-primary-foreground/10 text-primary-foreground" data-testid="badge-about">
              من نحن
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="heading-about">
              الفرسان الرباعية للإدارة والاستثمار
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed" data-testid="text-tagline">
              رائدون في صناعة المنتجات الأردنية الأصيلة منذ أكثر من 20 عامًا
            </p>
          </div>
        </section>

        {/* من نحن - قصة الشركة */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary" data-testid="badge-story">قصتنا</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="heading-story">
                  التزام راسخ بالجودة المثالية
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p data-testid="text-story-1">
                    في الفرسان الرباعية، نؤمن بالاستفادة من وفرة وغنى الأردن، حيث يتم التعامل مع منتجاتنا الغذائية بأقصى درجات العناية والاهتمام للحفاظ على نضارتها وخصائصها الأصيلة.
                  </p>
                  <p data-testid="text-story-2">
                    نحن شركة تمتلك خبرة تزيد عن عشرين عامًا في صناعة الأغذية. بدأنا كعمل عائلي، حيث نشأت الإدارة العليا في هذا المجال وطبقت معرفتها لتحقيق منتجات عالية الجودة.
                  </p>
                  <p data-testid="text-story-3">
                    كعلامة تجارية رائدة وناجحة في الأردن، مع تاريخ عريق في السوق وقاعدة عملاء واسعة، استطاع فريق الفرسان بناء حضور وسمعة قوية محليًا ودوليًا.
                  </p>
                  <p data-testid="text-story-4">
                    نحرص على معالجة المواد الخام لإنتاج منتجات غذائية عالية الجودة بأقصى درجات الاهتمام والنزاهة فيما يتعلق بالنظافة والحفاظ على جودتها الطبيعية وطعمها الأصيل.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/image_1761005884070.png"
                  alt="عامل في مصنع الفرسان الرباعية"
                  className="rounded-2xl shadow-card w-full h-auto"
                  data-testid="img-factory-worker"
                />
              </div>
            </div>
          </div>
        </section>

        {/* الرؤية والرسالة */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary" data-testid="badge-vision-mission">
                رؤيتنا ورسالتنا
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="heading-vision-mission">
                نحو مستقبل أفضل
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* الرؤية */}
              <Card className="hover:shadow-glow transition-all duration-300" data-testid="card-vision">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4" data-testid="heading-vision">
                    رؤيتنا
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-vision">
                    أن نكون الخيار الأول للمنتجات الغذائية الأردنية الأصيلة عالميًا، من خلال الحفاظ على التراث والأصالة مع تطبيق أعلى معايير الجودة العالمية. نسعى للاستفادة من غنى الأردن وخيراته، ومعالجة منتجاتنا بعناية فائقة للحفاظ على نضارتها وخصائصها الطبيعية الأصيلة.
                  </p>
                </CardContent>
              </Card>

              {/* الرسالة */}
              <Card className="hover:shadow-glow transition-all duration-300" data-testid="card-mission">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-jameed-red/10 rounded-full flex items-center justify-center mb-6">
                    <Award className="h-8 w-8 text-jameed-red" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4" data-testid="heading-mission">
                    رسالتنا
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-mission">
                    نلتزم بإنتاج منتجات عالية الجودة من خلال استخدام التكنولوجيا المتقدمة والالتزام الصارم بمعايير السلامة. عملياتنا مبنية على الكفاءة والاستدامة، مدفوعة بالتزام وخبرة فريقنا بأكمله. نستثمر باستمرار في موظفينا والتكنولوجيا المتطورة والمعدات الحديثة لضمان جودة لا هوادة فيها وخدمة عملاء استثنائية.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* القيم */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary" data-testid="badge-values">
                قيمنا
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-values">
                القيم التي نؤمن بها
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-values-intro">
                قيمنا هي الأساس الذي نبني عليه نجاحنا وعلاقاتنا مع عملائنا وموظفينا
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card 
                  key={value.title}
                  className="hover:shadow-glow transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`card-value-${index}`}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className={`h-8 w-8 ${value.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3" data-testid={`heading-value-${index}`}>
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-value-${index}`}>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* الجودة والتكنولوجيا */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary" data-testid="badge-quality">
                الجودة والتكنولوجيا
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-quality">
                ضمان الجودة والتميز التقني
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-quality-intro">
                نستخدم أحدث التقنيات والأنظمة لضمان أعلى معايير الجودة في كل مرحلة من مراحل الإنتاج
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {/* خطوط الإنتاج */}
              <Card className="overflow-hidden hover:shadow-glow transition-all duration-300" data-testid="card-production">
                <div className="relative h-64">
                  <img 
                    src="/image_1761005902339.png"
                    alt="خطوط الإنتاج الحديثة"
                    className="absolute inset-0 w-full h-full object-cover"
                    data-testid="img-production-line"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <Factory className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground" data-testid="heading-production">
                      نظام التحكم الإلكتروني
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-production">
                    يتم تشغيل جميع آلات المصنع من خلال نظام الإدارة الداخلي الذي يتم تحديثه وصيانته بانتظام. ما يميز هذا النظام هو أن جميع الآلات يتم التحكم بها إلكترونيًا وتسجل جميع المعلومات بدقة الثانية، مع تسجيل كافة بيانات الإنتاج.
                  </p>
                </CardContent>
              </Card>

              {/* المختبر */}
              <Card className="overflow-hidden hover:shadow-glow transition-all duration-300" data-testid="card-laboratory">
                <div className="relative h-64">
                  <img 
                    src="/image_1761005921388.png"
                    alt="مختبر اختبارات الجودة"
                    className="absolute inset-0 w-full h-full object-cover"
                    data-testid="img-laboratory"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-jameed-red/10 rounded-full flex items-center justify-center mr-4">
                      <FlaskConical className="h-6 w-6 text-jameed-red" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground" data-testid="heading-laboratory">
                      الصيانة والجاهزية
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-laboratory">
                    تفخر الفرسان بتوفير جميع قطع الغيار في الموقع مع وجود مهندسين مستعدين لإصلاح أي مشاكل قد تنشأ، مما يضمن استمرارية الإنتاج وأعلى مستويات الجودة في جميع الأوقات.
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

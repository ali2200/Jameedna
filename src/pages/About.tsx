import { useEffect } from "react";
import { Award, Users, Target, Heart, MessageSquare, ShieldCheck, UserCheck, Factory, FlaskConical, Sparkles, Globe2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import factoryWorkerImage from "@/assets/image_1761005884070.png";
import productionLineImage from "@/assets/image_1761005902339.png";
import laboratoryImage from "@/assets/image_1761005921388.png";

const About = () => {
  const navigate = useNavigate();

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
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: MessageSquare,
      title: "التواصل",
      description: "نؤمن بالتواصل الواضح والفعال كأساس للنجاح",
      color: "text-jameed-red",
      bgColor: "bg-jameed-red/10"
    },
    {
      icon: Award,
      title: "النزاهة",
      description: "نمارس أعمالنا بمعايير أخلاقية عالية وشفافية تامة",
      color: "text-badawya-gold",
      bgColor: "bg-badawya-gold/10"
    },
    {
      icon: UserCheck,
      title: "المسؤولية",
      description: "نتحمل مسؤولياتنا ونسعى لتجاوز التوقعات",
      color: "text-primary-light",
      bgColor: "bg-primary-light/10"
    },
    {
      icon: Heart,
      title: "العائلة",
      description: "نحب ونهتم وندعم بعضنا البعض كعائلة واحدة",
      color: "text-jameed-burgundy",
      bgColor: "bg-jameed-burgundy/10"
    }
  ];

  const stats = [
    {
      number: "20+",
      label: "عامًا من الخبرة",
      icon: Award
    },
    {
      number: "7",
      label: "شهادات جودة عالمية",
      icon: ShieldCheck
    },
    {
      number: "100%",
      label: "منتجات أردنية أصيلة",
      icon: Sparkles
    },
    {
      number: "24/7",
      label: "خطوط إنتاج متواصلة",
      icon: Factory
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-hero text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 text-lg px-6 py-2" data-testid="badge-about">
              من نحن
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up" data-testid="heading-about">
              الفرسان الرباعية للإدارة والاستثمار
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }} data-testid="text-tagline">
              رائدون في صناعة المنتجات الأردنية الأصيلة منذ أكثر من 20 عامًا
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-primary-foreground/20 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  data-testid={`stat-${index}`}
                >
                  <stat.icon className="h-8 w-8 text-primary-foreground mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2" data-testid={`stat-number-${index}`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-primary-foreground/80" data-testid={`stat-label-${index}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* من نحن - قصة الشركة */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 animate-fade-in-up">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-base px-4 py-2" data-testid="badge-story">
                  قصتنا
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight" data-testid="heading-story">
                  التزام راسخ بالجودة المثالية
                </h2>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                  <p className="text-xl font-medium text-foreground" data-testid="text-story-intro">
                    في الفرسان الرباعية، نؤمن بالاستفادة من وفرة وغنى الأردن، حيث يتم التعامل مع منتجاتنا الغذائية بأقصى درجات العناية والاهتمام للحفاظ على نضارتها وخصائصها الأصيلة.
                  </p>
                  <p data-testid="text-story-1">
                    نحن شركة تمتلك خبرة تزيد عن عشرين عامًا في صناعة الأغذية. بدأنا كعمل عائلي، حيث نشأت الإدارة العليا في هذا المجال وطبقت معرفتها لتحقيق منتجات عالية الجودة.
                  </p>
                  <p data-testid="text-story-2">
                    كعلامة تجارية رائدة وناجحة في الأردن، مع تاريخ عريق في السوق وقاعدة عملاء واسعة، استطاع فريق الفرسان بناء حضور وسمعة قوية محليًا ودوليًا.
                  </p>
                  <p data-testid="text-story-3">
                    نحرص على معالجة المواد الخام لإنتاج منتجات غذائية عالية الجودة بأقصى درجات الاهتمام والنزاهة فيما يتعلق بالنظافة والحفاظ على جودتها الطبيعية وطعمها الأصيل.
                  </p>
                </div>
              </div>
              
              <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-20 blur-2xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-glow">
                  <img 
                    src={factoryWorkerImage}
                    alt="عامل في مصنع الفرسان الرباعية"
                    className="w-full h-auto object-cover"
                    data-testid="img-factory-worker"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* الرؤية والرسالة */}
        <section className="py-24 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 text-base px-4 py-2" data-testid="badge-vision-mission">
                رؤيتنا ورسالتنا
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="heading-vision-mission">
                نحو مستقبل أفضل
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                نسعى لتحقيق رؤية طموحة من خلال رسالة واضحة ومبادئ راسخة
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* الرؤية */}
              <Card className="group hover:shadow-glow transition-all duration-500 border-2 border-transparent hover:border-primary/20 animate-fade-in-up" data-testid="card-vision">
                <CardContent className="p-10">
                  <div className="flex items-start space-x-6 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Target className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-foreground mb-6" data-testid="heading-vision">
                        رؤيتنا
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-vision">
                        أن نكون الخيار الأول للمنتجات الغذائية الأردنية الأصيلة عالميًا، من خلال الحفاظ على التراث والأصالة مع تطبيق أعلى معايير الجودة العالمية. نسعى للاستفادة من غنى الأردن وخيراته، ومعالجة منتجاتنا بعناية فائقة للحفاظ على نضارتها وخصائصها الطبيعية الأصيلة.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* الرسالة */}
              <Card className="group hover:shadow-glow transition-all duration-500 border-2 border-transparent hover:border-jameed-red/20 animate-fade-in-up" style={{ animationDelay: '0.1s' }} data-testid="card-mission">
                <CardContent className="p-10">
                  <div className="flex items-start space-x-6 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-jameed rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Award className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-foreground mb-6" data-testid="heading-mission">
                        رسالتنا
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-mission">
                        نلتزم بإنتاج منتجات عالية الجودة من خلال استخدام التكنولوجيا المتقدمة والالتزام الصارم بمعايير السلامة. عملياتنا مبنية على الكفاءة والاستدامة، مدفوعة بالتزام وخبرة فريقنا بأكمله. نستثمر باستمرار في موظفينا والتكنولوجيا المتطورة والمعدات الحديثة لضمان جودة لا هوادة فيها وخدمة عملاء استثنائية.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* القيم */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 text-base px-4 py-2" data-testid="badge-values">
                قيمنا
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="heading-values">
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
                  className="group hover:shadow-glow hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-primary/10 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`card-value-${index}`}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className={`h-10 w-10 ${value.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4" data-testid={`heading-value-${index}`}>
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg" data-testid={`text-value-${index}`}>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* الجودة والتكنولوجيا */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 text-base px-4 py-2" data-testid="badge-quality">
                الجودة والتكنولوجيا
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="heading-quality">
                ضمان الجودة والتميز التقني
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-quality-intro">
                نستخدم أحدث التقنيات والأنظمة لضمان أعلى معايير الجودة في كل مرحلة من مراحل الإنتاج
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* نظام التحكم الإلكتروني */}
              <Card className="group overflow-hidden hover:shadow-glow transition-all duration-500 animate-fade-in-up" data-testid="card-production">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={productionLineImage}
                    alt="خطوط الإنتاج الحديثة"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-testid="img-production-line"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center ml-4">
                      <Factory className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground" data-testid="heading-production">
                      نظام التحكم الإلكتروني
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-production">
                    يتم تشغيل جميع آلات المصنع من خلال نظام الإدارة الداخلي الذي يتم تحديثه وصيانته بانتظام. ما يميز هذا النظام هو أن جميع الآلات يتم التحكم بها إلكترونيًا وتسجل جميع المعلومات بدقة الثانية، مع تسجيل كافة بيانات الإنتاج.
                  </p>
                </CardContent>
              </Card>

              {/* الصيانة والجاهزية */}
              <Card className="group overflow-hidden hover:shadow-glow transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.1s' }} data-testid="card-laboratory">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={laboratoryImage}
                    alt="مختبر اختبارات الجودة"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-testid="img-laboratory"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-jameed-red/10 rounded-xl flex items-center justify-center ml-4">
                      <FlaskConical className="h-7 w-7 text-jameed-red" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground" data-testid="heading-laboratory">
                      الصيانة والجاهزية
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-laboratory">
                    تفخر الفرسان بتوفير جميع قطع الغيار في الموقع مع وجود مهندسين مستعدين لإصلاح أي مشاكل قد تنشأ، مما يضمن استمرارية الإنتاج وأعلى مستويات الجودة في جميع الأوقات.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-hero text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in-up" data-testid="heading-cta">
              هل أنتم مستعدون للتعاون معنا؟
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }} data-testid="text-cta">
              تواصلوا معنا اليوم لمعرفة المزيد عن منتجاتنا وخدماتنا
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-10 py-6 text-lg font-semibold shadow-xl"
                data-testid="button-contact"
              >
                اتصل بنا
              </Button>
              <Button 
                onClick={() => navigate('/products')}
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-10 py-6 text-lg font-semibold"
                data-testid="button-products"
              >
                تصفح منتجاتنا
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;

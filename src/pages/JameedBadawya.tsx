import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, ChevronRight, Award, Shield, ArrowLeft, Truck, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const JameedBadawya = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "جميد البدوية - الفرسان الرباعية | Jameed Badawya";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'جميد البدوية - جميد بدوي تقليدي 100% جميد نقي، مصنوع من حليب الغنم الطازج المبستر، معبأ بتقنية Aseptic للحفاظ على الطعم الأصيل'
      );
    }
  }, []);

  const ingredients = '100% جميد نقي (حليب غنم طازج مبستر، ملح، بادئ) ماء، بهارات، ملح.';
  const productFeatures = 'جميد مغسول وخالي من كافة الشوائب، محلول بماء معقم، مطبوخ ومعبأ في باكيت كارتون معقم، محكم الإغلاق.';

  const specifications = [
    {
      size: '1000 gm',
      barcode: '6251591112229',
      weight: '1000 gm',
      netWeight: '2.2 lbs',
      packagingType: 'Aseptic',
      dimensions: '19.5cm x 10.5cm x 7cm'
    },
    {
      size: '500 gm',
      barcode: '6251591112212',
      weight: '500 gm',
      netWeight: '1.1 lbs',
      packagingType: 'Aseptic',
      dimensions: '9cm x 9.5cm x 6.5cm'
    }
  ];

  const certificates = ['Halal', 'FDA', 'HACCP', 'وزارة الصحة'];

  const features = [
    {
      icon: Shield,
      title: 'تراث بدوي أصيل',
      description: 'وصفة تقليدية بدوية تم توارثها عبر الأجيال مع الحفاظ على أصالة المذاق'
    },
    {
      icon: Package,
      title: 'تعبئة صحية حديثة',
      description: 'تقنية Aseptic المتطورة تضمن سلامة المنتج والحفاظ على قيمته الغذائية'
    },
    {
      icon: CheckCircle,
      title: 'مكونات طبيعية',
      description: 'مصنوع من حليب الغنم الطازج مع البهارات الطبيعية بدون إضافات صناعية'
    },
    {
      icon: Award,
      title: 'جودة مضمونة',
      description: 'يخضع للفحص والمراقبة المستمرة وفق أعلى معايير الجودة العالمية'
    }
  ];

  const handleQuoteClick = () => {
    navigate('/request-quote');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-32">
        {/* Breadcrumb */}
        <section className="py-6 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              <ChevronRight className="h-4 w-4 rotate-180" />
              <Link to="/products" className="hover:text-primary transition-colors">المنتجات</Link>
              <ChevronRight className="h-4 w-4 rotate-180" />
              <span className="text-foreground font-medium">جميد البدوية</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] 
                        bg-[length:30px_30px] animate-shimmer" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="animate-fade-in-up">
                <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
                  منتج مميز
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  جميد البدوية
                </h1>
                
                <h2 className="text-2xl md:text-3xl text-white/90 mb-8">
                  Jameed Badawya
                </h2>
                
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  جميد بدوي تقليدي بلمسة حديثة، يجمع بين النكهة الأصيلة والتعبئة الصحية العصرية 
                  لتجربة فريدة وصحية تعكس أصالة التراث البدوي
                </p>

                <div className="flex gap-4 flex-wrap">
                  <Button 
                    size="lg" 
                    className="bg-white text-amber-700 hover:bg-white/90 px-8 transition-all duration-300 hover:scale-105"
                    onClick={handleQuoteClick}
                    data-testid="button-request-quote"
                  >
                    اطلب عرض سعر
                    <ChevronRight className="mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5" />
                  </Button>
                  
                  <Link to="/products">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white text-white hover:bg-white/10 transition-all duration-300"
                      data-testid="button-back-products"
                    >
                      <ArrowLeft className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5" />
                      العودة للمنتجات
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <img 
                    src="/jameed-badawya-package.png" 
                    alt="جميد البدوية"
                    className="w-full max-w-md mx-auto drop-shadow-xl transition-transform duration-500 hover:scale-105"
                    data-testid="img-product-jameed-badawya"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients & Features */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Ingredients */}
              <Card className="bg-gradient-glass backdrop-blur-sm border border-border/20 animate-fade-in-up">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-4">
                    <Package className="h-6 w-6 text-amber-600" />
                    المكونات
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {ingredients}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="bg-gradient-glass backdrop-blur-sm border border-border/20 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-amber-600" />
                    مميزات المنتج
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {productFeatures}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Specifications Table */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                المواصفات التفصيلية
              </h2>
              <p className="text-xl text-muted-foreground">
                الأحجام المتوفرة مع التفاصيل الكاملة
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-amber-700 to-amber-600 text-white">
                    <th className="px-6 py-4 text-right text-sm font-bold">المواصفة</th>
                    <th className="px-6 py-4 text-center text-sm font-bold">الحجم الكبير</th>
                    <th className="px-6 py-4 text-center text-sm font-bold">الحجم الصغير</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">Barcode</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{specifications[0].barcode}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{specifications[1].barcode}</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">Weight</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{specifications[0].weight}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{specifications[1].weight}</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">Packaging Type</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{specifications[0].packagingType}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{specifications[1].packagingType}</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">Net Weight</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{specifications[0].netWeight}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{specifications[1].netWeight}</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">Carton Dimensions</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{specifications[0].dimensions}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{specifications[1].dimensions}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                لماذا تختار جميد البدوية؟
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title}
                  className="text-center bg-gradient-glass backdrop-blur-sm border border-border/20 hover:shadow-lg 
                           hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-amber-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              الشهادات والمعايير
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              معتمد من أهم الجهات العالمية للجودة والسلامة الغذائية
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {certificates.map((cert, index) => (
                <Badge 
                  key={cert}
                  variant="secondary" 
                  className="bg-gradient-glass backdrop-blur-sm border border-amber-600/20 text-amber-700 
                           hover:bg-amber-600/10 transition-all duration-300 px-6 py-3 text-lg font-semibold
                           animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`badge-certificate-${index}`}
                >
                  <Shield className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-500 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              جاهز لتذوق التراث؟
            </h2>
            <p className="text-xl text-white/90 mb-8">
              اطلب جميد البدوية الآن واستمتع بالطعم البدوي الأصيل
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-white text-amber-700 hover:bg-white/90 px-8 transition-all duration-300 hover:scale-105"
                onClick={handleQuoteClick}
                data-testid="button-cta-quote"
              >
                <Package className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5" />
                اطلب عرض سعر
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 transition-all duration-300"
                data-testid="button-delivery-inquiry"
              >
                <Truck className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5" />
                استفسر عن التوصيل
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JameedBadawya;

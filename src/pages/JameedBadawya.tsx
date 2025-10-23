import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, ChevronRight, Award, Shield, ArrowLeft, Truck, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const JameedBadawya = () => {
  const navigate = useNavigate();
  const { language, t, dir } = useLanguage();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = language === 'ar'
      ? "جميد البدوية - الفرسان الرباعية | Jameed Al Badawia"
      : "Jameed Al Badawia - Al-Fursan Al-Rubaiah | Traditional Bedouin Jameed";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        language === 'ar'
          ? t('products.jameedBadawya.description')
          : 'Traditional Bedouin Jameed with a modern touch, combining authentic flavor and modern healthy packaging for a unique and healthy experience'
      );
    }
  }, [language, t]);

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

  const certificates = ['Halal', 'FDA', 'HACCP', language === 'ar' ? 'وزارة الصحة' : 'Ministry of Health'];

  const features = [
    {
      icon: Shield,
      title: language === 'ar' ? 'تراث بدوي أصيل' : 'Authentic Bedouin Heritage',
      description: language === 'ar' 
        ? 'وصفة تقليدية بدوية تم توارثها عبر الأجيال مع الحفاظ على أصالة المذاق' 
        : 'Traditional Bedouin recipe passed down through generations while preserving authentic taste'
    },
    {
      icon: Package,
      title: language === 'ar' ? 'تعبئة صحية حديثة' : 'Modern Healthy Packaging',
      description: language === 'ar' 
        ? 'تقنية Aseptic المتطورة تضمن سلامة المنتج والحفاظ على قيمته الغذائية' 
        : 'Advanced Aseptic technology ensures product safety and preserves nutritional value'
    },
    {
      icon: CheckCircle,
      title: language === 'ar' ? 'مكونات طبيعية' : 'Natural Ingredients',
      description: language === 'ar' 
        ? 'مصنوع من حليب الغنم الطازج مع البهارات الطبيعية بدون إضافات صناعية' 
        : 'Made from fresh sheep milk with natural spices without artificial additives'
    },
    {
      icon: Award,
      title: t('products.feature.quality.title'),
      description: language === 'ar' 
        ? 'يخضع للفحص والمراقبة المستمرة وفق أعلى معايير الجودة العالمية' 
        : 'Subject to continuous inspection and monitoring according to the highest international quality standards'
    }
  ];

  const handleQuoteClick = () => {
    navigate('/request-quote');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <section className="py-6 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">{t('common.home')}</Link>
              <ChevronRight className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              <Link to="/products" className="hover:text-primary transition-colors">{t('common.products')}</Link>
              <ChevronRight className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              <span className="text-foreground font-medium">{t('products.jameedBadawya.name')}</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-hero text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <Badge className="mb-6 bg-primary-foreground/10 text-primary-foreground">
                  {t('common.featured')}
                </Badge>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {t('products.jameedBadawya.name')}
                </h1>
                
                <h2 className="text-2xl md:text-3xl text-primary-foreground/90 mb-8">
                  {t('products.jameedBadawya.nameEn')}
                </h2>
                
                <p className="text-xl text-primary-foreground/90 leading-relaxed mb-8">
                  {t('products.jameedBadawya.description')}
                </p>

                <div className="flex gap-4 flex-wrap">
                  <Button 
                    size="lg" 
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8"
                    onClick={handleQuoteClick}
                    data-testid="button-request-quote"
                  >
                    {t('nav.requestQuote')}
                    <ChevronRight className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                  </Button>
                  
                  <Link to="/products">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                      data-testid="button-back-products"
                    >
                      <ArrowLeft className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                      {t('products.backToProducts')}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <img 
                    src="/jameed-badawya-package.png" 
                    alt={t('products.jameedBadawya.name')}
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
                    {t('products.ingredients')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {language === 'ar' 
                      ? '100% جميد نقي (حليب غنم طازج مبستر، ملح، بادئ) ماء، بهارات، ملح.' 
                      : '100% pure Jameed (fresh pasteurized sheep milk, salt, starter culture), water, spices, salt.'}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="bg-gradient-glass backdrop-blur-sm border border-border/20 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-amber-600" />
                    {t('products.features')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t('products.jameedBadawya.features')}
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
                {t('products.specifications')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {language === 'ar' ? 'الأحجام المتوفرة مع التفاصيل الكاملة' : 'Available sizes with complete details'}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-amber-700 to-amber-600 text-white">
                    <th className={`px-6 py-4 text-sm font-bold ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' ? 'المواصفة' : 'Specification'}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold">
                      {language === 'ar' ? 'الحجم الكبير' : 'Large Size'}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold">
                      {language === 'ar' ? 'الحجم الصغير' : 'Small Size'}
                    </th>
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
                {language === 'ar' ? 'لماذا تختار جميد البدوية؟' : 'Why Choose Jameed Al Badawia?'}
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
              {t('products.certificates')}
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              {language === 'ar' 
                ? 'معتمد من أهم الجهات العالمية للجودة والسلامة الغذائية' 
                : 'Certified by the most important international quality and food safety authorities'}
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
                  <Shield className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
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
              {language === 'ar' ? 'جاهز لتذوق التراث؟' : 'Ready to Taste Heritage?'}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {language === 'ar' 
                ? 'اطلب جميد البدوية الآن واستمتع بالطعم البدوي الأصيل' 
                : 'Order Jameed Al Badawia now and enjoy the authentic Bedouin taste'}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-white text-amber-700 hover:bg-white/90 px-8 transition-all duration-300 hover:scale-105"
                onClick={handleQuoteClick}
                data-testid="button-cta-quote"
              >
                <Package className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                {t('nav.requestQuote')}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 transition-all duration-300"
                data-testid="button-delivery-inquiry"
              >
                <Truck className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                {language === 'ar' ? 'استفسر عن التوصيل' : 'Inquire About Delivery'}
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

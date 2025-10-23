import { Package, Award, Truck, Shield, Sparkles, ChevronRight, Eye, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import productionLineImage from "@/assets/production-line.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const ProductShowcase = () => {
  const { language, t, dir } = useLanguage();
  const navigate = useNavigate();
  
  const jameedProducts = [
    {
      id: 'jameedna-zaman',
      name: language === 'ar' ? 'جميدنا زمان' : 'Jameedna Zaman',
      nameEn: 'Jameedna Zaman',
      ingredients: t('products.jameednaZaman.ingredients'),
      features: t('products.jameednaZaman.features'),
      certificates: ['ISO', 'HACCP', 'FDA'],
      image: '/jameedna-zaman-package.png',
      sizes: [
        {
          size: 1,
          barcode: '6251591112205',
          weight: '1000 gm',
          netWeight: '2.2 lbs',
          packagingType: 'Aseptic',
          dimensions: '19.5cm x 10.5cm x 7cm'
        },
        {
          size: 2,
          barcode: '6251591112199',
          weight: '500 gm',
          netWeight: '1.1 lbs',
          packagingType: 'Aseptic',
          dimensions: '9cm x 9.5cm x 6.5cm'
        }
      ]
    },
    {
      id: 'jameed-badawya',
      name: language === 'ar' ? 'جميد البدوية' : 'Jameed Al Badawia',
      nameEn: 'Jameed Al Badawia',
      ingredients: language === 'ar' ? '100% جميد نقي (حليب غنم طازج مبستر، ملح، بادئ) ماء، بهارات، ملح.' : '100% pure Jameed (fresh pasteurized sheep milk, salt, starter culture), water, spices, salt.',
      features: t('products.jameedBadawya.features'),
      certificates: ['Halal', 'FDA', 'HACCP'],
      image: '/jameed-badawya-package.png',
      sizes: [
        {
          size: 1,
          barcode: '6251591112229',
          weight: '1000 gm',
          netWeight: '2.2 lbs',
          packagingType: 'Aseptic',
          dimensions: '19.5cm x 10.5cm x 7cm'
        },
        {
          size: 2,
          barcode: '6251591112212',
          weight: '500 gm',
          netWeight: '1.1 lbs',
          packagingType: 'Aseptic',
          dimensions: '9cm x 9.5cm x 6.5cm'
        }
      ]
    },
    {
      id: 'medjoul-dates',
      name: language === 'ar' ? 'التمر المجدول' : 'Medjoul Dates',
      nameEn: 'Medjoul Dates',
      ingredients: t('products.medjoulDates.ingredients'),
      features: t('products.medjoulDates.features'),
      certificates: ['ISO', 'HACCP', 'Halal'],
      image: '/medjoul-dates-package.png',
      sizes: [
        {
          size: 1,
          barcode: 'Coming Soon',
          weight: '5 kg',
          netWeight: '11 lbs',
          packagingType: 'Premium',
          dimensions: 'Various Sizes Available'
        },
        {
          size: 2,
          barcode: 'Coming Soon',
          weight: '1 kg',
          netWeight: '2.2 lbs',
          packagingType: 'Premium',
          dimensions: 'Various Sizes Available'
        }
      ]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: language === 'ar' ? 'جودة عالمية' : 'World-Class Quality',
      description: language === 'ar' ? 'شهادات ISO وHACCP وHalal وFDA' : 'ISO, HACCP, Halal, and FDA Certified',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      icon: Package,
      title: language === 'ar' ? 'تعبئة عصرية' : 'Modern Packaging',
      description: language === 'ar' ? 'تقنية Aseptic للحفاظ على الجودة' : 'Aseptic Technology to Preserve Quality',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Truck,
      title: language === 'ar' ? 'توريد سريع' : 'Fast Delivery',
      description: language === 'ar' ? 'خدمة توصيل لجميع أنحاء العالم' : 'Worldwide Delivery Service',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      icon: Award,
      title: language === 'ar' ? 'خبرة 20+ عام' : '20+ Years Experience',
      description: language === 'ar' ? 'رائدون في صناعة الجميد الأردني' : 'Leaders in Jordanian Jameed Manufacturing',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden" id="products" dir={dir}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-glass backdrop-blur-sm 
                        border border-primary/20 mb-4 sm:mb-6 animate-fade-in-up">
            <Sparkles className="h-4 sm:h-5 w-4 sm:w-5 text-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-primary">{t('home.products.badge')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up 
                        bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            {t('home.products.title')}
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-in-right px-4 sm:px-0">
            {language === 'ar' 
              ? 'نفخر بتقديم أجود أنواع الجميد الأردني المصنوع بأعلى معايير الجودة العالمية' 
              : 'We are proud to offer the finest types of Jordanian Jameed made with the highest international quality standards'}
            <br className="hidden sm:block" />
            <span className="text-primary font-semibold">
              {language === 'ar' ? 'طعم أصيل، جودة استثنائية' : 'Authentic Taste, Exceptional Quality'}
            </span>
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-24">
          {jameedProducts.map((product, index) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <Card 
                className="group relative overflow-hidden bg-gradient-glass backdrop-blur-lg border border-border/20 
                         hover:shadow-glass hover:scale-105 transition-all duration-700 animate-fade-in-up rounded-3xl 
                         cursor-pointer"
                style={{ animationDelay: `${index * 200}ms` }}
              >
              {/* Premium Badge */}
              <div className="absolute top-6 right-6 z-20">
                <Badge className="bg-gradient-primary text-primary-foreground border border-primary-foreground/20 
                               shadow-glow animate-pulse">
                  {t('common.featured')}
                </Badge>
              </div>

              {/* Product Header with White Background */}
              <div className="h-80 sm:h-96 md:h-[450px] bg-white relative overflow-hidden rounded-t-3xl">
                {/* Product Image */}
                <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 md:p-12">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain drop-shadow-xl 
                             transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Product Title */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary/90 to-transparent">
                  <div className="text-white">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1">{product.name}</h3>
                    <p className="text-white/90 text-base sm:text-lg font-medium">{product.nameEn}</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 sm:p-8">
                {/* Product Ingredients */}
                <div className="mb-6 sm:mb-8">
                  <h4 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                    <Package className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                    {t('products.ingredients')}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {product.ingredients}
                  </p>
                </div>

                {/* Product Features */}
                <div className="mb-6 sm:mb-8">
                  <h4 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                    <Shield className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                    {language === 'ar' ? 'مميزات المنتج' : 'Product Features'}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {product.features}
                  </p>
                </div>

                {/* Product Specifications Table */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <h4 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <BarChart3 className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                    {language === 'ar' ? 'المواصفات التفصيلية' : 'Detailed Specifications'}
                  </h4>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gradient-glass">
                          <th className="p-3 text-right text-xs sm:text-sm font-semibold border border-border/20"></th>
                          <th className="p-3 text-center text-xs sm:text-sm font-semibold border border-border/20">
                            {language === 'ar' ? 'الحجم 1' : 'Size 1'}
                          </th>
                          <th className="p-3 text-center text-xs sm:text-sm font-semibold border border-border/20">
                            {language === 'ar' ? 'الحجم 2' : 'Size 2'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 text-right text-xs sm:text-sm font-medium bg-muted/30 border border-border/20">Barcode</td>
                          <td className="p-3 text-center text-xs sm:text-sm border border-border/20">{product.sizes[0].barcode}</td>
                          <td className="p-3 text-center text-xs sm:text-sm border border-border/20">{product.sizes[1].barcode}</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-right text-xs sm:text-sm font-medium bg-muted/30 border border-border/20">Weight</td>
                          <td className="p-3 text-center text-xs sm:text-sm border border-border/20">{product.sizes[0].weight}</td>
                          <td className="p-3 text-center text-xs sm:text-sm border border-border/20">{product.sizes[1].weight}</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-right text-xs sm:text-sm font-medium bg-muted/30 border border-border/20">Packaging Type</td>
                          <td className="p-3 text-center text-xs sm:text-sm border border-border/20">{product.sizes[0].packagingType}</td>
                          <td className="p-3 text-center text-xs sm:text-sm border border-border/20">{product.sizes[1].packagingType}</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-right text-xs sm:text-sm font-medium bg-muted/30 border border-border/20">Net Weight</td>
                          <td className="p-3 text-center text-xs sm:text-sm border border-border/20">{product.sizes[0].netWeight}</td>
                          <td className="p-3 text-center text-xs sm:text-sm border border-border/20">{product.sizes[1].netWeight}</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-right text-xs sm:text-sm font-medium bg-muted/30 border border-border/20">Carton Dimensions<br/>(H x W x D)</td>
                          <td className="p-3 text-center text-xs sm:text-sm border border-border/20">{product.sizes[0].dimensions}</td>
                          <td className="p-3 text-center text-xs sm:text-sm border border-border/20">{product.sizes[1].dimensions}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Action Button with Modern Design */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="group relative overflow-hidden text-xs sm:text-sm"
                    asChild
                  >
                    <span>
                      <Eye className="ml-2 rtl:ml-0 rtl:mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    </span>
                  </Button>
                  <Button 
                    variant="default"
                    size="lg"
                    className="group relative overflow-hidden text-xs sm:text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate('/request-quote');
                      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                    }}
                    data-testid="button-request-quote"
                  >
                    <Package className="ml-2 rtl:ml-0 rtl:mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    {language === 'ar' ? 'اطلب عرض سعر' : 'Request Quote'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>

        {/* Features Grid with Modern Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group text-center bg-gradient-glass backdrop-blur-lg border border-border/20 
                       hover:shadow-glass hover:scale-105 hover:-translate-y-2 transition-all duration-500 
                       animate-fade-in-up rounded-2xl"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 
                              group-hover:scale-110 transition-transform duration-300 relative`}>
                  <feature.icon className={`h-8 w-8 ${feature.color} transition-transform duration-300`} />
                  <div className={`absolute inset-0 ${feature.bg} rounded-2xl opacity-0 group-hover:opacity-75 
                                blur-md transition-opacity duration-300`} />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 sm:mt-20 text-center">
          <Card className="bg-gradient-hero text-primary-foreground relative overflow-hidden rounded-2xl sm:rounded-3xl">
            <CardContent className="p-8 sm:p-12">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] 
                            bg-[length:30px_30px] animate-shimmer" />
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                  {language === 'ar' ? 'جاهز لتجربة الطعم الأصيل؟' : 'Ready to Experience the Authentic Taste?'}
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  {language === 'ar' 
                    ? 'اطلب منتجاتنا الآن واستمتع بأجود أنواع الجميد الأردني الأصيل' 
                    : 'Order our products now and enjoy the finest authentic Jordanian Jameed'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link to="/products">
                    <Button 
                      variant="glass" 
                      size="lg" 
                      className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20"
                    >
                      <Eye className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5" />
                      {language === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
                      <ChevronRight className="mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20"
                    onClick={() => {
                      navigate('/request-quote');
                      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                    }}
                    data-testid="button-request-quote-full"
                  >
                    <Package className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5" />
                    {language === 'ar' ? 'اطلب عرض سعر شامل' : 'Request Comprehensive Quote'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;

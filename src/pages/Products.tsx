import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, ChevronRight, Award, Shield, Sparkles, Eye, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Products = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "منتجاتنا - الفرسان الرباعية | Al Fursan Quadruple Products";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'اكتشف مجموعة منتجات الفرسان الرباعية من الجميد الأردني الأصيل - جميدنا زمان وجميد البدوية بأعلى معايير الجودة العالمية');
    }
  }, []);

  const products = [
    {
      id: 'jameedna-zaman',
      name: 'جميدنا زمان',
      nameEn: 'Jameedna Zaman',
      description: 'جميد أردني أصيل مصنوع من حليب الغنم الطازج المبستر، معبأ بطريقة عصرية تحافظ على الطعم التقليدي الأصيل',
      ingredients: '100% جميد نقي (حليب غنم طازج مبستر، ملح، بادئ) ماء، بهارات، ملح.',
      features: 'جميد مغسول وخالي من كافة الشوائب، محلول بماء معقم، مطبوخ ومعبأ في باكيت كارتون معقم، محكم الإغلاق.',
      image: '/jameedna-zaman-package.png',
      certificates: ['ISO 22000', 'HACCP', 'FDA'],
      link: '/products/jameedna-zaman',
      gradient: 'from-blue-600 to-blue-800',
      sizes: [
        {
          size: '1000 gm',
          barcode: '6251591112205',
          weight: '1000 gm',
          netWeight: '2.2 lbs',
          packagingType: 'Aseptic',
          dimensions: '19.5cm x 10.5cm x 7cm'
        },
        {
          size: '500 gm',
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
      name: 'جميد البدوية',
      nameEn: 'Jameed Badawya',
      description: 'جميد بدوي تقليدي بلمسة حديثة، يجمع بين النكهة الأصيلة والتعبئة الصحية العصرية لتجربة فريدة وصحية',
      ingredients: '100% جميد نقي (حليب غنم طازج مبستر، ملح، بادئ) ماء، بهارات، ملح.',
      features: 'جميد مغسول وخالي من كافة الشوائب، محلول بماء معقم، مطبوخ ومعبأ في باكيت كارتون معقم، محكم الإغلاق.',
      image: '/jameed-badawya-package.png',
      certificates: ['Halal', 'FDA', 'HACCP'],
      link: '/products/jameed-badawya',
      gradient: 'from-amber-700 to-amber-900',
      sizes: [
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
      ]
    }
  ];

  const handleProductClick = (link: string) => {
    navigate(link);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleQuoteClick = () => {
    navigate('/request-quote');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-hero text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 bg-primary-foreground/10 text-primary-foreground">
              منتجاتنا المميزة
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              منتجات الجميد الأصيل
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              اكتشف مجموعة منتجاتنا من الجميد الأردني الأصيل
              <br />
              طعم أصيل • جودة استثنائية • تراث أردني
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {products.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group relative overflow-hidden bg-gradient-glass backdrop-blur-lg border border-border/20 
                           hover:shadow-glass hover:scale-105 transition-all duration-700 animate-fade-in-up rounded-3xl 
                           cursor-pointer"
                  style={{ animationDelay: `${index * 200}ms` }}
                  onClick={() => handleProductClick(product.link)}
                  data-testid={`card-product-${product.id}`}
                >
                  {/* Premium Badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <Badge className="bg-gradient-primary text-primary-foreground border border-primary-foreground/20 
                                   shadow-glow animate-pulse">
                      منتج مميز
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
                        data-testid={`img-product-${product.id}`}
                      />
                    </div>
                    
                    {/* Product Title */}
                    <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t ${product.gradient} to-transparent`}>
                      <div className="text-white">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{product.name}</h2>
                        <p className="text-white/90 text-lg sm:text-xl font-medium">{product.nameEn}</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 sm:p-8">
                    {/* Product Description */}
                    <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                      {product.description}
                    </p>

                    {/* Product Ingredients */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                        <Package className="h-5 w-5 text-primary" />
                        المكونات
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {product.ingredients}
                      </p>
                    </div>

                    {/* Product Features */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                        <Shield className="h-5 w-5 text-primary" />
                        مميزات المنتج
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {product.features}
                      </p>
                    </div>

                    {/* Specifications Preview */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        الأحجام المتوفرة
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {product.sizes.map((size, idx) => (
                          <div 
                            key={idx} 
                            className="bg-gradient-glass backdrop-blur-sm border border-border/20 rounded-xl p-4 text-center"
                          >
                            <div className="text-2xl font-bold text-primary mb-2">{size.weight}</div>
                            <div className="text-sm text-muted-foreground">{size.packagingType}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certificates */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        الشهادات والمعايير
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {product.certificates.map((cert, idx) => (
                          <Badge 
                            key={cert} 
                            variant="secondary" 
                            className="bg-gradient-glass backdrop-blur-sm border border-primary/20 text-primary 
                                     hover:bg-primary/10 transition-all duration-300 px-4 py-2 font-semibold"
                            data-testid={`badge-certificate-${product.id}-${idx}`}
                          >
                            <Shield className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button 
                        variant="default"
                        size="lg"
                        className="group relative overflow-hidden"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product.link);
                        }}
                        data-testid={`button-view-details-${product.id}`}
                      >
                        <Eye className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        عرض التفاصيل
                        <ChevronRight className="mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="group"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuoteClick();
                        }}
                        data-testid={`button-quote-${product.id}`}
                      >
                        <Package className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        اطلب عرض سعر
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Features */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                لماذا تختار منتجاتنا؟
              </h2>
              <p className="text-xl text-muted-foreground">
                التزامنا بالجودة والأصالة في كل منتج
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'جودة مضمونة',
                  description: 'شهادات عالمية ISO، HACCP، FDA، Halal',
                  color: 'text-emerald-600',
                  bg: 'bg-emerald-50'
                },
                {
                  icon: Package,
                  title: 'تعبئة عصرية',
                  description: 'تقنية Aseptic للحفاظ على الجودة والنضارة',
                  color: 'text-blue-600',
                  bg: 'bg-blue-50'
                },
                {
                  icon: Award,
                  title: 'خبرة 20+ عام',
                  description: 'رائدون في صناعة الجميد الأردني الأصيل',
                  color: 'text-purple-600',
                  bg: 'bg-purple-50'
                },
                {
                  icon: Sparkles,
                  title: 'منتجات طبيعية',
                  description: '100% طبيعي بدون مواد حافظة أو ألوان صناعية',
                  color: 'text-amber-600',
                  bg: 'bg-amber-50'
                }
              ].map((feature, index) => (
                <Card 
                  key={feature.title}
                  className="text-center bg-gradient-glass backdrop-blur-sm border border-border/20 hover:shadow-lg 
                           hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              جاهز لتجربة الطعم الأصيل؟
            </h2>
            <p className="text-xl text-white/90 mb-8">
              اطلب منتجاتنا الآن واستمتع بأجود أنواع الجميد الأردني الأصيل
            </p>
            <Button 
              variant="outline"
              size="lg" 
              className="border-white text-white hover:bg-white/10 px-8 transition-all duration-300 hover:scale-105"
              onClick={handleQuoteClick}
              data-testid="button-cta-quote"
            >
              <Package className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5" />
              اطلب عرض سعر شامل
              <ChevronRight className="mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;

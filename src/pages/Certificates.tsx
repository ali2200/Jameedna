import { useEffect } from "react";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import productionExcellenceImage from "@/assets/production-excellence.png";

const Certificates = () => {
  useEffect(() => {
    document.title = "الشهادات والجودة - الفرسان الرباعية | Quality & Certificates";
  }, []);


  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-hero text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 bg-primary-foreground/10 text-primary-foreground">
              الشهادات والجودة
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              معايير الجودة العالمية
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              نلتزم بأعلى معايير الجودة والسلامة المعترف بها عالمياً لضمان تقديم منتجات آمنة وعالية الجودة
            </p>
            
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-3 text-lg">
              <Download className="ml-2 h-5 w-5" />
              تحميل ملف الشهادات
            </Button>
          </div>
        </section>

        {/* Certificates Visual Display */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                شهاداتنا المعتمدة
              </h2>
              <p className="text-muted-foreground">
                نفتخر بحصولنا على أهم الشهادات العالمية
              </p>
            </div>
            
            {/* Certificates Logos Display */}
            <div className="bg-white rounded-3xl p-12 shadow-card">
              {/* First Row - Main Certificates */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center mb-8">
                <div className="text-center">
                  <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 p-2">
                    <img 
                      src="/assets/images/certificate-1.png"
                      alt="ISO 22000 Certificate"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="font-bold text-foreground text-sm">ISO 22000</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 p-2">
                    <img 
                      src="/assets/images/certificate-2.png"
                      alt="ISO 9001 Certificate"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="font-bold text-foreground text-sm">ISO 9001</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 p-2">
                    <img 
                      src="/assets/images/certificate-3.png"
                      alt="Halal Certificate"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="font-bold text-foreground text-sm">HALAL</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 p-2">
                    <img 
                      src="/assets/images/certificate-4.png"
                      alt="FDA Approved Certificate"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="font-bold text-foreground text-sm">FDA</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 p-2">
                    <img 
                      src="/assets/images/certificate-5.png"
                      alt="TÜV Austria Certificate"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="font-bold text-foreground text-sm">TÜV AUSTRIA</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 p-2">
                    <img 
                      src="/assets/images/certificate-6.png"
                      alt="Made in Jordan Certificate"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="font-bold text-foreground text-sm">صنع في الأردن</p>
                </div>
              </div>
              
              {/* Second Row - Additional FDA Logos */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-center text-lg font-semibold text-foreground mb-6">شهادات FDA الإضافية</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
                  <div className="text-center">
                    <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 p-2">
                      <img 
                        src="/assets/images/industry-cert-1.png"
                        alt="FDA Gold Approved Certificate"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="font-bold text-foreground text-sm">FDA Gold</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 p-2">
                      <img 
                        src="/assets/images/industry-cert-2.png"
                        alt="FDA Red Stamp Certificate"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="font-bold text-foreground text-sm">FDA Stamp</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 p-2">
                      <img 
                        src="/assets/images/industry-cert-3.png"
                        alt="FDA Green Badge Certificate"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="font-bold text-foreground text-sm">FDA Badge</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 p-2">
                      <img 
                        src="/assets/images/industry-cert-4.png"
                        alt="FDA Green Check Certificate"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="font-bold text-foreground text-sm">FDA Check</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 p-2">
                      <img 
                        src="/assets/images/industry-cert-5.png"
                        alt="FDA Black Text Certificate"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="font-bold text-foreground text-sm">FDA Black</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 p-2">
                      <img 
                        src="/assets/images/industry-cert-6.png"
                        alt="FDA Red Badge Certificate"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="font-bold text-foreground text-sm">FDA Red</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Production Excellence */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={productionExcellenceImage} 
                    alt="خطوط الإنتاج في مصنع الفرسان الرباعية"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
                </div>
                
                <CardContent className="p-12 bg-gradient-primary text-primary-foreground flex items-center">
                  <div className="w-full">
                    <h3 className="text-3xl font-bold mb-4">التميز في الإنتاج</h3>
                    <p className="text-xl text-primary-foreground/90 mb-8">
                      مصنع حديث مجهز بأحدث التقنيات العالمية
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">+20</div>
                        <div className="text-primary-foreground/80 text-sm">عامًا من الخبرة</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">100%</div>
                        <div className="text-primary-foreground/80 text-sm">ضمان الجودة</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">24/7</div>
                        <div className="text-primary-foreground/80 text-sm">مراقبة مستمرة</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">6+</div>
                        <div className="text-primary-foreground/80 text-sm">شهادات دولية</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Certificates;
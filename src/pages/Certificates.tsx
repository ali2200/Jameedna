import { useEffect } from "react";
import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import productionExcellenceImage from "@/assets/production-excellence.png";

const Certificates = () => {
  const { language, t, dir } = useLanguage();

  useEffect(() => {
    document.title = language === 'ar'
      ? "الشهادات والجودة - الفرسان الرباعية | Quality & Certificates"
      : "Quality & Certificates - Al-Fursan Al-Rubaiah | International Standards";
      
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        language === 'ar'
          ? 'حاصلون على شهادات الجودة العالمية ISO 22000, ISO 9001, HACCP, FDA, Halal وأكثر - نلتزم بأعلى معايير السلامة الغذائية'
          : 'Certified with international quality standards ISO 22000, ISO 9001, HACCP, FDA, Halal and more - We commit to highest food safety standards'
      );
    }
  }, [language]);

  const downloadCompanyProfile = () => {
    window.open('/alfursan-company-profile.pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-hero text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 bg-primary-foreground/10 text-primary-foreground">
              {t('certificates.hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('certificates.hero.title')}
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              {t('certificates.hero.description')}
            </p>
            
            <Button 
              onClick={downloadCompanyProfile}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-3 text-lg"
              data-testid="button-download-certificates"
            >
              <Download className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
              {t('certificates.downloadFile')}
            </Button>
          </div>
        </section>

        {/* Certificates Visual Display */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('certificates.ourCertificates.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('certificates.ourCertificates.description')}
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
                  <p className="font-bold text-foreground text-sm">
                    {language === 'ar' ? 'صنع في الأردن' : 'Made in Jordan'}
                  </p>
                </div>
              </div>
              
              {/* Second Row - Additional FDA Logos */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-center text-lg font-semibold text-foreground mb-6">
                  {language === 'ar' ? 'شهادات FDA الإضافية' : 'Additional FDA Certificates'}
                </h3>
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
                    alt={language === 'ar' ? 'خطوط الإنتاج في مصنع الفرسان الرباعية' : 'Production lines at Al-Fursan Al-Rubaiah factory'}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
                </div>
                
                <CardContent className="p-12 bg-gradient-primary text-primary-foreground flex items-center">
                  <div className="w-full">
                    <h3 className="text-3xl font-bold mb-4">
                      {language === 'ar' ? 'التميز في الإنتاج' : 'Production Excellence'}
                    </h3>
                    <p className="text-xl text-primary-foreground/90 mb-8">
                      {language === 'ar' 
                        ? 'مصنع حديث مجهز بأحدث التقنيات العالمية' 
                        : 'Modern factory equipped with latest international technologies'}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">+20</div>
                        <div className="text-primary-foreground/80 text-sm">
                          {language === 'ar' ? 'عامًا من الخبرة' : 'Years of Experience'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">100%</div>
                        <div className="text-primary-foreground/80 text-sm">
                          {language === 'ar' ? 'ضمان الجودة' : 'Quality Assurance'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">24/7</div>
                        <div className="text-primary-foreground/80 text-sm">
                          {language === 'ar' ? 'مراقبة مستمرة' : 'Continuous Monitoring'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">6+</div>
                        <div className="text-primary-foreground/80 text-sm">
                          {language === 'ar' ? 'شهادات دولية' : 'International Certificates'}
                        </div>
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

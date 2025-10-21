import { Award, Shield, CheckCircle, Globe, FileCheck, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const factoryWorkersImage = "/factory-workers.png";

const QualityCertificates = () => {
  const { language, t, dir } = useLanguage();
  
  const certificates = [
    {
      name: "ISO 22000",
      description: language === 'ar' ? "إدارة سلامة الغذاء" : "Food Safety Management",
      icon: Shield,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      name: "ISO 9001",
      description: language === 'ar' ? "إدارة الجودة" : "Quality Management",
      icon: Award,
      color: "text-jameed-red",
      bgColor: "bg-jameed-red/10"
    },
    {
      name: "HACCP",
      description: language === 'ar' ? "تحليل المخاطر ونقاط التحكم الحرجة" : "Hazard Analysis and Critical Control Points",
      icon: CheckCircle,
      color: "text-badawya-gold",
      bgColor: "bg-badawya-gold/10"
    },
    {
      name: "HALAL FOOD",
      description: language === 'ar' ? "شهادة الحلال المعتمدة" : "Certified Halal Certificate",
      icon: Star,
      color: "text-primary-light",
      bgColor: "bg-primary-light/10"
    },
    {
      name: "FDA",
      description: language === 'ar' ? "إدارة الغذاء والدواء الأمريكية" : "US Food and Drug Administration",
      icon: FileCheck,
      color: "text-jameed-burgundy",
      bgColor: "bg-jameed-burgundy/10"
    },
    {
      name: "EUR.1",
      description: language === 'ar' ? "شهادة المنشأ الأوروبية" : "European Certificate of Origin",
      icon: Globe,
      color: "text-badawya-sand",
      bgColor: "bg-badawya-sand/10"
    }
  ];

  return (
    <section className="py-24 bg-background" id="quality" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            {t('home.certificates.badge')}
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('home.certificates.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('home.certificates.description')}
          </p>
        </div>

        {/* Certificates Visual Display */}
        <div className="bg-white rounded-3xl p-12 shadow-card mb-20">
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
                  alt={language === 'ar' ? 'صنع في الأردن' : 'Made in Jordan Certificate'}
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

        {/* Production Capacity Banner */}
        <div className="mt-16">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Production Image */}
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={factoryWorkersImage} 
                  alt={language === 'ar' ? 'عمال مصنع الفرسان الرباعية' : 'Al Fursan Factory Workers'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-jameed-red/80 to-transparent"></div>
              </div>
              
              {/* Content */}
              <CardContent className="p-12 bg-gradient-jameed text-white flex items-center">
                <div className="w-full">
                  <h3 className="text-3xl font-bold mb-4">
                    {language === 'ar' ? 'طاقة إنتاجية عالية' : 'High Production Capacity'}
                  </h3>
                  <p className="text-xl text-white/90 mb-8">
                    {language === 'ar' 
                      ? 'نلبي احتياجات السوق المحلي والدولي بكفاءة عالية' 
                      : 'Meeting local and international market needs with high efficiency'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">24/7</div>
                      <div className="text-white/80 text-sm">
                        {language === 'ar' ? 'خطوط إنتاج متواصلة' : 'Continuous Production Lines'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">1000+</div>
                      <div className="text-white/80 text-sm">
                        {language === 'ar' ? 'وحدة يومياً' : 'Units Daily'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">18</div>
                      <div className="text-white/80 text-sm">
                        {language === 'ar' ? 'شهر مدة صلاحية' : 'Months Shelf Life'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QualityCertificates;

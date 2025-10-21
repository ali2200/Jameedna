import { Award, Shield, CheckCircle, Globe, FileCheck, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const factoryWorkersImage = "/factory-workers.png";

const QualityCertificates = () => {
  const certificates = [
    {
      name: "ISO 22000",
      description: "إدارة سلامة الغذاء",
      icon: Shield,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      name: "ISO 9001",
      description: "إدارة الجودة",
      icon: Award,
      color: "text-jameed-red",
      bgColor: "bg-jameed-red/10"
    },
    {
      name: "HACCP",
      description: "تحليل المخاطر ونقاط التحكم الحرجة",
      icon: CheckCircle,
      color: "text-badawya-gold",
      bgColor: "bg-badawya-gold/10"
    },
    {
      name: "HALAL FOOD",
      description: "شهادة الحلال المعتمدة",
      icon: Star,
      color: "text-primary-light",
      bgColor: "bg-primary-light/10"
    },
    {
      name: "FDA",
      description: "إدارة الغذاء والدواء الأمريكية",
      icon: FileCheck,
      color: "text-jameed-burgundy",
      bgColor: "bg-jameed-burgundy/10"
    },
    {
      name: "EUR.1",
      description: "شهادة المنشأ الأوروبية",
      icon: Globe,
      color: "text-badawya-sand",
      bgColor: "bg-badawya-sand/10"
    }
  ];

  return (
    <section className="py-24 bg-background" id="quality">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">الجودة والشهادات</Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            التزام بأعلى معايير الجودة العالمية
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            نلتزم بتطبيق أنظمة الجودة العالمية لضمان سلامة وأمان منتجاتنا، 
            مع الحصول على أهم الشهادات المعترف بها دولياً
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

        {/* Production Capacity Banner */}
        <div className="mt-16">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Production Image */}
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={factoryWorkersImage} 
                  alt="عمال مصنع الفرسان الرباعية"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-jameed-red/80 to-transparent"></div>
              </div>
              
              {/* Content */}
              <CardContent className="p-12 bg-gradient-jameed text-white flex items-center">
                <div className="w-full">
                  <h3 className="text-3xl font-bold mb-4">طاقة إنتاجية عالية</h3>
                  <p className="text-xl text-white/90 mb-8">
                    نلبي احتياجات السوق المحلي والدولي بكفاءة عالية
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">24/7</div>
                      <div className="text-white/80 text-sm">خطوط إنتاج متواصلة</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">1000+</div>
                      <div className="text-white/80 text-sm">وحدة يومياً</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">18</div>
                      <div className="text-white/80 text-sm">شهر مدة صلاحية</div>
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
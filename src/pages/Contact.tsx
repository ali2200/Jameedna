import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { language, t, dir } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    document.title = language === 'ar'
      ? "اتصل بنا - الفرسان الرباعية | Contact Us"
      : "Contact Us - Al-Fursan Al-Rubaiah | Get in Touch";
      
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        language === 'ar'
          ? 'تواصل معنا للاستفسارات وطلبات عروض الأسعار - فريقنا جاهز لخدمتكم طوال أيام العمل'
          : 'Contact us for inquiries and quote requests - Our team is ready to serve you throughout business days'
      );
    }
  }, [language]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t('common.error'),
        description: language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
        variant: "destructive"
      });
      return;
    }

    toast({
      title: t('common.success'),
      description: language === 'ar' ? 'سنتواصل معكم في أقرب وقت ممكن' : 'We will contact you as soon as possible',
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      info: language === 'ar' ? 'المفرق - الزعتري - شارع بغداد القديم' : 'Al-Mafraq - Al-Zaatari - Old Baghdad Street',
      details: 'P.O.Box 841 Al-Mafraq 25110 Jordan'
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      info: '+962 2 626 4582 | +201147877414',
      details: 'Fax: +962 2 626 4474'
    },
    {
      icon: Mail,
      title: t('contact.email'),
      info: 'info@alfursanjo.com',
      details: 'www.altursanjo.com'
    },
    {
      icon: Clock,
      title: t('contact.workingHours'),
      info: language === 'ar' ? 'الأحد - الخميس' : 'Sunday - Thursday',
      details: language === 'ar' ? '8:00 ص - 6:00 م' : '8:00 AM - 6:00 PM'
    }
  ];

  const downloadCompanyProfile = () => {
    window.open('/alfursan-company-profile.pdf', '_blank');
    
    toast({
      title: language === 'ar' ? 'جاري التحميل' : 'Downloading',
      description: language === 'ar' ? 'تم فتح ملف الشركة في صفحة جديدة' : 'Company profile opened in a new page',
    });
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
              {t('contact.hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('contact.hero.title')}
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              {t('contact.hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={downloadCompanyProfile}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-3 text-lg"
              >
                <Download className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                {t('nav.downloadProfile')}
              </Button>
              <Button 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3 text-lg"
                onClick={() => {
                  const contactSection = document.getElementById('contact-form');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('contact.sendMessage')}
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('contact.info.title')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar' ? 'تواصلوا معنا عبر أي من الوسائل التالية' : 'Contact us through any of the following channels'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((item, index) => (
                <Card 
                  key={item.title}
                  className="text-center hover:shadow-glow transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-foreground mb-2">{item.info}</p>
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div id="contact-form">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t('contact.form.title')}</CardTitle>
                    <p className="text-muted-foreground">
                      {language === 'ar' ? 'املأ النموذج وسنتواصل معكم في أقرب وقت' : 'Fill the form and we will contact you soon'}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">{t('contact.form.name')} *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={language === 'ar' ? 'اكتب اسمك الكامل' : 'Enter your full name'}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">{t('contact.form.email')} *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="example@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+962 7X XXX XXXX"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">{t('contact.form.company')}</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder={language === 'ar' ? 'اسم شركتك' : 'Your company name'}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder={language === 'ar' ? 'موضوع الرسالة' : 'Message subject'}
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">{t('contact.form.message')} *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                          className="min-h-32"
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-primary hover:scale-105 transition-transform duration-300"
                      >
                        <Send className={`h-4 w-4 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                        {language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Map and Additional Info */}
              <div className="space-y-8">
                {/* Map Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'ar' ? 'موقعنا' : 'Our Location'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          {language === 'ar' ? 'خريطة الموقع ستظهر هنا' : 'Map location will appear here'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {language === 'ar' ? 'المفرق، المنطقة الصناعية، الأردن' : 'Al-Mafraq, Industrial Area, Jordan'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Services */}
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'ar' ? 'خدمات إضافية' : 'Additional Services'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Badge variant="outline">{language === 'ar' ? 'استشارات مجانية' : 'Free Consultation'}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'للطلبات الكبيرة' : 'For large orders'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Badge variant="outline">{language === 'ar' ? 'عينات مجانية' : 'Free Samples'}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'لتجربة المنتج' : 'To try our products'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Badge variant="outline">{language === 'ar' ? 'دعم فني' : 'Technical Support'}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'على مدار الساعة' : '24/7 Available'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

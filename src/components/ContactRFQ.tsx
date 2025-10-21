import { useState } from "react";
import { Phone, Mail, MapPin, Send, Building, User, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactRFQ = () => {
  const { language, t, dir } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    product: '',
    quantity: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Phone,
      label: t('contact.phone'),
      value: "+962 2 626 4582",
      value2: "+201147877414",
      color: "text-primary"
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: "info@alfursanjo.com",
      color: "text-jameed-red"
    },
    {
      icon: MapPin,
      label: t('contact.address'),
      value: language === 'ar' ? 'الأردن - المفرق' : 'Jordan - Mafraq',
      color: "text-badawya-gold"
    }
  ];

  const products = [
    { value: 'jameedna-zaman', label: language === 'ar' ? 'جميدنا زمان' : 'Jameedna Zaman' },
    { value: 'jameed-badawya', label: language === 'ar' ? 'جميد بدوية' : 'Jameed Badawya' },
    { value: 'mixed-order', label: language === 'ar' ? 'طلبية مختلطة' : 'Mixed Order' },
    { value: 'other', label: language === 'ar' ? 'منتج آخر' : 'Other Product' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.product) {
      toast({
        title: language === 'ar' ? 'خطأ في النموذج' : 'Form Error',
        description: language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields',
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: language === 'ar' ? 'تم إرسال طلبكم بنجاح' : 'Request Sent Successfully',
      description: language === 'ar' ? 'سنتواصل معكم خلال 24 ساعة لتقديم عرض السعر' : 'We will contact you within 24 hours to provide a quote',
    });

    // Reset form
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      product: '',
      quantity: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-24 bg-muted/30" id="contact" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            {t('contact.hero.badge')}
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {language === 'ar' 
              ? 'اطلب عرض سعر أو استفسر عن منتجاتنا' 
              : 'Request a Quote or Inquire About Our Products'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'فريقنا المتخصص جاهز لتقديم أفضل الأسعار والخدمات لشركتكم' 
              : 'Our specialized team is ready to provide the best prices and services for your company'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-6 w-6 text-primary ml-2 rtl:ml-0 rtl:mr-2" />
                  {t('contact.info.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={info.label} className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className={`w-12 h-12 ${info.color.replace('text-', 'bg-')}/10 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <info.icon className={`h-6 w-6 ${info.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{info.label}</h4>
                      <p className="text-muted-foreground">{info.value}</p>
                      {info.value2 && (
                        <p className="text-muted-foreground">{info.value2}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <CardTitle>{t('contact.workingHours')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {language === 'ar' ? 'الأحد - الخميس' : 'Sunday - Thursday'}
                    </span>
                    <span className="text-muted-foreground">
                      {language === 'ar' ? '8:00 ص - 5:00 م' : '8:00 AM - 5:00 PM'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {language === 'ar' ? 'الجمعة' : 'Friday'}
                    </span>
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'مغلق' : 'Closed'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {language === 'ar' ? 'السبت' : 'Saturday'}
                    </span>
                    <span className="text-muted-foreground">
                      {language === 'ar' ? '9:00 ص - 2:00 م' : '9:00 AM - 2:00 PM'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Website Info */}
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-2">
                  {language === 'ar' ? 'زوروا موقعنا الإلكتروني' : 'Visit Our Website'}
                </h4>
                <p className="text-primary-foreground/90 mb-4">
                  www.alfursanjo.com
                </p>
                <p className="text-sm text-primary-foreground/80">
                  {language === 'ar' 
                    ? 'لمزيد من المعلومات حول منتجاتنا وخدماتنا' 
                    : 'For more information about our products and services'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* RFQ Form */}
          <Card className="hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-6 w-6 text-primary ml-2 rtl:ml-0 rtl:mr-2" />
                {language === 'ar' ? 'نموذج طلب عرض سعر (RFQ)' : 'Request for Quote (RFQ) Form'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">
                      {t('contact.form.company')} *
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder={language === 'ar' ? 'اسم شركتكم' : 'Your company name'}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPerson">
                      {language === 'ar' ? 'اسم المسؤول' : 'Contact Person'} *
                    </Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      placeholder={language === 'ar' ? 'اسم الشخص المسؤول' : 'Contact person name'}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">
                      {t('contact.form.email')} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="company@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      {t('contact.form.phone')}
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+962 XX XXX XXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="product">
                      {language === 'ar' ? 'المنتج المطلوب' : 'Required Product'} *
                    </Label>
                    <Select value={formData.product} onValueChange={(value) => handleInputChange('product', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? 'اختر المنتج' : 'Select product'} />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.value} value={product.value}>
                            {product.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">
                      {language === 'ar' ? 'الكمية المطلوبة' : 'Required Quantity'}
                    </Label>
                    <Input
                      id="quantity"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: 1000 كرتونة' : 'Example: 1000 cartons'}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">
                    {language === 'ar' ? 'تفاصيل إضافية' : 'Additional Details'}
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder={language === 'ar' 
                      ? 'أي متطلبات خاصة أو استفسارات إضافية...' 
                      : 'Any special requirements or additional inquiries...'}
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90 shadow-elegant text-lg py-3"
                >
                  <Send className="ml-2 rtl:ml-0 rtl:mr-2 h-5 w-5" />
                  {language === 'ar' ? 'إرسال طلب العرض' : 'Send Quote Request'}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  {language === 'ar' 
                    ? '* الحقول المطلوبة | سنتواصل معكم خلال 24 ساعة' 
                    : '* Required fields | We will contact you within 24 hours'}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactRFQ;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, ChevronLeft, Upload, FileText, CheckCircle, Phone, Mail, HelpCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormData {
  companyName: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  packaging: string;
  deliveryDate: string;
  message: string;
  attachments: File[];
}

const RequestQuote = () => {
  const { toast } = useToast();
  const { language, t, dir } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    country: '',
    city: '',
    email: '',
    phone: '',
    product: '',
    quantity: '',
    packaging: '',
    deliveryDate: '',
    message: '',
    attachments: []
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = language === 'ar'
      ? "طلب عرض سعر - الفرسان الرباعية | Request Quote"
      : "Request Quote - Al-Fursan Al-Rubaiah | Get a Price Estimate";
      
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        language === 'ar'
          ? 'املأ النموذج لطلب عرض سعر لمنتجات الجميد الأردني الأصيل - سنتواصل معك خلال 48 ساعة عمل'
          : 'Fill the form to request a quote for authentic Jordanian Jameed products - We will contact you within 48 business hours'
      );
    }
  }, [language]);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { 
      id: 1, 
      title: language === 'ar' ? 'بيانات الشركة' : 'Company Information'
    },
    { 
      id: 2, 
      title: language === 'ar' ? 'تفاصيل الطلب' : 'Order Details'
    },
    { 
      id: 3, 
      title: language === 'ar' ? 'المرفقات' : 'Attachments'
    },
    { 
      id: 4, 
      title: language === 'ar' ? 'المراجعة والتأكيد' : 'Review & Submit'
    }
  ];

  const products = [
    { 
      value: 'jameedna-zaman', 
      label: language === 'ar' ? 'جميدنا زمان - Jameedna Zaman' : 'Jameedna Zaman'
    },
    { 
      value: 'jameed-badawya', 
      label: language === 'ar' ? 'جميد البدوية - Jameed Al Badawia' : 'Jameed Al Badawia'
    },
    { 
      value: 'other', 
      label: language === 'ar' ? 'أخرى - Other' : 'Other'
    }
  ];

  const packagingTypes = [
    { 
      value: 'carton', 
      label: language === 'ar' ? 'كرتون - Carton' : 'Carton'
    },
    { 
      value: 'aseptic', 
      label: language === 'ar' ? 'أسيبتك - Aseptic' : 'Aseptic'
    },
    { 
      value: 'custom', 
      label: language === 'ar' ? 'تعبئة مخصصة - Custom Packaging' : 'Custom Packaging'
    }
  ];

  const faqItems = [
    {
      question: language === 'ar' ? 'هل يوجد حد أدنى للطلب؟' : 'Is there a minimum order quantity?',
      answer: language === 'ar' ? 'نعم، الحد الأدنى للطلب هو 1000 كيلو' : 'Yes, minimum order quantity is 1000 kg'
    },
    {
      question: language === 'ar' ? 'كم يستغرق توصيل الطلب؟' : 'How long does delivery take?',
      answer: language === 'ar' ? '15-30 يوم عمل حسب الكمية والوجهة' : '15-30 business days depending on quantity and destination'
    },
    {
      question: language === 'ar' ? 'هل تتوفر عينات مجانية؟' : 'Are free samples available?',
      answer: language === 'ar' ? 'نعم، نوفر عينات مجانية للكميات التجارية' : 'Yes, we provide free samples for commercial quantities'
    }
  ];

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.companyName && formData.country && formData.city && formData.email && formData.phone);
      case 2:
        return !!(formData.product && formData.quantity && formData.packaging);
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast({
        title: language === 'ar' ? 'خطأ في البيانات' : 'Data Error',
        description: language === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    updateFormData('attachments', [...formData.attachments, ...files]);
  };

  const removeFile = (index: number) => {
    const newFiles = formData.attachments.filter((_, i) => i !== index);
    updateFormData('attachments', newFiles);
  };

  const handleSubmit = () => {
    if (validateStep(1) && validateStep(2)) {
      toast({
        title: language === 'ar' ? 'تم إرسال طلبكم بنجاح!' : 'Your request has been submitted successfully!',
        description: language === 'ar' ? 'سيتم التواصل معكم خلال 48 ساعة عمل' : 'We will contact you within 48 business hours',
      });
      
      setFormData({
        companyName: '',
        country: '',
        city: '',
        email: '',
        phone: '',
        product: '',
        quantity: '',
        packaging: '',
        deliveryDate: '',
        message: '',
        attachments: []
      });
      setCurrentStep(1);
    } else {
      toast({
        title: language === 'ar' ? 'خطأ في البيانات' : 'Data Error',
        description: language === 'ar' ? 'الرجاء مراجعة البيانات المدخلة' : 'Please review the entered data',
        variant: "destructive"
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">
                  {language === 'ar' ? 'اسم الشركة' : 'Company Name'} / {language === 'en' ? 'Company Name' : 'Company Name'} *
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل اسم الشركة' : 'Enter company name'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} / Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="company@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="country">
                  {language === 'ar' ? 'الدولة' : 'Country'} / Country *
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => updateFormData('country', e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل اسم الدولة' : 'Enter country name'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">
                  {language === 'ar' ? 'المدينة' : 'City'} / City *
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل اسم المدينة' : 'Enter city name'}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} / Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="+966 50 123 4567"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="product">
                {language === 'ar' ? 'المنتج' : 'Product'} / Product *
              </Label>
              <Select value={formData.product} onValueChange={(value) => updateFormData('product', value)}>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  {language === 'ar' ? 'الكمية' : 'Quantity'} / Quantity *
                </Label>
                <Input
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => updateFormData('quantity', e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: 5000 كيلو أو 100 كرتون' : 'Example: 5000 kg or 100 cartons'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="packaging">
                  {language === 'ar' ? 'نوع التغليف' : 'Packaging Type'} / Packaging Type *
                </Label>
                <Select value={formData.packaging} onValueChange={(value) => updateFormData('packaging', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ar' ? 'اختر نوع التغليف' : 'Select packaging type'} />
                  </SelectTrigger>
                  <SelectContent>
                    {packagingTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate">
                {language === 'ar' ? 'موعد التوريد المتوقع' : 'Expected Delivery Date'} / Expected Delivery Date
              </Label>
              <Input
                id="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => updateFormData('deliveryDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                {language === 'ar' ? 'ملاحظات إضافية' : 'Additional Notes'} / Additional Notes
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
                placeholder={language === 'ar' ? 'أي معلومات إضافية أو متطلبات خاصة' : 'Any additional information or special requirements'}
                rows={4}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-primary/50 transition-colors duration-300">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    {language === 'ar' ? 'رفع المرفقات' : 'Upload Attachments'}
                  </p>
                  <p className="text-muted-foreground">
                    {language === 'ar' 
                      ? 'يمكنك رفع أمر الشراء أو أي مستندات إضافية (اختياري)'
                      : 'You can upload purchase order or any additional documents (optional)'}
                  </p>
                  <input
                    type="file"
                    id="fileUpload"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Label htmlFor="fileUpload" className="cursor-pointer">
                    <Button variant="outline" className="mt-4" asChild>
                      <span>{language === 'ar' ? 'اختر الملفات' : 'Choose Files'}</span>
                    </Button>
                  </Label>
                </div>
              </div>
            </div>

            {formData.attachments.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">
                  {language === 'ar' ? 'الملفات المرفوعة:' : 'Uploaded Files:'}
                </h4>
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm">{file.name}</span>
                      <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      {language === 'ar' ? 'إزالة' : 'Remove'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle className={`h-5 w-5 text-green-500 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                {language === 'ar' ? 'مراجعة البيانات' : 'Review Data'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-primary">
                    {language === 'ar' ? 'بيانات الشركة' : 'Company Information'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">{language === 'ar' ? 'الشركة:' : 'Company:'}</span> {formData.companyName}</p>
                    <p><span className="font-medium">{language === 'ar' ? 'الدولة:' : 'Country:'}</span> {formData.country}</p>
                    <p><span className="font-medium">{language === 'ar' ? 'المدينة:' : 'City:'}</span> {formData.city}</p>
                    <p><span className="font-medium">{language === 'ar' ? 'البريد:' : 'Email:'}</span> {formData.email}</p>
                    <p><span className="font-medium">{language === 'ar' ? 'الهاتف:' : 'Phone:'}</span> {formData.phone}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-primary">
                    {language === 'ar' ? 'تفاصيل الطلب' : 'Order Details'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">{language === 'ar' ? 'المنتج:' : 'Product:'}</span> {products.find(p => p.value === formData.product)?.label}</p>
                    <p><span className="font-medium">{language === 'ar' ? 'الكمية:' : 'Quantity:'}</span> {formData.quantity}</p>
                    <p><span className="font-medium">{language === 'ar' ? 'التغليف:' : 'Packaging:'}</span> {packagingTypes.find(p => p.value === formData.packaging)?.label}</p>
                    {formData.deliveryDate && <p><span className="font-medium">{language === 'ar' ? 'موعد التوريد:' : 'Delivery Date:'}</span> {formData.deliveryDate}</p>}
                    {formData.message && <p><span className="font-medium">{language === 'ar' ? 'ملاحظات:' : 'Notes:'}</span> {formData.message}</p>}
                  </div>
                </div>
              </div>

              {formData.attachments.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium text-primary mb-2">
                    {language === 'ar' ? `المرفقات (${formData.attachments.length})` : `Attachments (${formData.attachments.length})`}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.attachments.map((file, index) => (
                      <Badge key={index} variant="outline">{file.name}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  {language === 'ar' ? 'سيتم التواصل معكم خلال 48 ساعة عمل' : 'We will contact you within 48 business hours'}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'ستصلكم رسالة تأكيد على البريد الإلكتروني' : 'You will receive a confirmation email'}
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-section">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('nav.requestQuote')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'من فضلك املأ النموذج التالي لطلب عرض سعر أو إرسال استفسار حول منتجاتنا'
                : 'Please fill out the following form to request a quotation or send an inquiry about our products'}
            </p>
            <p className="text-base text-muted-foreground mt-2">
              {language === 'en' 
                ? 'Please fill out the following form to request a quotation or send an inquiry about our products'
                : 'من فضلك املأ النموذج التالي لطلب عرض سعر أو إرسال استفسار حول منتجاتنا'}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
                      currentStep >= step.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.id}
                    </div>
                    <span className="text-xs mt-2 text-center max-w-20">{step.title}</span>
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Form Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {steps[currentStep - 1].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center"
                  >
                    <ChevronLeft className={`h-4 w-4 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                    {language === 'ar' ? 'السابق' : 'Previous'}
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button onClick={nextStep} className="flex items-center">
                      {language === 'ar' ? 'التالي' : 'Next'}
                      <ChevronRight className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                      {language === 'ar' ? 'إرسال الطلب' : 'Submit Request'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">
                {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {faqItems.map((item, index) => (
                  <Card key={index} className="hover:shadow-card transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3 rtl:space-x-reverse mb-3">
                        <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                        <h3 className="font-medium text-sm">{item.question}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RequestQuote;

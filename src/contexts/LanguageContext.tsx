import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'ar') ? saved : 'ar';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.products': 'منتجاتنا',
    'nav.certificates': 'الجودة والشهادات',
    'nav.news': 'أخبارنا',
    'nav.contact': 'اتصل بنا',
    'nav.requestQuote': 'اطلب عرض سعر',
    'nav.downloadProfile': 'تحميل ملف الشركة',
    
    // Common
    'common.readMore': 'اقرأ المزيد',
    'common.learnMore': 'تعرف على المزيد',
    'common.contactUs': 'اتصل بنا',
    'common.viewAll': 'عرض الكل',
    'common.submit': 'إرسال',
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.featured': 'منتج مميز',
    'common.home': 'الرئيسية',
    'common.products': 'المنتجات',
    
    // Home Page
    'home.hero.badge': 'مصنع رائد منذ أكثر من 20 عاماً',
    'home.hero.title': 'من خيرات الطبيعة الأردنية',
    'home.hero.subtitle': 'نمنحكم جميد أصيل بطعم لا ينسى',
    'home.hero.description': 'شركة الفرسان الرباعية - رائدة في صناعة المنتجات الأردنية الأصيلة، بجودة عالمية وتقنية تراثية أصيلة.',
    'home.hero.watchVideo': 'شاهد الفيديو التعريفي',
    'home.hero.viewProducts': 'عرض المنتجات',
    
    'home.discover.title': 'اكتشف المزيد',
    'home.about.badge': 'عن الشركة',
    'home.about.title': 'أكثر من 20 عاماً من الخبرة في صناعة الجميد الأردني الأصيل',
    'home.about.description': 'شركة الفرسان الرباعية للإدارة والاستثمار هي شركة رائدة في صناعة المنتجات الأردنية الأصيلة. تأسست منذ أكثر من 20 عاماً من الخبرة في مجال الأغذية. بدأنا كعمل عائلي، ونمت خبرتنا لتصبح علامة تجارية ناجحة تمتلك قاعدة عملاء واسعة محلياً ودولياً.',
    
    'home.values.title': 'قيمنا الأساسية',
    'home.values.quality.title': 'الجودة',
    'home.values.quality.desc': 'نلتزم بأعلى معايير الجودة في كل مراحل الإنتاج',
    'home.values.authenticity.title': 'الأصالة',
    'home.values.authenticity.desc': 'نحافظ على الطعم التقليدي الأصيل للجميد الأردني',
    'home.values.innovation.title': 'الابتكار',
    'home.values.innovation.desc': 'نستخدم أحدث التقنيات في التعبئة والتغليف',
    'home.values.trust.title': 'الثقة',
    'home.values.trust.desc': 'نبني علاقات طويلة الأمد مع عملائنا',
    
    'home.products.badge': 'منتجاتنا',
    'home.products.title': 'منتجات الجميد الأصيل',
    'home.products.description': 'نفخر بتقديم مجموعة متنوعة من منتجات الجميد الأردني الأصيل بأعلى معايير الجودة',
    
    'home.certificates.badge': 'الشهادات والجودة',
    'home.certificates.title': 'معايير الجودة العالمية',
    'home.certificates.description': 'نلتزم بأعلى معايير الجودة والسلامة المعترف بها عالمياً',
    
    'home.stats.experience': 'سنة من الخبرة',
    'home.stats.products': 'منتج متنوع',
    'home.stats.countries': 'دولة نصدر لها',
    'home.stats.customers': 'عميل سعيد',
    
    'home.cta.title': 'هل أنت مستعد للبدء؟',
    'home.cta.description': 'تواصل معنا اليوم واحصل على أفضل منتجات الجميد الأردني الأصيل',
    
    // Products Page
    'products.hero.badge': 'منتجاتنا المميزة',
    'products.hero.title': 'منتجات الجميد الأصيل',
    'products.hero.description': 'اكتشف مجموعة منتجاتنا من الجميد الأردني الأصيل',
    'products.hero.subtitle': 'طعم أصيل • جودة استثنائية • تراث أردني',
    
    'products.jameednaZaman.name': 'جميدنا زمان',
    'products.jameednaZaman.nameEn': 'Jameedna Zaman',
    'products.jameednaZaman.description': 'جميد أردني أصيل مصنوع من حليب الغنم الطازج المبستر، معبأ بطريقة عصرية تحافظ على الطعم التقليدي الأصيل',
    'products.jameednaZaman.ingredients': '100% جميد نقي (حليب غنم طازج مبستر، ملح، بادئ) ماء، بهارات، ملح.',
    'products.jameednaZaman.features': 'جميد مغسول وخالي من كافة الشوائب، محلول بماء معقم، مطبوخ ومعبأ في باكيت كارتون معقم، محكم الإغلاق.',
    
    'products.jameedBadawya.name': 'جميد البدوية',
    'products.jameedBadawya.nameEn': 'Jameed Badawya',
    'products.jameedBadawya.description': 'جميد بدوي تقليدي بلمسة حديثة، يجمع بين النكهة الأصيلة والتعبئة الصحية العصرية لتجربة فريدة وصحية',
    'products.jameedBadawya.features': 'جميد مغسول وخالي من كافة الشوائب، محلول بماء معقم، مطبوخ ومعبأ في باكيت كارتون معقم، محكم الإغلاق.',
    
    'products.ingredients': 'المكونات',
    'products.features': 'المميزات',
    'products.specifications': 'المواصفات',
    'products.certificates': 'الشهادات',
    'products.backToProducts': 'العودة للمنتجات',
    
    'products.feature.quality.title': 'جودة مضمونة',
    'products.feature.quality.desc': 'مصنوع من حليب الغنم الطازج 100% مع أعلى معايير النظافة',
    'products.feature.packaging.title': 'تعبئة عصرية',
    'products.feature.packaging.desc': 'تقنية Aseptic المتطورة للحفاظ على الطعم والقيمة الغذائية',
    'products.feature.natural.title': 'طبيعي 100%',
    'products.feature.natural.desc': 'خالي من المواد الحافظة والألوان الصناعية',
    'products.feature.traditional.title': 'وصفة تقليدية',
    'products.feature.traditional.desc': 'طريقة تحضير تراثية أردنية أصيلة توارثناها عبر الأجيال',
    
    // Certificates Page
    'certificates.hero.badge': 'الشهادات والجودة',
    'certificates.hero.title': 'معايير الجودة العالمية',
    'certificates.hero.description': 'نلتزم بأعلى معايير الجودة والسلامة المعترف بها عالمياً لضمان تقديم منتجات آمنة وعالية الجودة',
    'certificates.downloadFile': 'تحميل ملف الشهادات',
    
    'certificates.ourCertificates.title': 'شهاداتنا المعتمدة',
    'certificates.ourCertificates.description': 'نفتخر بحصولنا على أهم الشهادات العالمية',
    
    'certificates.quality.title': 'الجودة والسلامة',
    'certificates.quality.description': 'حاصلون على شهادات الجودة العالمية',
    
    // Contact Page
    'contact.hero.badge': 'تواصل معنا',
    'contact.hero.title': 'نحن هنا لخدمتكم',
    'contact.hero.description': 'لأي استفسار أو طلب عرض سعر، لا تترددوا في التواصل معنا. فريقنا جاهز لمساعدتكم',
    'contact.sendMessage': 'إرسال رسالة',
    
    'contact.info.title': 'معلومات التواصل',
    'contact.address': 'العنوان',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.workingHours': 'ساعات العمل',
    
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.phone': 'رقم الهاتف',
    'contact.form.company': 'اسم الشركة',
    'contact.form.subject': 'الموضوع',
    'contact.form.message': 'رسالتك',
    
    // About Page
    'about.hero.badge': 'من نحن',
    'about.hero.title': 'شركة الفرسان الرباعية',
    'about.hero.subtitle': 'رائدة في صناعة الجميد الأردني الأصيل منذ 2004',
    
    'about.story.title': 'قصتنا',
    'about.vision.title': 'رؤيتنا',
    'about.mission.title': 'رسالتنا',
    
    // Blog Page
    'blog.hero.title': 'أخبارنا ومقالاتنا',
    'blog.hero.description': 'تابع آخر أخبار الفرسان الرباعية واكتشف المزيد عن عالم الجميد التقليدي',
    'blog.hero.subtitle': 'Our News & Articles',
    
    'blog.search': 'البحث',
    'blog.searchPlaceholder': 'ابحث في المقالات...',
    'blog.categories': 'التصنيفات',
    'blog.newsletter': 'النشرة الإخبارية',
    'blog.newsletterDesc': 'اشترك لتصلك آخر الأخبار',
    'blog.subscribe': 'اشتراك',
    
    // Request Quote Page
    'quote.title': 'طلب عرض سعر',
    'quote.description': 'املأ النموذج وسنتواصل معك في أقرب وقت',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Our Products',
    'nav.certificates': 'Quality & Certificates',
    'nav.news': 'Our News',
    'nav.contact': 'Contact Us',
    'nav.requestQuote': 'Request Quote',
    'nav.downloadProfile': 'Download Profile',
    
    // Common
    'common.readMore': 'Read More',
    'common.learnMore': 'Learn More',
    'common.contactUs': 'Contact Us',
    'common.viewAll': 'View All',
    'common.submit': 'Submit',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.featured': 'Featured Product',
    'common.home': 'Home',
    'common.products': 'Products',
    
    // Home Page
    'home.hero.badge': 'Leading Manufacturer Since 20+ Years',
    'home.hero.title': 'From the Bounties of Jordanian Nature',
    'home.hero.subtitle': 'We Bring You Authentic Jameed with Unforgettable Taste',
    'home.hero.description': 'Al Fursan Quadruple - A leader in authentic Jordanian products manufacturing, with world-class quality and traditional heritage techniques.',
    'home.hero.watchVideo': 'Watch Intro Video',
    'home.hero.viewProducts': 'View Products',
    
    'home.discover.title': 'Discover More',
    'home.about.badge': 'About the Company',
    'home.about.title': 'Over 20 Years of Experience in Authentic Jordanian Jameed Manufacturing',
    'home.about.description': 'Al Fursan Quadruple for Management and Investment is a leading company in authentic Jordanian products manufacturing. Established over 20 years ago with expertise in the food industry. We started as a family business and grew our experience to become a successful brand with an extensive customer base locally and internationally.',
    
    'home.values.title': 'Our Core Values',
    'home.values.quality.title': 'Quality',
    'home.values.quality.desc': 'We commit to the highest quality standards in every production stage',
    'home.values.authenticity.title': 'Authenticity',
    'home.values.authenticity.desc': 'We preserve the traditional authentic taste of Jordanian Jameed',
    'home.values.innovation.title': 'Innovation',
    'home.values.innovation.desc': 'We use the latest technologies in packaging and processing',
    'home.values.trust.title': 'Trust',
    'home.values.trust.desc': 'We build long-term relationships with our customers',
    
    'home.products.badge': 'Our Products',
    'home.products.title': 'Authentic Jameed Products',
    'home.products.description': 'We are proud to offer a diverse range of authentic Jordanian Jameed products with the highest quality standards',
    
    'home.certificates.badge': 'Certificates & Quality',
    'home.certificates.title': 'International Quality Standards',
    'home.certificates.description': 'We adhere to the highest internationally recognized quality and safety standards',
    
    'home.stats.experience': 'Years of Experience',
    'home.stats.products': 'Diverse Products',
    'home.stats.countries': 'Export Countries',
    'home.stats.customers': 'Happy Customers',
    
    'home.cta.title': 'Ready to Get Started?',
    'home.cta.description': 'Contact us today and get the best authentic Jordanian Jameed products',
    
    // Products Page
    'products.hero.badge': 'Our Featured Products',
    'products.hero.title': 'Authentic Jameed Products',
    'products.hero.description': 'Discover our collection of authentic Jordanian Jameed',
    'products.hero.subtitle': 'Authentic Taste • Exceptional Quality • Jordanian Heritage',
    
    'products.jameednaZaman.name': 'Jameedna Zaman',
    'products.jameednaZaman.nameEn': 'Jameedna Zaman',
    'products.jameednaZaman.description': 'Authentic Jordanian Jameed made from fresh pasteurized sheep milk, packaged in a modern way that preserves the traditional authentic taste',
    'products.jameednaZaman.ingredients': '100% pure Jameed (fresh pasteurized sheep milk, salt, starter culture), water, spices, salt.',
    'products.jameednaZaman.features': 'Washed Jameed free from all impurities, dissolved in sterilized water, cooked and packaged in a sterile, hermetically sealed carton packet.',
    
    'products.jameedBadawya.name': 'Jameed Badawya',
    'products.jameedBadawya.nameEn': 'Jameed Badawya',
    'products.jameedBadawya.description': 'Traditional Bedouin Jameed with a modern touch, combining authentic flavor and modern healthy packaging for a unique and healthy experience',
    'products.jameedBadawya.features': 'Washed Jameed free from all impurities, dissolved in sterilized water, cooked and packaged in a sterile, hermetically sealed carton packet.',
    
    'products.ingredients': 'Ingredients',
    'products.features': 'Features',
    'products.specifications': 'Specifications',
    'products.certificates': 'Certificates',
    'products.backToProducts': 'Back to Products',
    
    'products.feature.quality.title': 'Guaranteed Quality',
    'products.feature.quality.desc': 'Made from 100% fresh sheep milk with the highest hygiene standards',
    'products.feature.packaging.title': 'Modern Packaging',
    'products.feature.packaging.desc': 'Advanced Aseptic technology to preserve taste and nutritional value',
    'products.feature.natural.title': '100% Natural',
    'products.feature.natural.desc': 'Free from preservatives and artificial colors',
    'products.feature.traditional.title': 'Traditional Recipe',
    'products.feature.traditional.desc': 'Authentic Jordanian heritage preparation method passed down through generations',
    
    // Certificates Page
    'certificates.hero.badge': 'Certificates & Quality',
    'certificates.hero.title': 'International Quality Standards',
    'certificates.hero.description': 'We commit to the highest internationally recognized quality and safety standards to ensure safe and high-quality products',
    'certificates.downloadFile': 'Download Certificates File',
    
    'certificates.ourCertificates.title': 'Our Certified Credentials',
    'certificates.ourCertificates.description': 'We are proud to have obtained the most important international certificates',
    
    'certificates.quality.title': 'Quality & Safety',
    'certificates.quality.description': 'Certified with international quality standards',
    
    // Contact Page
    'contact.hero.badge': 'Contact Us',
    'contact.hero.title': 'We Are Here to Serve You',
    'contact.hero.description': 'For any inquiry or quote request, do not hesitate to contact us. Our team is ready to help you',
    'contact.sendMessage': 'Send Message',
    
    'contact.info.title': 'Contact Information',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.workingHours': 'Working Hours',
    
    'contact.form.title': 'Send Us a Message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.company': 'Company Name',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    
    // About Page
    'about.hero.badge': 'About Us',
    'about.hero.title': 'Al Fursan Quadruple Company',
    'about.hero.subtitle': 'Leading in Authentic Jordanian Jameed Manufacturing Since 2004',
    
    'about.story.title': 'Our Story',
    'about.vision.title': 'Our Vision',
    'about.mission.title': 'Our Mission',
    
    // Blog Page
    'blog.hero.title': 'Our News & Articles',
    'blog.hero.description': 'Follow the latest Al Fursan Quadruple news and discover more about the traditional Jameed world',
    'blog.hero.subtitle': 'Our News & Articles',
    
    'blog.search': 'Search',
    'blog.searchPlaceholder': 'Search articles...',
    'blog.categories': 'Categories',
    'blog.newsletter': 'Newsletter',
    'blog.newsletterDesc': 'Subscribe to receive latest news',
    'blog.subscribe': 'Subscribe',
    
    // Request Quote Page
    'quote.title': 'Request a Quote',
    'quote.description': 'Fill the form and we will contact you soon',
  }
};

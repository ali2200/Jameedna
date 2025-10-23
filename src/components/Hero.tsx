import { Play, Sparkles, ArrowDown, Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import factoryImage from "@/assets/factory-exterior.jpg";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const navigate = useNavigate();
  const { language, t, dir } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-hero flex items-center justify-center" dir={dir}>
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2"
            src="https://www.youtube.com/embed/Qqm7n4iHC5I?si=8PtMKwiCbb-OtBvk&controls=0&start=33&autoplay=1&mute=1&loop=1&playlist=Qqm7n4iHC5I&rel=0&modestbranding=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              width: '100vw',
              height: '56.25vw',
              minHeight: '100vh',
              minWidth: '177.77vh',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />
        </div>
        
        {/* Light Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/5 to-black/10" />
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-foreground rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex items-center justify-center min-h-screen">
        <div className="text-center py-20">
          {/* Modern Heading with Glass Effect */}
          <div className="mx-auto max-w-5xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm mb-8 animate-fade-in-up">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">{t('home.hero.badge')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in-up leading-tight">
              <span className="block text-primary drop-shadow-lg">
                {t('home.hero.title1')}
              </span>
              <span className="block text-primary drop-shadow-lg animate-glow">
                {t('home.hero.title2')}
              </span>
              <span className="block text-primary/90 drop-shadow-md text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mt-2 sm:mt-3">
                {t('home.hero.subtitle')}
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-foreground/90 drop-shadow-md max-w-2xl mx-auto leading-relaxed animate-slide-in-right px-4 sm:px-0">
              {t('home.hero.description')}
            </p>
          </div>

          {/* Modern CTA Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-scale px-4 sm:px-0">
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 
                       shadow-glass px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-2xl transition-all duration-300 
                       hover:scale-105 hover:shadow-glow border border-primary/20 w-full sm:w-auto"
              onClick={() => setIsVideoOpen(true)}
              data-testid="button-watch-video"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <Play className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 transition-transform group-hover:scale-110`} />
              {t('home.hero.watchVideo')}
            </Button>
            
            <Link to="/products">
              <Button 
                variant="outline" 
                size="lg"
                className="group relative overflow-hidden bg-white/95 border-2 border-primary/30 
                         text-primary hover:bg-white backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base 
                         font-semibold rounded-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent 
                              -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                <Package className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 transition-transform group-hover:scale-110`} />
                {t('home.hero.viewProducts')}
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg"
              className="group relative overflow-hidden bg-white/95 border-2 border-primary/30 
                       text-primary hover:bg-white backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base 
                       font-semibold rounded-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              onClick={() => navigate('/request-quote')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              {t('home.hero.requestQuote')}
            </Button>
          </div>

        </div>
      </div>

      {/* Simple Centered Text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-primary/80 text-base font-medium cursor-pointer hover:text-primary transition-colors duration-300"
           onClick={() => {
             const aboutSection = document.getElementById('about');
             if (aboutSection) {
               aboutSection.scrollIntoView({ behavior: 'smooth' });
             }
           }}>
          {language === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
        </p>
      </div>
      
      {/* Clean Straight Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
      {/* Video Dialog */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-background/95 backdrop-blur-xl border-2 border-primary/20 overflow-hidden">
          <DialogTitle className="sr-only">{language === 'ar' ? 'الفيديو التعريفي - شركة الفرسان الرباعية' : 'Intro Video - Al-Fursan Al-Rubaiah'}</DialogTitle>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full rounded-lg"
              src={isVideoOpen ? "https://www.youtube.com/embed/Qqm7n4iHC5I?si=8PtMKwiCbb-OtBvk&autoplay=1" : ""}
              title="الفيديو التعريفي - شركة الفرسان الرباعية"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
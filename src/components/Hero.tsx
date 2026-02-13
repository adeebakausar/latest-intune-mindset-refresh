import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Heart, Shield, Lock, ChevronDown } from "lucide-react";
import heroBanner from "@/assets/hero-forest-banner.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img 
        src={heroBanner}
        alt="Serene forest meditation scene"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      
      <div className="container-wide mx-auto px-6 lg:px-12 relative z-10 text-center pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-up mb-10">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card/90 backdrop-blur-sm text-foreground text-sm font-medium shadow-soft border border-border/30">
              <Leaf size={18} className="text-primary" />
              Evidence-Based Mental Health Care
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-foreground leading-[1.05] mb-8 animate-fade-up delay-100">
            Find Your Path to{" "}
            <span className="text-primary italic block sm:inline">Inner Peace</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up delay-200 leading-relaxed">
            Professional counselling and psychotherapy services with over 25 years of experience. Compassionate, judgment-free care tailored to your unique journey.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up delay-300">
            <Button size="xl" asChild>
              <Link to="/services/counselling">
                Book Your Session
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="bg-card/80 backdrop-blur-sm hover:bg-card border-border" asChild>
              <Link to="/services">
                Explore Services
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-10 p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/30 animate-fade-up delay-400">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="text-primary" size={22} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">25+ Years</p>
                <p className="text-sm text-muted-foreground">Experience</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="text-primary" size={22} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">PACFA</p>
                <p className="text-sm text-muted-foreground">Registered</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lock className="text-primary" size={22} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Confidential</p>
                <p className="text-sm text-muted-foreground">Safe Space</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up delay-500">
          <Link 
            to="/about" 
            className="inline-flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs uppercase tracking-widest mb-2 font-medium">Discover More</span>
            <ChevronDown size={24} className="animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

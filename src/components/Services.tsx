import { Link } from "react-router-dom";
import { MessageCircle, Users, Brain, Shield, Heart, Sparkles, ArrowRight, Clock, Lock, FileText } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: MessageCircle,
      title: "Counselling Sessions",
      description: "One-on-one therapeutic sessions tailored to your unique needs. Book online or in-person appointments with our experienced practitioners.",
      price: "$76",
      link: "/services/counselling",
      featured: true,
    },
    {
      icon: Users,
      title: "Professional Supervision",
      description: "Clinical supervision for counsellors and therapists. Develop your practice with guidance from seasoned professionals.",
      price: "$90",
      link: "/services/supervision",
      featured: false,
    },
    {
      icon: Brain,
      title: "Anxiety & Panic Management",
      description: "Learn to recognize anxiety signs and develop evidence-based coping strategies to regain control of your life.",
      type: "Programs",
      link: "/programs",
      featured: false,
    },
    {
      icon: Shield,
      title: "Trauma & PTSD Support",
      description: "Specialized trauma-informed care to help you process difficult experiences and move toward healing safely.",
      type: "Programs",
      link: "/programs",
      featured: false,
    },
    {
      icon: Heart,
      title: "Grief & Loss Counselling",
      description: "Compassionate support through the natural human response to loss. Find your path through grief with professional guidance.",
      type: "Programs",
      link: "/programs",
      featured: false,
    },
    {
      icon: Sparkles,
      title: "Self-Esteem Building",
      description: "Develop self-worth, value your strengths, and build confidence through structured therapeutic programs.",
      type: "Programs",
      link: "/programs",
      featured: false,
    },
  ];

  const features = [
    { icon: Clock, title: "Flexible Scheduling", description: "Book sessions that fit your lifestyle" },
    { icon: Lock, title: "Complete Confidentiality", description: "Your privacy is our priority" },
    { icon: FileText, title: "Free Resources", description: "Access downloadable guides and tools" },
  ];

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 animate-fade-up">
            Comprehensive Mental Health{" "}
            <span className="block">Support</span>
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-up delay-100">
            Evidence-based counselling, professional supervision, and practical step-by-step programs designed to help you achieve lasting change.
          </p>
        </div>

        {/* Services Grid - 3 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className={`group relative rounded-2xl p-6 transition-all duration-300 animate-fade-up flex flex-col ${
                service.featured
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:shadow-card hover:border-primary/30"
              }`}
              style={{ animationDelay: `${(index + 2) * 50}ms` }}
            >
              {/* Badge */}
              {service.featured && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-secondary text-foreground text-xs font-semibold rounded-full">
                  Most Popular
                </span>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                service.featured 
                  ? "bg-primary-foreground/20" 
                  : "bg-muted"
              }`}>
                <service.icon className={service.featured ? "text-primary-foreground" : "text-muted-foreground"} size={24} />
              </div>

              {/* Title */}
              <h3 className={`font-display text-lg font-semibold mb-2 ${
                service.featured ? "text-primary-foreground" : "text-foreground"
              }`}>
                {service.title}
              </h3>

              {/* Description */}
              <p className={`text-sm leading-relaxed mb-4 flex-grow ${
                service.featured ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}>
                {service.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-current/10">
                {service.price ? (
                  <span className={`text-xl font-bold ${
                    service.featured ? "text-primary-foreground" : "text-foreground"
                  }`}>
                    {service.price}
                  </span>
                ) : (
                  <span className={`text-sm ${
                    service.featured ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {service.type}
                  </span>
                )}
                <span className={`flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all ${
                  service.featured ? "text-primary-foreground" : "text-foreground"
                }`}>
                  Learn More <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-6 px-8 bg-muted/50 rounded-2xl animate-fade-up">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                <feature.icon className="text-muted-foreground" size={18} />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{feature.title}</p>
                <p className="text-muted-foreground text-xs">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

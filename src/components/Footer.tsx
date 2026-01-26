import { Heart, Linkedin, Facebook, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logoIntune from "@/assets/logo-intune.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    services: [
      { label: "Counselling", href: "/services", isRoute: true },
      { label: "Supervision", href: "/services", isRoute: true },
      { label: "Programs", href: "/programs", isRoute: true },
      { label: "Resources", href: "/resources", isRoute: true },
    ],
    programs: [
      { label: "Anxiety Management", href: "/programs", isRoute: true },
      { label: "Trauma & PTSD", href: "/programs", isRoute: true },
      { label: "Grief Support", href: "/programs", isRoute: true },
      { label: "Self-Esteem", href: "/programs", isRoute: true },
    ],
    company: [
      { label: "About Us", href: "/about", isRoute: true },
      { label: "Our Therapists", href: "/therapists", isRoute: true },
      { label: "Contact", href: "/contact", isRoute: true },
      { label: "Privacy Policy", href: "/privacy-policy", isRoute: true },
    ],
  };

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground/80 section-padding">
      <div className="container-wide mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={logoIntune} 
                alt="Intune Mindset" 
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-primary-foreground/60 leading-relaxed max-w-sm mb-6">
              Professional counselling and mental health support. No fluff, no guesswork—just clinically grounded care from experienced psychotherapists.
            </p>
            <div className="flex items-center gap-2 text-sm mb-4">
              <Heart size={14} className="text-accent" />
              <span className="text-primary-foreground/60">55+ years combined experience</span>
            </div>
            <div className="flex items-center gap-3 text-sm mb-4">
              <Phone size={14} className="text-accent" />
              <a href="tel:0457264147" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                0457 264 147
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/brett-boyland-8718a014b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Linkedin size={18} className="text-primary-foreground/70" />
              </a>
              <a 
                href="https://www.facebook.com/brett.boyland.14/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook size={18} className="text-primary-foreground/70" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-6">
              Programs
            </h4>
            <ul className="space-y-3">
              {links.programs.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {currentYear} Intune Mindset. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/50">
            <span>PACFA Registered</span>
            <span>ANZAP Members</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

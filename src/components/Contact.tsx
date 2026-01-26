import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Create mailto link as fallback (since no backend connected yet)
    const subject = encodeURIComponent(`Contact Form: Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\n\nMessage:\n${formData.message}`
    );
    
    window.location.href = `mailto:intunemindset@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Opening email client...",
        description: "Your default email app should open with your message.",
      });
    }, 500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email Us",
      values: ["intunemindset@gmail.com", "brettboy753@gmail.com"],
      href: ["mailto:intunemindset@gmail.com", "mailto:brettboy753@gmail.com"],
    },
  ];

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block animate-fade-up">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-up delay-200">
            Have questions or ready to start your journey? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-3 animate-fade-up delay-300">
            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                Send Us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      maxLength={255}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={20}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    maxLength={1000}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 animate-fade-up delay-400">
            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft h-full">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Email Section */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={22} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Email Us</p>
                    <div className="space-y-1">
                      <a 
                        href="mailto:intunemindset@gmail.com" 
                        className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        intunemindset@gmail.com
                      </a>
                      <a 
                        href="mailto:brettboy753@gmail.com" 
                        className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        brettboy753@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Section */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={22} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Call Us</p>
                    <a 
                      href="tel:0457264147" 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      0457 264 147
                    </a>
                  </div>
                </div>

                {/* Response Time */}
                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="font-medium text-foreground text-sm">Quick Response</p>
                      <p className="text-muted-foreground text-sm">
                        We typically respond within 24-48 hours during business days.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Bodies */}
                <div className="pt-6 border-t border-border/50">
                  <p className="font-medium text-foreground text-sm mb-3">Professional Affiliations</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                      PACFA Registered
                    </span>
                    <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                      ANZAP Members
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

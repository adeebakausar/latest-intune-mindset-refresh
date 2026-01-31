import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Calendar, User, Heart, Shield, ArrowLeft } from "lucide-react";
import sandraImage from "@/assets/sandra-russet-silk.webp";
import brettImage from "@/assets/brett-boyland.jpg";
import { supabase } from "@/integrations/supabase/client";

const CounsellingPage = () => {
  const [sandraCalendarUrl, setSandraCalendarUrl] = useState<string | null>(null);
  const [brettCalendarUrl, setBrettCalendarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendarSettings = async () => {
      const { data } = await supabase
        .from("settings")
        .select("key, value")
        .in("key", ["sandra_calendar_url", "brett_calendar_url"]);
      
      data?.forEach((setting) => {
        if (setting.key === "sandra_calendar_url") {
          setSandraCalendarUrl(setting.value);
        } else if (setting.key === "brett_calendar_url") {
          setBrettCalendarUrl(setting.value);
        }
      });
    };
    
    fetchCalendarSettings();
  }, []);

  const therapists = [
    {
      id: "sandra",
      name: "Sandra Russet-Silk",
      title: "Psychoanalytic Psychotherapist",
      image: sandraImage,
      credentials: "Clinical Member of ANZAP and PACFA Professional Body",
      experience: "Over 30 years' experience",
      specialties: ["Deep insight work", "Pattern recognition", "Long-term therapy"],
      calendarEmbed: sandraCalendarUrl,
    },
    {
      id: "brett",
      name: "Brett Boyland",
      title: "Master of Counselling",
      image: brettImage,
      credentials: "Clinical Member of PACFA Professional Body",
      experience: "Over 25 years' experience",
      specialties: ["Practical tools", "Evidence-based interventions", "Solution-focused therapy"],
      calendarEmbed: brettCalendarUrl,
    },
  ];

  const benefits = [
    "Personalized treatment plans tailored to your needs",
    "Confidential and safe therapeutic environment",
    "Evidence-based approaches and techniques",
    "Flexible online and in-person sessions",
    "Ongoing support between sessions",
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
          <div className="container-wide mx-auto">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Services
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Heart size={16} />
                  Most Popular Service
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
                  Counselling Sessions
                </h1>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  One-on-one therapeutic sessions tailored to your unique needs. Our experienced practitioners provide compassionate, evidence-based care to support your mental health journey.
                </p>

                {/* Price Card */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Session Price</p>
                      <p className="text-4xl font-bold text-primary">$110.00 <span className="text-lg font-normal">AUD</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Duration</p>
                      <p className="flex items-center gap-2 font-medium">
                        <Clock size={18} className="text-primary" />
                        50-60 minutes
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-secondary text-foreground text-xs font-medium rounded-full">
                      Online Available
                    </span>
                    <span className="px-3 py-1 bg-secondary text-foreground text-xs font-medium rounded-full">
                      In-Person
                    </span>
                  </div>
                </div>

                <Button size="lg" asChild>
                  <a href="#book-session">
                    Book Your Session
                    <Calendar size={18} />
                  </a>
                </Button>
              </div>

              {/* Benefits */}
              <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-soft">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  What You'll Get
                </h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Therapists Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Choose Your Therapist
              </h2>
              <p className="text-muted-foreground text-lg">
                Both our therapists are highly qualified professionals dedicated to your care.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {therapists.map((therapist) => (
                <div
                  key={therapist.id}
                  className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-card transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={therapist.image}
                      alt={therapist.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                      {therapist.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-3">
                      {therapist.title}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      {therapist.credentials}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Shield size={16} className="text-primary" />
                      {therapist.experience}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {therapist.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="book-session" className="section-padding bg-background">
          <div className="container-wide mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Book Your Counselling Session
              </h2>
              <p className="text-muted-foreground text-lg">
                Select your preferred therapist and choose a time that works for you.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="sandra" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1">
                  {therapists.map((therapist) => (
                    <TabsTrigger
                      key={therapist.id}
                      value={therapist.id}
                      className="flex items-center gap-3 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <img
                        src={therapist.image}
                        alt={therapist.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <span className="block font-medium">{therapist.name}</span>
                        <span className="block text-xs opacity-70">{therapist.title}</span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {therapists.map((therapist) => (
                  <TabsContent key={therapist.id} value={therapist.id}>
                    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                      <div className="min-h-[520px] lg:min-h-[600px] flex items-center justify-center bg-muted/20">
                        {therapist.calendarEmbed ? (
                          <iframe
                            src={therapist.calendarEmbed}
                            className="w-full h-full min-h-[520px] lg:min-h-[600px] border-0"
                            title={`Book counselling with ${therapist.name}`}
                          />
                        ) : (
                          <div className="text-center p-12">
                            <Calendar className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                              Calendar Coming Soon
                            </h3>
                            <p className="text-muted-foreground max-w-md mx-auto mb-6">
                              {therapist.name}'s booking calendar will be available here shortly.
                            </p>
                            <Button variant="outline" asChild>
                              <Link to="/contact">Contact Us to Book</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="p-4 bg-muted/30 border-t border-border/50">
                        <p className="text-sm text-muted-foreground text-center">
                          💡 Session fee: <strong className="text-primary">$110.00 AUD</strong> • Duration: 50-60 minutes
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CounsellingPage;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Mail, Download, ArrowRight, Sparkles, Shield, Brain, Heart, ClipboardList } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Resources = () => {
  const handleDownload = async (fileName: string, title: string) => {
    try {
      const { data, error } = await supabase.storage.from("pdf").download(fileName);
      if (error) throw error;
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName.split("/").pop() || title;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const resources = [
    {
      icon: ClipboardList,
      title: "PTSD/Trauma Checklist",
      description: "A comprehensive self-assessment tool to help identify and understand trauma symptoms with easy tick-box format.",
      type: "Free Download",
      badge: "Popular",
      fileName: "PTSD_Trauma_Support_Team_Checklist_With_Tick_Boxes.pdf",
    },
    {
      icon: BookOpen,
      title: "PTSD/Trauma Journal",
      description: "A detailed journaling guide designed specifically for processing trauma and PTSD experiences.",
      type: "Free Download",
      badge: null,
      fileName: "Detailed_PTSD_Trauma_Journal_IntuneMindset_withLogo.pdf",
    },
    {
      icon: FileText,
      title: "Reflection Journal",
      description: "Guided journaling prompts and templates designed for meaningful self-reflection and personal growth.",
      type: "Free Download",
      badge: null,
      fileName: "Reflection_Journal.pdf",
    },
    {
      icon: Shield,
      title: "Safety Plan Booklet",
      description: "Create your personalized safety plan with step-by-step guidance for crisis situations and suicide prevention.",
      type: "Free Download",
      badge: "Essential",
      fileName: "suicide_prevention_safety_plan_booklet_with_logos_lines.pdf",
    },
    {
      icon: Heart,
      title: "Stress Management Checklist",
      description: "A practical checklist and journal to help you identify, track, and manage your daily stress levels.",
      type: "Free Download",
      badge: null,
      fileName: "stress_management_journal_checklist_with_header_logo.pdf",
    },
    {
      icon: Brain,
      title: "Living With OCD",
      description: "A comprehensive guide to understanding and managing Obsessive-Compulsive Disorder with practical strategies.",
      type: "Free Download",
      badge: null,
      fileName: "Living_With_OCD.pdf",
    },
    {
      icon: Heart,
      title: "Healing After Sexual Abuse",
      description: "A compassionate guide for survivors on the path to healing, with practical exercises and support resources.",
      type: "Free Download",
      badge: null,
      fileName: "Healing_Path_After_Sexual_Abuse_Intune_Mindset_with_Real_Phoenix_Header.docx",
    },
    {
      icon: Mail,
      title: "Newsletter – Dec 2025",
      description: "Curated insights, practical tips, and resources from the Intune Mindset team.",
      type: "Newsletter",
      badge: "Latest",
      fileName: "INTUNE_MINDSET_Newsletter_Dec_2025.pdf",
    },
    {
      icon: Mail,
      title: "Newsletter – Oct 2025",
      description: "Monthly insights and mental health resources from our October edition.",
      type: "Newsletter",
      badge: null,
      fileName: "INTUNE_MINDSET_Newsletter_Oct_2025.pdf",
    },
    {
      icon: FileText,
      title: "Intune Mindset Survey",
      description: "Help us understand your needs better by completing our confidential client feedback survey.",
      type: "Free Download",
      badge: null,
      fileName: "Intune_Mindset_Survay.pdf",
    },
  ];

  return (
    <section id="resources" className="section-padding bg-muted/30">
      <div className="container-wide mx-auto">
        {/* Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <Sparkles size={16} />
            Free Resources
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Tools to Support Your{" "}
            <span className="text-primary italic">Healing Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl animate-fade-up delay-200">
            We believe in empowering you with resources beyond our sessions. Download our curated collection of free tools, guides, and journals.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {resources.map((resource, index) => (
            <div
              key={index}
              onClick={() => handleDownload(resource.fileName, resource.title)}
              className="group relative bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 cursor-pointer animate-fade-up flex flex-col"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Badge */}
              {resource.badge && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {resource.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <resource.icon className="text-primary" size={26} />
              </div>

              {/* Type Label */}
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {resource.type}
              </span>

              {/* Title */}
              <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                {resource.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-5">
                {resource.description}
              </p>

              {/* Action Link */}
              <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all mt-auto">
                Download <Download size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: "700ms" }}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-card rounded-3xl border border-border/50 shadow-soft">
            <div className="text-center sm:text-left">
              <p className="font-display text-xl font-semibold text-foreground mb-1">
                Need personalized support?
              </p>
              <p className="text-muted-foreground">
                Book a session with our experienced therapists.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link to="/services/counselling">
                Book a Session
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;

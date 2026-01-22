import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Programs = () => {
  const programs = [
    {
      title: "Anger Management",
      description: "Structured therapeutic interventions designed to help individuals understand and manage anger responses effectively.",
      bgColor: "bg-[hsl(174,45%,85%)]",
      titleColor: "text-[hsl(174,45%,30%)]",
    },
    {
      title: "Anxiety & Panic",
      description: "Learn to recognize the signs of anxiety and develop proven strategies to regain calm and control.",
      bgColor: "bg-[hsl(50,70%,85%)]",
      titleColor: "text-[hsl(45,60%,35%)]",
    },
    {
      title: "Bipolar Support",
      description: "Understanding that bipolar disorder is serious but treatable, with clear guidance for stability.",
      bgColor: "bg-[hsl(200,60%,88%)]",
      titleColor: "text-[hsl(200,50%,35%)]",
    },
    {
      title: "Self-Esteem Building",
      description: "Build self-worth, value your strengths, and develop confidence through evidence-based methods.",
      bgColor: "bg-[hsl(145,40%,88%)]",
      titleColor: "text-[hsl(145,40%,30%)]",
    },
    {
      title: "Grief & Loss",
      description: "Navigate the natural human response to loss with professional support and practical tools.",
      bgColor: "bg-[hsl(350,55%,88%)]",
      titleColor: "text-[hsl(350,45%,40%)]",
    },
    {
      title: "Trauma & PTSD",
      description: "Specialized trauma-informed care to help process difficult experiences and move toward healing.",
      bgColor: "bg-[hsl(30,60%,85%)]",
      titleColor: "text-[hsl(30,50%,35%)]",
      hasLink: true,
    },
    {
      title: "Journaling Practice",
      description: "A powerful practice that helps untangle chaos and find clarity through guided reflection.",
      bgColor: "bg-[hsl(280,40%,90%)]",
      titleColor: "text-[hsl(280,35%,40%)]",
    },
    {
      title: "Suicide Prevention",
      description: "Help is available. Resources and support for those in crisis and their loved ones.",
      bgColor: "bg-[hsl(160,45%,88%)]",
      titleColor: "text-[hsl(350,45%,45%)]",
    },
  ];

  return (
    <section id="programs" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block animate-fade-up">
            Our Programs
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Structured Pathways to Healing
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-up delay-200">
            Explore our comprehensive range of step-by-step therapeutic programs designed to address specific challenges.
          </p>
        </div>

        {/* Programs Grid - 4 columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs.map((program, index) => (
            <Link
              key={index}
              to="/programs"
              className={`group relative rounded-xl p-5 ${program.bgColor} transition-all duration-300 hover:shadow-card hover:-translate-y-1 animate-fade-up`}
              style={{ animationDelay: `${(index + 3) * 40}ms` }}
            >
              {/* Link arrow for specific cards */}
              {program.hasLink && (
                <ArrowRight 
                  size={16} 
                  className="absolute top-4 right-4 text-muted-foreground opacity-50" 
                />
              )}
              
              <h3 className={`font-display text-base font-semibold ${program.titleColor} mb-2`}>
                {program.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                {program.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;

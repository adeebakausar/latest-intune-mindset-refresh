import { CheckCircle } from "lucide-react";

const About = () => {
  const values = [
    { text: "Safe, ethical, and compassionate care" },
    { text: "Evidence-based therapeutic approaches" },
    { text: "Reading the story beneath the symptoms" },
    { text: "Personalized treatment plans" },
    { text: "Confidential and judgment-free space" },
    { text: "Ongoing professional development" },
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-up">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              About Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
              No Fluff, No Guesswork—{" "}
              <span className="text-primary italic">Clinically Grounded</span> Care
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              At Intune Mindset, we believe in getting to the heart of what matters. Our approach combines decades of clinical experience with genuine human connection, helping you navigate life's challenges with clarity and confidence.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We specialize in psychoanalytic psychotherapy, offering deep, meaningful work that goes beyond surface-level solutions. Whether you're dealing with anxiety, trauma, grief, or seeking personal growth, we're here to walk alongside you.
            </p>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={18} />
                  <span className="text-foreground text-sm">{value.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Circular Stat */}
          <div className="flex justify-center animate-fade-up delay-200">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-dashed border-primary/20 flex items-center justify-center">
                {/* Inner circle with stat */}
                <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-card border border-border shadow-soft flex flex-col items-center justify-center">
                  <span className="font-display text-5xl md:text-6xl font-bold text-primary">55+</span>
                  <span className="text-muted-foreground text-sm text-center mt-2 px-4">
                    Years Combined Experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

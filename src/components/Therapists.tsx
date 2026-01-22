import { Link } from "react-router-dom";
import sandraImage from "@/assets/sandra-russet-silk.webp";
import brettImage from "@/assets/brett-boyland.jpg";
import { CheckCircle } from "lucide-react";

const Therapists = () => {
  const therapists = [
    {
      name: "Sandra Russet-Silk",
      title: "Psychoanalytic Psychotherapist",
      image: sandraImage,
      credentials: [
        "Certified with ANZAP (Australia and New Zealand Association of Psychotherapists)",
        "Over 30 years' experience in psychotherapy and mental health",
        "Registered member of PACFA professional body",
        "Specializes in deep insight work and pattern recognition",
      ],
    },
    {
      name: "Brett Boyland",
      title: "Master of Counselling",
      image: brettImage,
      credentials: [
        "Certified with ANZAP (Australia and New Zealand Association of Psychotherapists)",
        "Over 25 years' experience in counselling and mental health",
        "Registered with PACFA (Psychotherapy and Counselling Federation of Australia)",
        "Expertise in practical tools and evidence-based interventions",
      ],
    },
  ];

  return (
    <section id="therapists" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block animate-fade-up">
            Meet Your Therapists
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Highly Qualified Professionals{" "}
            <span className="block">Dedicated to Your Care</span>
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-up delay-200">
            Your sessions are supported by long-standing professionals committed to safe, ethical, and compassionate care.
          </p>
        </div>

        {/* Therapist Cards */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {therapists.map((therapist, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="sm:w-40 md:w-48 flex-shrink-0">
                  <div className="aspect-square sm:h-full">
                    <img
                      src={therapist.image}
                      alt={therapist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-grow">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                    {therapist.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-4">
                    {therapist.title}
                  </p>

                  {/* Credentials List */}
                  <ul className="space-y-2">
                    {therapist.credentials.map((credential, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={14} />
                        <span className="text-muted-foreground text-xs leading-relaxed">
                          {credential}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Therapists;

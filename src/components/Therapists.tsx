import brettImage from "@/assets/brett-boyland.png";
import { CheckCircle } from "lucide-react";

const Therapists = () => {
  const therapist = {
    name: "Brett Boyland",
    title: "Master of Counselling",
    image: brettImage,
    credentials: [
      "Clinical Member of PACFA Professional Body",
      "Over 25 years' experience in counselling and mental health",
      "Expertise in practical tools and evidence-based interventions",
    ],
  };

  return (
    <section id="therapists" className="section-padding bg-muted/30">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block animate-fade-up">
            Meet Your Therapists
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 animate-fade-up delay-100 italic">
            Your Therapist
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-up delay-200">
            Your sessions are supported by a long-standing professional committed to safe, ethical, and compassionate care.
          </p>
        </div>

        {/* Therapist Card */}
        <div className="max-w-2xl mx-auto">
          <div
            className="group bg-card rounded-2xl border border-border p-6 hover:shadow-card transition-all duration-300 animate-fade-up"
            style={{ animationDelay: `300ms` }}
          >
            <div className="flex gap-6">
              {/* Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-40 md:w-40 md:h-48 overflow-hidden rounded-bl-[3rem] rounded-tr-[3rem] rounded-tl-lg rounded-br-lg">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow pt-2">
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                  {therapist.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-4">
                  {therapist.title}
                </p>

                {/* Credentials List */}
                <ul className="space-y-3">
                  {therapist.credentials.map((credential, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {credential}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Therapists;

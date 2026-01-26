import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowRight, CalendarDays } from "lucide-react";
import sandraImage from "@/assets/sandra-russet-silk.png";
import brettImage from "@/assets/brett-boyland.png";

const Booking = () => {
  const therapists = [
    {
      id: "sandra",
      name: "Sandra Russet-Silk",
      title: "Psychoanalytic Psychotherapist",
      image: sandraImage,
      price: "$110.00 AUD",
      // TODO: Replace with actual booking calendar embed URL
      calendarEmbed: null,
    },
    {
      id: "brett",
      name: "Brett Boyland",
      title: "Master of Counselling",
      image: brettImage,
      price: "$110.00 AUD",
      // TODO: Replace with actual booking calendar embed URL
      calendarEmbed: null,
    },
  ];

  return (
    <section id="booking" className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <CalendarDays size={16} />
            Book Your Session
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Schedule an Appointment
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl animate-fade-up delay-200">
            Choose your preferred therapist and book a time that works for you.
          </p>
        </div>

        {/* Booking Tabs */}
        <div className="max-w-5xl mx-auto animate-fade-up delay-300">
          <Tabs defaultValue="sandra" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-10 h-auto p-2 bg-card border border-border/50 rounded-2xl">
              {therapists.map((therapist) => (
                <TabsTrigger
                  key={therapist.id}
                  value={therapist.id}
                  className="flex items-center gap-4 py-5 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <img 
                    src={therapist.image} 
                    alt={therapist.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-current/20"
                  />
                  <div className="text-left">
                    <span className="block font-semibold text-base">Book {therapist.name.split(" ")[0]}</span>
                    <span className="block text-xs opacity-70">{therapist.title}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {therapists.map((therapist) => (
              <TabsContent key={therapist.id} value={therapist.id}>
                <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft">
                  {/* Calendar Embed Area */}
                  <div className="min-h-[480px] lg:min-h-[550px] flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/10">
                    {therapist.calendarEmbed ? (
                      <iframe
                        src={therapist.calendarEmbed}
                        className="w-full h-full min-h-[480px] lg:min-h-[550px] border-0"
                        title={`Book appointment with ${therapist.name}`}
                      />
                    ) : (
                      <div className="text-center p-12 max-w-lg mx-auto">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                          Calendar Coming Soon
                        </h3>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                          {therapist.name}'s booking calendar will be available here shortly. 
                          In the meantime, please contact us to schedule your appointment.
                        </p>
                        <Button size="lg" asChild>
                          <Link to="/contact">
                            Contact Us to Book
                            <ArrowRight size={18} />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Info Bar */}
                  <div className="p-6 bg-muted/30 border-t border-border/50">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <Clock size={18} className="text-primary" />
                        <span>50-60 min session</span>
                      </div>
                      <div className="hidden sm:block w-px h-5 bg-border" />
                      <div className="flex items-center gap-2 text-foreground">
                        <span className="font-semibold text-primary">{therapist.price}</span>
                        <span className="text-muted-foreground">per session</span>
                      </div>
                      <div className="hidden sm:block w-px h-5 bg-border" />
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User size={18} />
                        <span>Online & In-Person Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Booking;

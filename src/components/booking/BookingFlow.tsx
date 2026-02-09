import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SlotSelection from "./SlotSelection";
import CustomerForm from "./CustomerForm";
import BookingConfirmation from "./BookingConfirmation";
import sandraImage from "@/assets/sandra-russet-silk.png";
import brettImage from "@/assets/brett-boyland.png";

export interface Slot {
  id: string;
  therapist: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const therapistInfo: Record<string, { name: string; title: string; image: string; price: string }> = {
  sandra: {
    name: "Sandra Russet-Silk",
    title: "Psychoanalytic Psychotherapist",
    image: sandraImage,
    price: "$110.00 AUD",
  },
  brett: {
    name: "Brett Boyland",
    title: "Master of Counselling",
    image: brettImage,
    price: "$110.00 AUD",
  },
};

const BookingFlow = () => {
  const [step, setStep] = useState<"select" | "details" | "confirm">("select");
  const [selectedTherapist, setSelectedTherapist] = useState("sandra");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [customerData, setCustomerData] = useState<CustomerData>({ name: "", email: "", phone: "", address: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      setIsLoading(true);
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("available_slots")
        .select("*")
        .eq("is_booked", false)
        .gte("slot_date", today)
        .order("slot_date")
        .order("start_time");
      setSlots(data || []);
      setIsLoading(false);
    };
    fetchSlots();
  }, []);

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
    setSelectedTherapist(slot.therapist);
    setStep("details");
  };

  const handleCustomerSubmit = (data: CustomerData) => {
    setCustomerData(data);
    setStep("confirm");
  };

  const handleBack = () => {
    if (step === "details") setStep("select");
    if (step === "confirm") setStep("details");
  };

  return (
    <section id="booking" className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container-wide mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <CalendarDays size={16} />
            Book Your Session
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Schedule an Appointment
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-up delay-200">
            Choose a time slot, enter your details, and confirm your booking.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2">
            {[
              { key: "select", label: "Choose Slot" },
              { key: "details", label: "Your Details" },
              { key: "confirm", label: "Confirm & Pay" },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    step === s.key
                      ? "bg-primary text-primary-foreground"
                      : ["select", "details", "confirm"].indexOf(step) > i
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:inline ${
                    step === s.key ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                {i < 2 && <div className="w-8 lg:w-16 h-px bg-border" />}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto animate-fade-up delay-300">
          {step === "select" && (
            <SlotSelection
              slots={slots}
              isLoading={isLoading}
              selectedTherapist={selectedTherapist}
              onTherapistChange={setSelectedTherapist}
              onSlotSelect={handleSlotSelect}
            />
          )}
          {step === "details" && selectedSlot && (
            <CustomerForm
              selectedSlot={selectedSlot}
              customerData={customerData}
              onSubmit={handleCustomerSubmit}
              onBack={handleBack}
            />
          )}
          {step === "confirm" && selectedSlot && (
            <BookingConfirmation
              selectedSlot={selectedSlot}
              customerData={customerData}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingFlow;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Calendar, Clock, User, Mail, Phone, MapPin, CreditCard } from "lucide-react";
import { Slot, CustomerData, therapistInfo } from "./BookingFlow";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BookingConfirmationProps {
  selectedSlot: Slot;
  customerData: CustomerData;
  onBack: () => void;
}

const formatDate = (date: string) =>
  new Date(date + "T00:00:00").toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const formatTime = (time: string) => {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
};

const BookingConfirmation = ({ selectedSlot, customerData, onBack }: BookingConfirmationProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const info = therapistInfo[selectedSlot.therapist];

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      // Create booking record
      const { error: bookingError } = await supabase.from("bookings").insert({
        slot_id: selectedSlot.id,
        therapist: selectedSlot.therapist,
        customer_name: customerData.name.trim(),
        customer_email: customerData.email.trim(),
        customer_phone: customerData.phone.trim(),
        customer_address: customerData.address?.trim() || null,
        session_price: 110.0,
        payment_status: "pending",
      });

      if (bookingError) throw bookingError;

      // Mark slot as booked
      const { error: slotError } = await supabase
        .from("available_slots")
        .update({ is_booked: true })
        .eq("id", selectedSlot.id);

      if (slotError) throw slotError;

      // Send email notification to therapists
      try {
        await supabase.functions.invoke("send-booking-notification", {
          body: {
            therapistName: info.name,
            customerName: customerData.name.trim(),
            customerEmail: customerData.email.trim(),
            customerPhone: customerData.phone.trim(),
            customerAddress: customerData.address?.trim() || undefined,
            sessionDate: formatDate(selectedSlot.slot_date),
            sessionTime: `${formatTime(selectedSlot.start_time)} – ${formatTime(selectedSlot.end_time)}`,
            sessionPrice: info.price,
          },
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
        // Don't block booking if email fails
      }

      setIsConfirmed(true);
      toast.success("Booking confirmed! We'll be in touch shortly.");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to complete booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConfirmed) {
    return (
      <div className="bg-card rounded-3xl border border-border/50 p-12 text-center shadow-soft">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
          Booking Confirmed!
        </h3>
        <p className="text-muted-foreground mb-2 max-w-md mx-auto">
          Your session with {info.name} is booked for {formatDate(selectedSlot.slot_date)} at{" "}
          {formatTime(selectedSlot.start_time)}.
        </p>
        <p className="text-sm text-muted-foreground">
          A confirmation email will be sent to <span className="font-medium text-foreground">{customerData.email}</span>.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Payment of <span className="font-semibold text-primary">{info.price}</span> will be collected at the session or via invoice.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft">
      <div className="bg-primary/5 p-6 border-b border-border/50">
        <h3 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Confirm Your Booking
        </h3>
        <p className="text-sm text-muted-foreground mt-1">Review your details and confirm</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Session Details */}
        <div className="bg-muted/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-4">
            <img src={info.image} alt={info.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
            <div>
              <p className="font-semibold text-foreground">{info.name}</p>
              <p className="text-sm text-muted-foreground">{info.title}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-foreground">
              <Calendar size={14} className="text-primary" />
              {formatDate(selectedSlot.slot_date)}
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <Clock size={14} className="text-primary" />
              {formatTime(selectedSlot.start_time)} – {formatTime(selectedSlot.end_time)}
            </span>
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-muted/30 rounded-xl p-5 space-y-2">
          <h4 className="font-semibold text-foreground text-sm mb-3">Your Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-foreground">
              <User size={14} className="text-primary" /> {customerData.name}
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Mail size={14} className="text-primary" /> {customerData.email}
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Phone size={14} className="text-primary" /> {customerData.phone}
            </div>
            {customerData.address && (
              <div className="flex items-center gap-2 text-foreground">
                <MapPin size={14} className="text-primary" /> {customerData.address}
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between bg-primary/5 rounded-xl p-5">
          <span className="font-semibold text-foreground">Session Fee</span>
          <span className="font-display text-2xl font-semibold text-primary">{info.price}</span>
        </div>

        <p className="text-xs text-muted-foreground">
          Payment will be collected at the session or via invoice sent to your email. 
          By confirming, you agree to our cancellation policy.
        </p>

        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
          <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
            <ArrowLeft size={16} /> Back
          </Button>
          <Button onClick={handleConfirmBooking} disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Confirming..." : "Confirm Booking"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;

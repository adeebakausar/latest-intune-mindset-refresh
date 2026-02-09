import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, User, Mail, Phone, MapPin, Clock, Calendar } from "lucide-react";
import { Slot, CustomerData, therapistInfo } from "./BookingFlow";

interface CustomerFormProps {
  selectedSlot: Slot;
  customerData: CustomerData;
  onSubmit: (data: CustomerData) => void;
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

const CustomerForm = ({ selectedSlot, customerData, onSubmit, onBack }: CustomerFormProps) => {
  const [form, setForm] = useState<CustomerData>(customerData);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerData, string>>>({});
  const info = therapistInfo[selectedSlot.therapist];

  const validate = () => {
    const errs: Partial<Record<keyof CustomerData, string>> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft">
      {/* Selected Slot Summary */}
      <div className="bg-primary/5 p-6 border-b border-border/50">
        <div className="flex items-center gap-4">
          <img src={info.image} alt={info.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">{info.name}</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-primary" />
                {formatDate(selectedSlot.slot_date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} className="text-primary" />
                {formatTime(selectedSlot.start_time)} – {formatTime(selectedSlot.end_time)}
              </span>
              <span className="font-semibold text-primary">{info.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <h3 className="font-display text-xl font-semibold text-foreground">Your Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User size={14} /> Full Name *
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Smith"
              maxLength={100}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail size={14} /> Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@example.com"
              maxLength={255}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone size={14} /> Phone *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="04XX XXX XXX"
              maxLength={20}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin size={14} /> Address
            </Label>
            <Input
              id="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Your address (optional)"
              maxLength={255}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </Button>
          <Button type="submit">
            Continue to Payment <ArrowRight size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;

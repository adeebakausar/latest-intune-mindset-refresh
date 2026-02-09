import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Calendar, Clock, Lock, Shield } from "lucide-react";
import { Slot, CustomerData, therapistInfo } from "./BookingFlow";

interface PaymentFormProps {
  selectedSlot: Slot;
  customerData: CustomerData;
  onSubmit: (cardData: CardData) => void;
  onBack: () => void;
}

export interface CardData {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
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

const PaymentForm = ({ selectedSlot, customerData, onSubmit, onBack }: PaymentFormProps) => {
  const [cardData, setCardData] = useState<CardData>({
    cardholderName: customerData.name,
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const info = therapistInfo[selectedSlot.therapist];

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cardData);
  };

  const isValid =
    cardData.cardholderName.trim().length > 0 &&
    cardData.cardNumber.replace(/\s/g, "").length === 16 &&
    cardData.expiryDate.length === 5 &&
    cardData.cvc.length >= 3;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Order Summary */}
      <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft">
        <div className="p-6 border-b border-border/50">
          <h3 className="font-display text-xl font-semibold text-foreground">Order Summary</h3>
          <p className="text-sm text-muted-foreground mt-1">Review your session details</p>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <img
              src={info.image}
              alt={info.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
            />
            <div className="flex-1">
              <p className="font-semibold text-foreground">{info.name}</p>
              <p className="text-sm text-muted-foreground">{info.title}</p>
            </div>
            <span className="font-display text-lg font-semibold text-foreground">{info.price}</span>
          </div>

          <div className="text-sm text-muted-foreground space-y-1.5">
            <p className="italic">50 minutes</p>
            <p className="flex items-center gap-1.5">
              <Calendar size={14} className="text-primary" />
              {formatDate(selectedSlot.slot_date)} at {formatTime(selectedSlot.start_time)}
            </p>
          </div>

          <div className="border-t border-border/50 pt-4 flex items-center justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-display text-2xl font-semibold text-primary">{info.price}</span>
          </div>

          <div className="bg-muted/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Lock size={14} className="text-primary" />
              <span className="font-semibold text-sm text-foreground">Secure Payment</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your payment is protected by industry-standard encryption. All sessions are confidential.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft">
        <div className="p-6 border-b border-border/50">
          <h3 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Payment Details
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Enter your card information securely</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">Email Address</Label>
            <Input id="email" value={customerData.email} disabled className="bg-muted/30" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardholderName" className="font-semibold">Cardholder Name</Label>
            <Input
              id="cardholderName"
              placeholder="Name on card"
              value={cardData.cardholderName}
              onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="font-semibold">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardData.cardNumber}
              onChange={(e) => setCardData({ ...cardData, cardNumber: formatCardNumber(e.target.value) })}
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="font-semibold">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={cardData.expiryDate}
                onChange={(e) => setCardData({ ...cardData, expiryDate: formatExpiry(e.target.value) })}
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc" className="font-semibold">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cardData.cvc}
                onChange={(e) => setCardData({ ...cardData, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                maxLength={4}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
            <span className="flex items-center gap-1"><Shield size={12} /> Secure checkout</span>
            <span className="flex items-center gap-1"><Lock size={12} /> SSL encrypted</span>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border/50">
            <Button type="button" variant="outline" onClick={onBack}>
              <ArrowLeft size={16} /> Back
            </Button>
            <Button type="submit" disabled={!isValid} className="flex-1">
              <Lock size={16} /> Pay {info.price}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;

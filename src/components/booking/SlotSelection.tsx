import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, User } from "lucide-react";
import { Slot, therapistInfo } from "./BookingFlow";

interface SlotSelectionProps {
  slots: Slot[];
  isLoading: boolean;
  selectedTherapist: string;
  onTherapistChange: (t: string) => void;
  onSlotSelect: (slot: Slot) => void;
}

const formatTime = (time: string) => {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
};

const SlotSelection = ({ slots, isLoading, selectedTherapist, onTherapistChange, onSlotSelect }: SlotSelectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filteredSlots = slots.filter((s) => s.therapist === selectedTherapist);

  // Dates that have available slots
  const availableDates = useMemo(() => {
    const dates = new Set<string>();
    filteredSlots.forEach((s) => dates.add(s.slot_date));
    return dates;
  }, [filteredSlots]);

  // Slots for the selected date
  const slotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = selectedDate.toISOString().split("T")[0];
    return filteredSlots.filter((s) => s.slot_date === dateStr);
  }, [selectedDate, filteredSlots]);

  // Modifier for dates with available slots
  const availableDayModifier = useMemo(() => {
    return filteredSlots.map((s) => new Date(s.slot_date + "T00:00:00"));
  }, [filteredSlots]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const selectedDateStr = selectedDate
    ? selectedDate.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })
    : null;

  return (
    <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft">
      <Tabs value={selectedTherapist} onValueChange={(v) => { onTherapistChange(v); setSelectedDate(undefined); }} className="w-full">
        <div className="p-6 pb-0">
          <TabsList className="grid w-full grid-cols-2 h-auto p-2 bg-muted/50 rounded-2xl">
            {Object.entries(therapistInfo).map(([id, info]) => (
              <TabsTrigger
                key={id}
                value={id}
                className="flex items-center gap-3 py-4 px-4 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <img src={info.image} alt={info.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="text-left">
                  <span className="block font-semibold text-sm">{info.name.split(" ")[0]}</span>
                  <span className="block text-xs opacity-70">{info.price}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {Object.keys(therapistInfo).map((id) => (
          <TabsContent key={id} value={id} className="p-6">
            {isLoading ? (
              <p className="text-center text-muted-foreground py-12">Loading available slots...</p>
            ) : availableDates.size === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">No Slots Available</h3>
                <p className="text-muted-foreground">Check back soon for new appointment times.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => {
                      const dateStr = date.toISOString().split("T")[0];
                      return !availableDates.has(dateStr);
                    }}
                    modifiers={{ available: availableDayModifier }}
                    modifiersClassNames={{
                      available: "bg-primary/15 text-primary font-semibold",
                    }}
                    fromDate={new Date()}
                    className="rounded-xl border border-border/50 p-4"
                  />
                </div>

                {/* Time Slots */}
                <div className="min-h-[280px]">
                  {!selectedDate ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <Clock className="w-10 h-10 text-muted-foreground mb-3" />
                      <p className="text-muted-foreground font-medium">Select a date to view available times</p>
                      <p className="text-sm text-muted-foreground/70 mt-1">
                        Highlighted dates have available slots
                      </p>
                    </div>
                  ) : slotsForDate.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <p className="text-muted-foreground">No slots available on this date.</p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 text-sm">
                        Available times for {selectedDateStr}
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {slotsForDate.map((slot) => (
                          <Button
                            key={slot.id}
                            variant="outline"
                            className="h-auto py-3 px-4 flex flex-col items-center gap-1 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                            onClick={() => onSlotSelect(slot)}
                          >
                            <Clock size={16} />
                            <span className="text-sm font-medium">{formatTime(slot.start_time)}</span>
                            <span className="text-xs opacity-70">{formatTime(slot.end_time)}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                <span>50-60 min session</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>Online & In-Person</span>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SlotSelection;

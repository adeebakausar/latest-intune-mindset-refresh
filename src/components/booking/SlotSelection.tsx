import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, User, SunMedium, Sunrise, Sunset, CalendarDays } from "lucide-react";
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

type TimeFilter = "all" | "morning" | "afternoon" | "evening";

const timeFilterRanges: Record<TimeFilter, { label: string; icon: React.ReactNode; min: number; max: number }> = {
  all: { label: "All Times", icon: <Clock size={14} />, min: 0, max: 24 },
  morning: { label: "Morning (8–12)", icon: <Sunrise size={14} />, min: 8, max: 12 },
  afternoon: { label: "Afternoon (12–5)", icon: <SunMedium size={14} />, min: 12, max: 17 },
  evening: { label: "Evening (5–9)", icon: <Sunset size={14} />, min: 17, max: 21 },
};

const SlotSelection = ({ slots, isLoading, selectedTherapist, onTherapistChange, onSlotSelect }: SlotSelectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");

  const filteredSlots = slots.filter((s) => s.therapist === selectedTherapist);

  const availableDates = useMemo(() => {
    const dates = new Set<string>();
    filteredSlots.forEach((s) => dates.add(s.slot_date));
    return dates;
  }, [filteredSlots]);

  const slotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = selectedDate.toISOString().split("T")[0];
    let daySlots = filteredSlots.filter((s) => s.slot_date === dateStr);

    if (timeFilter !== "all") {
      const { min, max } = timeFilterRanges[timeFilter];
      daySlots = daySlots.filter((s) => {
        const hour = parseInt(s.start_time.split(":")[0]);
        return hour >= min && hour < max;
      });
    }
    return daySlots;
  }, [selectedDate, filteredSlots, timeFilter]);

  const availableDayModifier = useMemo(() => {
    return filteredSlots.map((s) => new Date(s.slot_date + "T00:00:00"));
  }, [filteredSlots]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const selectedDateStr = selectedDate
    ? selectedDate.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })
    : null;

  const totalSlotsForDate = useMemo(() => {
    if (!selectedDate) return 0;
    const dateStr = selectedDate.toISOString().split("T")[0];
    return filteredSlots.filter((s) => s.slot_date === dateStr).length;
  }, [selectedDate, filteredSlots]);

  return (
    <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft">
      <Tabs value={selectedTherapist} onValueChange={(v) => { onTherapistChange(v); setSelectedDate(undefined); setTimeFilter("all"); }} className="w-full">
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
              <div className="flex flex-col items-center py-12 gap-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground">Loading available slots...</p>
              </div>
            ) : availableDates.size === 0 ? (
              <div className="text-center py-12">
                <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">No Slots Available</h3>
                <p className="text-muted-foreground">Check back soon for new appointment times.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Calendar */}
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                    <CalendarDays size={16} className="text-primary" /> Select a Date
                  </h4>
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
                      className="rounded-xl border border-border/50 p-4 pointer-events-auto"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    <span className="inline-block w-3 h-3 rounded bg-primary/15 mr-1 align-middle" />
                    Highlighted dates have available slots
                  </p>
                </div>

                {/* Time Slots */}
                <div className="min-h-[280px]">
                  {!selectedDate ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <Clock className="w-10 h-10 text-muted-foreground mb-3" />
                      <p className="text-muted-foreground font-medium">Select a date to view available times</p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 text-sm">
                        Available times for {selectedDateStr}
                      </h4>

                      {/* Time-of-day filter */}
                      <div className="mb-4">
                        <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as TimeFilter)}>
                          <SelectTrigger className="w-full h-9 text-sm">
                            <SelectValue placeholder="Filter by time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(timeFilterRanges).map(([key, val]) => (
                              <SelectItem key={key} value={key}>
                                <span className="flex items-center gap-2">{val.icon} {val.label}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {slotsForDate.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center py-8">
                          <p className="text-muted-foreground text-sm">
                            {timeFilter !== "all"
                              ? `No ${timeFilterRanges[timeFilter].label.toLowerCase()} slots. ${totalSlotsForDate} slot${totalSlotsForDate !== 1 ? "s" : ""} available at other times.`
                              : "No slots available on this date."}
                          </p>
                          {timeFilter !== "all" && (
                            <Button variant="link" size="sm" className="mt-1 text-primary" onClick={() => setTimeFilter("all")}>
                              Show all times
                            </Button>
                          )}
                        </div>
                      ) : (
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
                      )}
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

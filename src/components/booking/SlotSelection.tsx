import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import { Slot, therapistInfo } from "./BookingFlow";

interface SlotSelectionProps {
  slots: Slot[];
  isLoading: boolean;
  selectedTherapist: string;
  onTherapistChange: (t: string) => void;
  onSlotSelect: (slot: Slot) => void;
}

const formatDate = (date: string) =>
  new Date(date + "T00:00:00").toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

const formatTime = (time: string) => {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
};

const SlotSelection = ({ slots, isLoading, selectedTherapist, onTherapistChange, onSlotSelect }: SlotSelectionProps) => {
  const filteredSlots = slots.filter((s) => s.therapist === selectedTherapist);

  // Group by date
  const grouped: Record<string, Slot[]> = {};
  filteredSlots.forEach((slot) => {
    if (!grouped[slot.slot_date]) grouped[slot.slot_date] = [];
    grouped[slot.slot_date].push(slot);
  });

  return (
    <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft">
      <Tabs value={selectedTherapist} onValueChange={onTherapistChange} className="w-full">
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
            ) : Object.keys(grouped).length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">No Slots Available</h3>
                <p className="text-muted-foreground">Check back soon for new appointment times.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(grouped).map(([date, dateSlots]) => (
                  <div key={date}>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      {formatDate(date)}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {dateSlots.map((slot) => (
                        <Button
                          key={slot.id}
                          variant="outline"
                          className="h-auto py-3 px-4 flex flex-col items-center gap-1 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                          onClick={() => onSlotSelect(slot)}
                        >
                          <Clock size={16} />
                          <span className="text-sm font-medium">
                            {formatTime(slot.start_time)}
                          </span>
                          <span className="text-xs opacity-70">
                            {formatTime(slot.end_time)}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
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

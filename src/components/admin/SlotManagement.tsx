import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, Trash2, Clock, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Slot {
  id: string;
  therapist: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

const SlotManagement = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [therapist, setTherapist] = useState("sandra");
  const [slotDate, setSlotDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [isAdding, setIsAdding] = useState(false);

  const fetchSlots = async () => {
    const { data, error } = await supabase
      .from("available_slots")
      .select("*")
      .order("slot_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) {
      console.error("Error fetching slots:", error);
      toast.error("Failed to load slots");
    } else {
      setSlots(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleAddSlot = async () => {
    if (!slotDate || !startTime || !endTime) {
      toast.error("Please fill in all fields");
      return;
    }
    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }

    setIsAdding(true);
    const { error } = await supabase.from("available_slots").insert({
      therapist,
      slot_date: slotDate,
      start_time: startTime,
      end_time: endTime,
    });

    if (error) {
      console.error("Error adding slot:", error);
      toast.error("Failed to add slot. Make sure you're logged in.");
    } else {
      toast.success("Slot added successfully!");
      setSlotDate("");
      fetchSlots();
    }
    setIsAdding(false);
  };

  const handleDeleteSlot = async (id: string) => {
    const { error } = await supabase.from("available_slots").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete slot");
    } else {
      toast.success("Slot removed");
      setSlots(slots.filter((s) => s.id !== id));
    }
  };

  const sandraSlots = slots.filter((s) => s.therapist === "sandra");
  const brettSlots = slots.filter((s) => s.therapist === "brett");

  const formatDate = (date: string) =>
    new Date(date + "T00:00:00").toLocaleDateString("en-AU", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatTime = (time: string) => {
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Manage Available Time Slots
        </CardTitle>
        <CardDescription>
          Add available appointment slots for each therapist. Customers will see these and book from them.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Add New Slot Form */}
        <div className="bg-muted/50 rounded-xl p-6 space-y-4">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <Plus size={18} className="text-primary" />
            Add New Slot
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Therapist</Label>
              <Select value={therapist} onValueChange={setTherapist}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sandra">Sandra Russet-Silk</SelectItem>
                  <SelectItem value="brett">Brett Boyland</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={slotDate}
                onChange={(e) => setSlotDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleAddSlot} disabled={isAdding}>
            {isAdding ? "Adding..." : "Add Slot"}
          </Button>
        </div>

        {/* Existing Slots */}
        {isLoading ? (
          <p className="text-muted-foreground text-center py-8">Loading slots...</p>
        ) : (
          <div className="space-y-6">
            {[
              { label: "Sandra Russet-Silk", data: sandraSlots },
              { label: "Brett Boyland", data: brettSlots },
            ].map(({ label, data }) => (
              <div key={label}>
                <h4 className="font-semibold text-foreground mb-3">{label}</h4>
                {data.length === 0 ? (
                  <p className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-4">
                    No slots added yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {data.map((slot) => (
                      <div
                        key={slot.id}
                        className={`flex items-center justify-between rounded-lg border p-3 ${
                          slot.is_booked
                            ? "bg-destructive/5 border-destructive/20"
                            : "bg-card border-border/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <Clock size={16} className="text-primary" />
                          <span className="font-medium text-sm">
                            {formatDate(slot.slot_date)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
                          </span>
                          {slot.is_booked && (
                            <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full font-medium">
                              Booked
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSlot(slot.id)}
                          disabled={slot.is_booked}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <AlertCircle size={16} className="text-primary" />
            Tips
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Add slots for the upcoming weeks so customers can book</li>
            <li>Booked slots cannot be deleted</li>
            <li>You can add multiple slots per day for each therapist</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SlotManagement;

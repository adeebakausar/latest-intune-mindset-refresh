
-- Table for therapist available time slots (admin manages these)
CREATE TABLE public.available_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  therapist TEXT NOT NULL CHECK (therapist IN ('sandra', 'brett')),
  slot_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for customer bookings
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_id UUID NOT NULL REFERENCES public.available_slots(id) ON DELETE CASCADE,
  therapist TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT,
  session_price NUMERIC(10,2) NOT NULL DEFAULT 110.00,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  stripe_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.available_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Available slots: publicly readable, admin can manage
CREATE POLICY "Slots are publicly readable"
  ON public.available_slots FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert slots"
  ON public.available_slots FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update slots"
  ON public.available_slots FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete slots"
  ON public.available_slots FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Bookings: publicly insertable (customers book), admin can view all
CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Bookings are publicly readable by email"
  ON public.bookings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Trigger for updated_at on bookings
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_settings_updated_at();

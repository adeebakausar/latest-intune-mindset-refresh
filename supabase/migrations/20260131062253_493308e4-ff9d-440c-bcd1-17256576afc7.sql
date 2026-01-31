-- Create a settings table for storing client configuration
CREATE TABLE public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (needed for calendar links on booking page)
CREATE POLICY "Settings are publicly readable" 
ON public.settings 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to update settings
CREATE POLICY "Authenticated users can update settings" 
ON public.settings 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Create policy for authenticated users to insert settings
CREATE POLICY "Authenticated users can insert settings" 
ON public.settings 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Insert default settings rows
INSERT INTO public.settings (key, value) VALUES
  ('stripe_configured', 'false'),
  ('sandra_calendar_url', null),
  ('brett_calendar_url', null);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.update_settings_updated_at();
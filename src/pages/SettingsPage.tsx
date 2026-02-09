import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, CreditCard, Calendar, Save, CheckCircle, AlertCircle, Eye, EyeOff, ArrowLeft, CalendarDays, CircleDollarSign, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SlotManagement from "@/components/admin/SlotManagement";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showStripeKey, setShowStripeKey] = useState(false);
  
  // Form state
  const [stripeSecretKey, setStripeSecretKey] = useState("");
  const [sandraCalendarUrl, setSandraCalendarUrl] = useState("");
  const [brettCalendarUrl, setBrettCalendarUrl] = useState("");
  
  // Load existing settings
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("key, value");
        
        if (error) throw error;
        
        data?.forEach((setting) => {
          switch (setting.key) {
            case "sandra_calendar_url":
              setSandraCalendarUrl(setting.value || "");
              break;
            case "brett_calendar_url":
              setBrettCalendarUrl(setting.value || "");
              break;
          }
        });
      } catch (error) {
        console.error("Error loading settings:", error);
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, []);

  const handleSaveCalendarSettings = async () => {
    setIsSaving(true);
    try {
      // Update Sandra's calendar URL
      const { error: sandraError } = await supabase
        .from("settings")
        .update({ value: sandraCalendarUrl || null })
        .eq("key", "sandra_calendar_url");
      
      if (sandraError) throw sandraError;

      // Update Brett's calendar URL
      const { error: brettError } = await supabase
        .from("settings")
        .update({ value: brettCalendarUrl || null })
        .eq("key", "brett_calendar_url");
      
      if (brettError) throw brettError;

      toast.success("Calendar settings saved successfully!");
    } catch (error) {
      console.error("Error saving calendar settings:", error);
      toast.error("Failed to save calendar settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveStripeSettings = async () => {
    if (!stripeSecretKey.trim()) {
      toast.error("Please enter your Stripe Secret Key");
      return;
    }

    if (!stripeSecretKey.startsWith("sk_")) {
      toast.error("Invalid Stripe Secret Key format. It should start with 'sk_'");
      return;
    }

    setIsSaving(true);
    try {
      // Update stripe configured status
      const { error } = await supabase
        .from("settings")
        .update({ value: "true" })
        .eq("key", "stripe_configured");
      
      if (error) throw error;

      toast.success("Stripe settings saved! Note: The API key needs to be added to the backend secrets for full integration.");
      toast.info("Contact your developer to complete the Stripe integration with this API key.");
      setStripeSecretKey("");
    } catch (error) {
      console.error("Error saving Stripe settings:", error);
      toast.error("Failed to save Stripe settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
          <div className="container-wide mx-auto">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                    Settings
                  </h1>
                  <p className="text-muted-foreground">
                    Configure your payment and booking integrations
                  </p>
                </div>
              </div>

              <Tabs defaultValue="slots" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="slots" className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    Time Slots
                  </TabsTrigger>
                  <TabsTrigger value="calendars" className="flex items-center gap-2">
                    <Calendar size={18} />
                    Calendar Links
                  </TabsTrigger>
                  <TabsTrigger value="payments" className="flex items-center gap-2">
                    <CircleDollarSign size={18} />
                    Payment Methods
                  </TabsTrigger>
                </TabsList>

                {/* Slot Management Tab */}
                <TabsContent value="slots">
                  <SlotManagement />
                </TabsContent>

                {/* Calendar Settings Tab */}
                <TabsContent value="calendars">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Google Calendar Booking Links
                      </CardTitle>
                      <CardDescription>
                        Add your Google Calendar or Calendly embed URLs for each therapist. 
                        These will be displayed on the booking page.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="sandra-calendar">
                            Sandra Russet-Silk - Calendar Embed URL
                          </Label>
                          <Input
                            id="sandra-calendar"
                            type="url"
                            placeholder="https://calendar.google.com/calendar/embed?src=... or https://calendly.com/..."
                            value={sandraCalendarUrl}
                            onChange={(e) => setSandraCalendarUrl(e.target.value)}
                            disabled={isLoading}
                          />
                          <p className="text-xs text-muted-foreground">
                            Paste your Google Calendar embed URL or Calendly scheduling link
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brett-calendar">
                            Brett Boyland - Calendar Embed URL
                          </Label>
                          <Input
                            id="brett-calendar"
                            type="url"
                            placeholder="https://calendar.google.com/calendar/embed?src=... or https://calendly.com/..."
                            value={brettCalendarUrl}
                            onChange={(e) => setBrettCalendarUrl(e.target.value)}
                            disabled={isLoading}
                          />
                          <p className="text-xs text-muted-foreground">
                            Paste your Google Calendar embed URL or Calendly scheduling link
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-4 border-t">
                        <Button 
                          onClick={handleSaveCalendarSettings}
                          disabled={isSaving || isLoading}
                        >
                          {isSaving ? (
                            <>Saving...</>
                          ) : (
                            <>
                              <Save size={18} />
                              Save Calendar Settings
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <AlertCircle size={16} className="text-primary" />
                          How to get your calendar embed URL
                        </h4>
                        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                          <li>Go to Google Calendar and open Settings</li>
                          <li>Select the calendar you want to embed</li>
                          <li>Scroll to "Integrate calendar" section</li>
                          <li>Copy the "Embed code" and extract the URL from the iframe src</li>
                          <li>Or use Calendly: copy your scheduling page URL</li>
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Payment Methods Tab */}
                <TabsContent value="payments">
                  <div className="space-y-6">
                    {/* PayPal - Active */}
                    <Card className="border-primary/30">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[hsl(210,80%,50%)]/10 flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-[hsl(210,80%,50%)]" />
                            </div>
                            PayPal
                          </CardTitle>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            <CheckCircle size={14} />
                            Active
                          </span>
                        </div>
                        <CardDescription>
                          PayPal is connected and accepting payments for session bookings.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-primary/5 rounded-xl p-4 space-y-2">
                          <p className="text-sm text-foreground font-medium">✅ PayPal is live and processing payments</p>
                          <p className="text-sm text-muted-foreground">
                            Customers can pay securely via PayPal when confirming their booking. Funds are deposited directly to your linked PayPal account.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Payoneer - Setup Instructions */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <CircleDollarSign className="w-5 h-5 text-muted-foreground" />
                            </div>
                            Payoneer
                          </CardTitle>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                            <AlertCircle size={14} />
                            Not Connected
                          </span>
                        </div>
                        <CardDescription>
                          Add Payoneer as an additional payment method for your customers.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-muted/50 rounded-xl p-5">
                          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                            <Settings size={16} className="text-primary" />
                            How to Add Payoneer
                          </h4>
                          <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                            <li>Go to the <strong>Payments</strong> section in your Shopify admin</li>
                            <li>Click <strong>Add payment method</strong> and choose <strong>Payoneer</strong></li>
                            <li>Follow the prompts to integrate it with your store</li>
                            <li>Once connected, Payoneer will appear as a payment option for customers</li>
                          </ol>
                        </div>
                        <Button variant="outline" className="gap-2" asChild>
                          <a href="https://www.payoneer.com" target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} />
                            Visit Payoneer
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Stripe - Optional */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-muted-foreground" />
                            </div>
                            Stripe
                          </CardTitle>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                            <AlertCircle size={14} />
                            Not Connected
                          </span>
                        </div>
                        <CardDescription>
                          Accept credit/debit card payments directly via Stripe.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted/50 rounded-xl p-4">
                          <p className="text-sm text-muted-foreground">
                            Stripe integration can be enabled to accept direct card payments. Contact your developer to set up Stripe for your store.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;

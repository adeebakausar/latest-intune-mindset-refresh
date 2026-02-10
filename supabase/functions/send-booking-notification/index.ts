import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface BookingNotification {
  therapistName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string;
  sessionDate: string;
  sessionTime: string;
  sessionPrice: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const resend = new Resend(resendKey);
    const body: BookingNotification = await req.json();

    const {
      therapistName,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      sessionDate,
      sessionTime,
      sessionPrice,
    } = body;

    // Get notification emails from environment or use defaults
    const sandraEmail = Deno.env.get("SANDRA_NOTIFICATION_EMAIL") || "sandra@intunetherapy.com.au";
    const brettEmail = Deno.env.get("BRETT_NOTIFICATION_EMAIL") || "brett@intunetherapy.com.au";
    const fromEmail = "bookings@intunemindset.store";

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f7f5; padding: 32px;">
        <div style="background: white; border-radius: 16px; padding: 32px; border: 1px solid #e8e5e0;">
          <h1 style="color: #3d6b4f; margin: 0 0 8px 0; font-size: 24px;">New Booking Received! 🎉</h1>
          <p style="color: #6b6560; margin: 0 0 24px 0;">A new counselling session has been booked.</p>
          
          <div style="background: #f0f5f2; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #3d6b4f; margin: 0 0 12px 0; font-size: 16px;">Session Details</h3>
            <p style="margin: 4px 0; color: #333;"><strong>Therapist:</strong> ${therapistName}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Date:</strong> ${sessionDate}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Time:</strong> ${sessionTime}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Fee:</strong> ${sessionPrice}</p>
          </div>
          
          <div style="background: #faf9f7; border-radius: 12px; padding: 20px;">
            <h3 style="color: #3d6b4f; margin: 0 0 12px 0; font-size: 16px;">Customer Details</h3>
            <p style="margin: 4px 0; color: #333;"><strong>Name:</strong> ${customerName}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Email:</strong> ${customerEmail}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Phone:</strong> ${customerPhone}</p>
            ${customerAddress ? `<p style="margin: 4px 0; color: #333;"><strong>Address:</strong> ${customerAddress}</p>` : ""}
          </div>
          
          <p style="color: #999; font-size: 12px; margin-top: 24px; text-align: center;">
            This is an automated notification from Intune Therapy & Counselling.
          </p>
        </div>
      </div>
    `;

    // Send to both Sandra and Brett
    const emailPromises = [sandraEmail, brettEmail].map((to) =>
      resend.emails.send({
        from: `Intune Bookings <${fromEmail}>`,
        to: [to],
        subject: `New Booking: ${customerName} - ${sessionDate}`,
        html: htmlContent,
      })
    );

    const results = await Promise.allSettled(emailPromises);
    const errors = results.filter((r) => r.status === "rejected");

    if (errors.length === results.length) {
      throw new Error("Failed to send all notification emails");
    }

    console.log("Booking notification emails sent:", results);

    return new Response(JSON.stringify({ success: true, sent: results.length - errors.length }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending booking notification:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);

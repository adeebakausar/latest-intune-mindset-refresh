import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
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
    const { name, email, phone, message }: ContactForm = await req.json();

    if (!name || !email || !message) {
      throw new Error("Missing required fields");
    }

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f7f5; padding: 32px;">
        <div style="background: white; border-radius: 16px; padding: 32px; border: 1px solid #e8e5e0;">
          <h1 style="color: #3d6b4f; margin: 0 0 8px 0; font-size: 24px;">New Contact Form Message 📩</h1>
          <p style="color: #6b6560; margin: 0 0 24px 0;">Someone reached out through the website contact form.</p>
          
          <div style="background: #faf9f7; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #3d6b4f; margin: 0 0 12px 0; font-size: 16px;">Contact Details</h3>
            <p style="margin: 4px 0; color: #333;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 4px 0; color: #333;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="margin: 4px 0; color: #333;"><strong>Phone:</strong> ${phone}</p>` : ""}
          </div>
          
          <div style="background: #f0f5f2; border-radius: 12px; padding: 20px;">
            <h3 style="color: #3d6b4f; margin: 0 0 12px 0; font-size: 16px;">Message</h3>
            <p style="margin: 0; color: #333; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #999; font-size: 12px; margin-top: 24px; text-align: center;">
            This is an automated notification from Intune Therapy & Counselling website.
          </p>
        </div>
      </div>
    `;

    // Send to both email addresses
    const recipients = ["intunemindset@gmail.com", "brettboy753@gmail.com"];
    const emailPromises = recipients.map((to) =>
      resend.emails.send({
        from: "Intune Contact <onboarding@resend.dev>",
        to: [to],
        subject: `Contact Form: Message from ${name}`,
        html: htmlContent,
        reply_to: email,
      })
    );

    const results = await Promise.allSettled(emailPromises);
    console.log("Contact form emails sent:", results);

    const errors = results.filter((r) => r.status === "rejected");
    if (errors.length === results.length) {
      throw new Error("Failed to send all emails");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);

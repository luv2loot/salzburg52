import crypto from "crypto";

// Generate random password
function generatePassword() {
  return crypto.randomBytes(12).toString("hex");
}

// List of recipient emails
const RECIPIENT_EMAILS = [
  "info@salzburg52.com",
  "amir.ismaili@salzburg52.com",
  "ivydark3@icloud.com"
];

export async function POST(request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const newPassword = generatePassword();

    // Try to send email via Resend using dynamic import
    try {
      const { Resend } = await import("resend");
      
      // Get Resend API key from environment
      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        console.warn("RESEND_API_KEY not found in environment");
      } else {
        const resend = new Resend(resendApiKey);
        
        // Send email to all recipients
        const emailPromises = RECIPIENT_EMAILS.map(email =>
          resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
            to: email,
            subject: "🔐 New Salzburg52 Admin Password",
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px;">
                <h2 style="color: #2563EB; margin-top: 0;">New Admin Password Generated</h2>
                <p style="color: #6b7280; font-size: 0.95rem; line-height: 1.6;">
                  A new password has been generated for your Salzburg52 admin dashboard.
                </p>
                
                <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0; text-align: center;">
                  <div style="font-family: 'Courier New', monospace; font-size: 1.2rem; font-weight: bold; color: #1f2937; letter-spacing: 2px;">
                    ${newPassword}
                  </div>
                </div>
                
                <p style="color: #6b7280; font-size: 0.9rem; margin: 1rem 0;">
                  ⏰ <strong>This password expires when you log out</strong> of the admin dashboard.
                </p>
                <p style="color: #6b7280; font-size: 0.9rem; margin: 1rem 0;">
                  🔗 Admin Panel: <a href="https://salzburg52.com/admin/dashboard" style="color: #2563EB; text-decoration: none;"><strong>https://salzburg52.com/admin/dashboard</strong></a>
                </p>
                
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0;">
                <p style="color: #9ca3af; font-size: 0.85rem; margin: 0;">
                  If you didn't request this, please ignore this email and change your admin credentials immediately.
                </p>
              </div>
            `,
          })
        );

        await Promise.all(emailPromises);
        console.log(`✅ Email sent successfully to ${RECIPIENT_EMAILS.join(", ")}`);
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError.message);
      // Still return password even if email fails
    }

    return Response.json({
      password: newPassword,
      message: "Password generated",
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { message: "Failed to generate password" },
      { status: 500 }
    );
  }
}

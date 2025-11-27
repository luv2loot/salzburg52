import crypto from "crypto";
import { Resend } from "resend";

// Generate random password
function generatePassword() {
  return crypto.randomBytes(12).toString("hex");
}

// Get Resend credentials from Replit connector
async function getResendCredentials() {
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY
      ? "repl " + process.env.REPL_IDENTITY
      : process.env.WEB_REPL_RENEWAL
        ? "depl " + process.env.WEB_REPL_RENEWAL
        : null;

    if (!xReplitToken) {
      console.warn("No Replit token found");
      return null;
    }

    const response = await fetch(
      "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=resend",
      {
        headers: {
          Accept: "application/json",
          X_REPLIT_TOKEN: xReplitToken,
        },
      }
    );

    const data = await response.json();
    const connectionSettings = data.items?.[0];

    if (!connectionSettings || !connectionSettings.settings.api_key) {
      console.warn("Resend connection not found or missing API key");
      return null;
    }

    return {
      apiKey: connectionSettings.settings.api_key,
      fromEmail: connectionSettings.settings.from_email,
    };
  } catch (error) {
    console.error("Error getting Resend credentials:", error);
    return null;
  }
}

export async function POST(request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const newPassword = generatePassword();
    const adminEmail = process.env.ADMIN_EMAIL || "info@salzburg52.com";

    // Try to send email via Resend
    const credentials = await getResendCredentials();
    if (credentials) {
      try {
        const resend = new Resend(credentials.apiKey);
        
        await resend.emails.send({
          from: credentials.fromEmail || "onboarding@resend.dev",
          to: adminEmail,
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
        });

        console.log("Email sent successfully via Resend");
      } catch (emailError) {
        console.error("Resend email sending failed:", emailError);
        // Still return password even if email fails
      }
    } else {
      console.warn("Resend not configured - password generated but not emailed");
    }

    return Response.json({
      password: newPassword,
      message: "Password generated" + (credentials ? " and email sent" : " (email not configured)"),
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { message: "Failed to generate password" },
      { status: 500 }
    );
  }
}

import crypto from "crypto";
import { Resend } from "resend";
import { tempPasswords } from "@/lib/tempPasswordStore.js";

// Generate random temporary password
function generatePassword() {
  return crypto.randomBytes(12).toString("hex");
}

// List of recipient emails (domain verified - all emails can receive)
const RECIPIENT_EMAILS = [
  "amir2007ismaili@gmail.com",
  "amir.ismaili@salzburg52.onmicrosoft.com"
];

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { username } = await request.json();

    if (!username || username !== (process.env.ADMIN_USERNAME || "adms52")) {
      return Response.json(
        { message: "Invalid username" },
        { status: 401 }
      );
    }

    const tempPassword = generatePassword();
    const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now

    // Store temporary password with expiry in shared store
    tempPasswords.set(username, {
      password: tempPassword,
      expiresAt: expiryTime,
    });

    // Send email via Resend
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@salzburg52.com";
      
      console.log("Sending emails from:", fromEmail);
      console.log("Sending to:", RECIPIENT_EMAILS);

      // Send email to all recipients
      const emailPromises = RECIPIENT_EMAILS.map(email =>
        resend.emails.send({
          from: fromEmail,
          to: email,
          subject: "🔐 Salzburg52 Admin - Temporary Password",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px;">
              <h2 style="color: #2563EB; margin-top: 0;">Temporary Admin Password</h2>
              <p style="color: #6b7280; font-size: 0.95rem; line-height: 1.6;">
                A login request was initiated for your Salzburg52 admin account.
              </p>
              
              <div style="background: #f3f4f6; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0; text-align: center;">
                <p style="color: #6b7280; font-size: 0.9rem; margin: 0 0 0.5rem 0;">Your temporary password:</p>
                <div style="font-family: 'Courier New', monospace; font-size: 1.2rem; font-weight: bold; color: #1f2937; letter-spacing: 2px;">
                  ${tempPassword}
                </div>
              </div>
              
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px; margin: 1.5rem 0;">
                <p style="color: #92400e; font-size: 0.9rem; margin: 0; font-weight: 600;">
                  ⚠️ This password expires in 5 minutes
                </p>
              </div>
              
              <p style="color: #6b7280; font-size: 0.9rem; margin: 1rem 0;">
                🔗 Admin Panel: <a href="https://salzburg52.com/admin/unlock" style="color: #2563EB; text-decoration: none;"><strong>https://salzburg52.com/admin/unlock</strong></a>
              </p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0;">
              <p style="color: #9ca3af; font-size: 0.85rem; margin: 0;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
          `,
        })
      );

      const results = await Promise.allSettled(emailPromises);
      
      // Log results
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          console.log(`✅ Email sent to ${RECIPIENT_EMAILS[index]}`);
        } else {
          console.error(`❌ Email failed to ${RECIPIENT_EMAILS[index]}:`, result.reason);
        }
      });

    } catch (emailError) {
      console.error("Email sending error:", emailError);
      throw emailError;
    }

    return Response.json({
      message: "Temporary password sent to your email",
      expiresIn: 300, // 5 minutes in seconds
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { message: "Failed to send password", error: error.message },
      { status: 500 }
    );
  }
}

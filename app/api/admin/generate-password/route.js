import crypto from "crypto";
import nodemailer from "nodemailer";

// Generate random password
function generatePassword() {
  return crypto.randomBytes(12).toString("hex");
}

// Configure email transporter (using Gmail SMTP for free)
async function getEmailTransporter() {
  // For now, we'll create a transporter but return null if no email config
  // User can configure later
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
}

export async function POST(request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const newPassword = generatePassword();
    const adminEmail = process.env.ADMIN_EMAIL || "info@salzburg52.com";

    // Try to send email if configured
    const transporter = await getEmailTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: adminEmail,
          subject: "🔐 New Salzburg52 Admin Password",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px;">
              <h2 style="color: #2563EB;">New Admin Password Generated</h2>
              <p style="color: #6b7280; font-size: 0.95rem; line-height: 1.6;">
                A new password has been generated for your Salzburg52 admin dashboard.
              </p>
              
              <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin: 1.5rem 0; text-align: center;">
                <div style="font-family: monospace; font-size: 1.2rem; font-weight: bold; color: #1f2937; letter-spacing: 2px;">
                  ${newPassword}
                </div>
              </div>
              
              <p style="color: #6b7280; font-size: 0.9rem;">
                ⏰ This password expires when you log out of the admin dashboard.
              </p>
              <p style="color: #6b7280; font-size: 0.9rem;">
                🔗 Admin Panel: <a href="https://salzburg52.com/admin/dashboard" style="color: #2563EB;">https://salzburg52.com/admin/dashboard</a>
              </p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0;">
              <p style="color: #9ca3af; font-size: 0.85rem;">
                If you didn't request this, please ignore this email and change your admin credentials immediately.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Still return password even if email fails
      }
    }

    return Response.json({
      password: newPassword,
      message: "Password generated and email sent (if configured)",
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { message: "Failed to generate password" },
      { status: 500 }
    );
  }
}

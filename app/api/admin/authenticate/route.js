import { tempPasswords } from "@/lib/tempPasswordStore.js";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "adms52";
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@salzburg52.com";

    // Check if username is correct
    if (username !== ADMIN_USERNAME) {
      return Response.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Check if temporary password exists and is not expired
    const tempData = tempPasswords.get(username);
    if (!tempData) {
      return Response.json(
        { message: "Password expired or not requested. Please send a new request." },
        { status: 401 }
      );
    }

    // Check if password is expired
    if (Date.now() > tempData.expiresAt) {
      tempPasswords.delete(username);
      return Response.json(
        { message: "Password expired. Please request a new one." },
        { status: 401 }
      );
    }

    // Check if password matches
    if (password !== tempData.password) {
      return Response.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Password is valid - delete it so it can't be reused
    tempPasswords.delete(username);

    // Generate a simple JWT-like token
    const token = Buffer.from(
      JSON.stringify({
        username,
        email: ADMIN_EMAIL,
        iat: Date.now(),
      })
    ).toString("base64");

    return Response.json({
      token,
      email: ADMIN_EMAIL,
      message: "Authentication successful",
    });
  } catch (error) {
    console.error("Auth error:", error);
    return Response.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}

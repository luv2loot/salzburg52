export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Hardcoded credentials (change these!)
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "salzburg52";
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@salzburg52.com";

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return Response.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Generate a simple JWT-like token (not production secure, but fine for this use case)
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
    return Response.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "adms52";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "salzburg52adminpanel";

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return Response.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Generate simple token
    const token = Buffer.from(
      JSON.stringify({
        username,
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      })
    ).toString("base64");

    return Response.json({
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}

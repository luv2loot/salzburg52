export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const ADMIN_USERNAME = "adms52";
    const ADMIN_PASSWORD = "salzburg52adminpanel";

    // Check username first
    if (username !== ADMIN_USERNAME) {
      return Response.json(
        { 
          message: "Invalid username",
          error: "INVALID_USERNAME"
        },
        { status: 401 }
      );
    }

    // Then check password
    if (password !== ADMIN_PASSWORD) {
      return Response.json(
        { 
          message: "Invalid password",
          error: "INVALID_PASSWORD"
        },
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
    return Response.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}

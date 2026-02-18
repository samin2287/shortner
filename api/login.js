export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { email, password } = req.body;

  if (email === "test@gmail.com" && password === "1234") {
    res.status(200).json({
      message: "Login successful",
      user: {
        id: "1",
        name: "Test User",
        email: "test@gmail.com",
      },
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}

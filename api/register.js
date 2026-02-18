export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "Name, email, and password are required" });
    return;
  }

  res.status(201).json({
    message: "Registration successful",
    user: {
      id: "2",
      name,
      email,
    },
  });
}

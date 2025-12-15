// <<=====  SIGNUP AND LOGIN CONTROLLERS START HERE ======>>
const user = require("../models/userSchema");
const signup = async (req, res) => {
  console.log("REQ BODY =====>", req.body);

  const { fullName, email, password } = req.body;
  try {
    //full name validation
    if (!fullName) return res.status(400).send("Full name is required");
    if (!isValidFullName(fullName))
      return res.status(400).send("Invalid full name");
    //email validation
    if (!email) return res.status(400).send("Email is required");
    if (!isValidEmail(email)) return res.status(400).send("Invalid email");
    //password validation
    if (!password) return res.status(400).send("Password is required");
    if (!isValidPassword(password))
      return res.status(400).send("Invalid password");

    const existingUser = await userSchema.findOne({ email });
    if (existingUser)
      return res.status(400).send("User with this email already exists");
    const user = new userSchema({
      fullName,
      email,
      password,
    });

    await user.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
// <<=====  SIGNUP AND LOGIN CONTROLLERS END HERE ======>>

// <<=====  LOGIN CONTROLLER START HERE ======>>
const login = async (req, res) => {
  res.send("login route");
};
// <<=====  LOGIN CONTROLLER END HERE ======>>
module.exports = { signup, login };

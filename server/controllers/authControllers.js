// <<=====  SIGNUP AND LOGIN CONTROLLERS START HERE ======>>
const user = require("../models/userSchema");

const {
  isValidEmail,
  isValidPassword,
  isValidFullName,
} = require("../utils/validation");
const userSchema = require("../models/userSchema");
const { generateAccessToken } = require("../utils/token");

// <<=====  SIGNUP CONTROLLER START HERE ======>>
const signup = async (req, res) => {
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

    // create token and set cookie
    const token = generateAccessToken({ id: user._id, email: user.email });
    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };
    res.cookie("accessToken", token, cookieOptions);

    res.status(201).send({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
// <<=====  SIGNUP AND LOGIN CONTROLLERS END HERE ======>>

// <<=====  LOGIN CONTROLLER START HERE ======>>
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(400).send("Email is required");
    if (!isValidEmail(email)) return res.status(400).send("Invalid email");

    if (!password) return res.status(400).send("Password is required");
    const existingUser = await userSchema.findOne({ email });
    if (!existingUser)
      return res.status(400).send("User with this email does not exist");
    const matchPassword = await existingUser.comparePassword(password);
    if (!matchPassword) return res.status(400).send("Invalid password");

    const token = generateAccessToken({
      id: existingUser._id,
      email: existingUser.email,
    });

    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };
    res.cookie("accessToken", token, cookieOptions);

    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
// <<=====  LOGIN CONTROLLER END HERE ======>>
// <<===== LOGOUT CONTROLLER START HERE ======>>

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");

    return res.status(200).send({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// <<===== LOGOUT CONTROLLER END HERE ======>>
// <<=====  GET PROFILE START HERE ======>>

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userSchema
      .findById(userId)
      .select("-password -__v -createdAt -updatedAt");
    if (!userData) return res.status(404).send({ message: "User not found" });

    res.status(200).send({ userData });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
// <<=====  GET PROFILE END HERE ======>>

module.exports = { signup, login, logout, getProfile };

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/auth.js";

// Signup function for user registration
export const signup = async (req, res) => {
  // Destructure user data from the request body
  const { name, email, password } = req.body;
  try {
    // Check if the user with the given email already exists
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }
    
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 12);
     // Create a new user with the hashed password
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the new user
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the new user and the generated token
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    // Handle any errors that occur during signup
    res.status(500).json("Something went worng...");
  }
};

// Login function for user authentication
export const login = async (req, res) => {
  // Destructure user credentials from the request body
  const { email, password } = req.body;
  try {
    // Check if a user with the provided email exists
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }

    // Compare the provided password with the hashed password in the databas
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the authenticated user and the generated token
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    // Handle any errors that occur during login
    res.status(500).json("Something went worng...");
  }
};

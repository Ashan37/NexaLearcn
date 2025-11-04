import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        message: "User already exists with this email",
        success: false 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ 
      message: "User created successfully", 
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Signup failed", 
      success: false,
      error: error.message 
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: "Invalid email or password",
        success: false 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        message: "Invalid email or password",
        success: false 
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET || "your_jwt_secret", 
      { expiresIn: "24h" }
    );

    res.status(200).json({ 
      message: "Login successful", 
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Signin failed", 
      success: false,
      error: error.message 
    });
  }
};

import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const adminSignin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        message: "Please provide username and password",
        success: false 
      });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ 
        message: "Invalid username or password",
        success: false 
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        message: "Invalid username or password",
        success: false 
      });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.status(200).json({ 
      message: "Admin logged in successfully", 
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    console.error("Admin signin error:", error);
    res.status(500).json({ 
      message: "Server error",
      success: false,
      error: error.message 
    });
  }
};

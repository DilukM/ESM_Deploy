import { Router } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import { AdminUser } from "../models/admin.js";

const router = Router();

router.post("/signin", async (req, res) => {
  console.log("Sign-in request received:", req.body);

  try {
    // Validate request body
    const { error } = validate(req.body);
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }
    console.log("Request body validated successfully");

    // Check if the user exists
    const user = await AdminUser.findOne({ email: req.body.email });
    if (!user) {
      console.warn("User not found:", req.body.email);
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    console.log("User found:", user.email);

    // Validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      console.warn("Invalid password for user:", user.email);
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    console.log("Password validated successfully for user:", user.email);

    // Generate authentication token
    const token = user.generateAuthToken();
    console.log("Token generated for user:", user.email);

    // Return the token and user details (if necessary)
    res
      .status(200)
      .json({ data: { token, user }, message: "Logged in successfully" });
    console.log("Sign-in response sent for user:", user.email);
  } catch (error) {
    console.error("Sign-in error:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Validation schema
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

export default router;

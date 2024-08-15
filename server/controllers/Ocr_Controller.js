import ocr from "../models/Ocr_model.js";
import jwt from "jsonwebtoken";

export const addocr = async (req, res) => {
  const {
    token_No,
    ID_Number,
    Name,
    Address,
    dob,
    Issue_Date,
    Expiry_Date,
    Blood_Group,
  } = req.body;
  try {
    // Check if the donor already exists
    const existingDonor = await ocr.findOne({ ID_Number });

    // If donor exists, send error response
    if (existingDonor) {
      return res.status(400).json({ error: "ID already exists" });
    }

    // Create a new donor instance with hashed password
    const newDonor = new ocr({
      token_No,
      ID_Number,
      Name,
      Address,
      dob,
      Issue_Date,
      Expiry_Date,
      Blood_Group,
    });

    // Save the donor to the database
    await newDonor.save();

    // Send success response with token
    res.status(200).json({});
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ error: "Registration failed. Please try again later." });
  }
};

export const getocrs = async (req, res) => {
  try {
    const ocr_ = await ocr.find();
    res.status(200).json(ocr_);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getocr = async (req, res) => {
  try {
    const { id } = req.params;
    const _ocr = await ocr.findById(id);
    res.status(200).json(_ocr);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

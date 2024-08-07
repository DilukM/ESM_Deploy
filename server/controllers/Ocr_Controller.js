import ocr from "../models/Ocr_model.js";
import jwt from "jsonwebtoken";

export const addocr = async (req, res) => {
  const { token_No,ID_Number, Name, Address, dob,Issue_Date ,Expiry_Date} = req.body;
  try {
    // Check if the donor already exists
    const existingDonor = await ocr.findOne({ ID_Number });

   
    // If donor exists, send error response
    if (existingDonor) {
      return res.status(400).json({ error: "Donor already exists" });
    }

    // Create a new donor instance with hashed password
    const newDonor = new ocr({
      token_No,ID_Number, Name, Address, dob,Issue_Date ,Expiry_Date
    });

    // Save the donor to the database
    await newDonor.save();

    // Generate JWT token
    const token = jwt.sign(
      { Id: newDonor.ID_Number},
      "6474b13e42fd0f0c680c18ab4afa9fbca5e6e9584d98b3bc68617f0b5c8f4249",
      {
        expiresIn: "1h",
      }
    );

    // Send success response with token
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error registering donor:", error);
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


// export const deleteDonors = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedDonor = await Donors.findByIdAndDelete(id);
//     if (!deletedDonor) {
//       return res.status(404).json({ error: "Donor not found" });
//     }
//     res.json({ message: "Donor deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting donor:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const updateDonors = async (req, res) => {
//   try {
//     const donorId = req.params.id;
//     const updatedDonorData = req.body; // Updated donor data from the request body

//     // Find the donor by ID in the database and update its information
//     const updatedDonor = await Donors.findByIdAndUpdate(
//       donorId,
//       updatedDonorData,
//       { new: true }
//     );

//     res.json(updatedDonor); // Send back the updated donor object
//   } catch (error) {
//     console.error("Error updating donor:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

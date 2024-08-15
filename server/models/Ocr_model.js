import mongoose from "mongoose";

const ocrSchema = new mongoose.Schema(
  {
    token_No: {
      type: Number,
      required: true,
      unique: true,
    },
    ID_Number: {
      type: String,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
      min: 5,
    },
    Address: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    Issue_Date: {
      type: String,
      default: null,
    },
    Expiry_Date: {
      type: String,
      default: null,
    },
    Blood_Group: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const ocr = mongoose.model("ocr", ocrSchema);
export default ocr;

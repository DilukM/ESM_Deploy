import express from "express";
import {
    addocr,
    getocrs,
    getocr,
} from "../controllers/Ocr_Controller.js";

const router = express.Router();

router.get("/gets", getocrs);
router.get("/get/:id", getocr);
router.post("/add", addocr);


export default router;

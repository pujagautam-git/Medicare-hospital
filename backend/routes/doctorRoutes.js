import express from "express";
import {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

import protectAdmin from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getDoctors);
router.get("/:id", getDoctor);
router.post("/", protectAdmin, upload.single("image"), createDoctor);
router.put("/:id", protectAdmin, upload.single("image"), updateDoctor);
router.delete("/:id", protectAdmin, deleteDoctor);

export default router;
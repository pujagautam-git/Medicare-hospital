import express from "express";
import {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";
import upload from "../middleware/uploadMiddleware.js";
import protectAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getDepartments);
router.get("/:id", getDepartment);

// Protected admin routes
router.post(
  "/",
  protectAdmin,
  upload.single("image"),
  createDepartment
);

router.put(
  "/:id",
  protectAdmin,
  upload.single("image"),
  updateDepartment
);
router.delete("/:id", protectAdmin, deleteDepartment);

export default router;
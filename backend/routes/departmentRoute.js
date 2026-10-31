import express from "express";
import {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

import protectAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getDepartments);
router.get("/:id", getDepartment);

// Protected admin routes
router.post("/", protectAdmin, createDepartment);
router.put("/:id", protectAdmin, updateDepartment);
router.delete("/:id", protectAdmin, deleteDepartment);

export default router;
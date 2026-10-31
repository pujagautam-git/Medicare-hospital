
import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
} from "../controllers/authcontroller.js";
import protectAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", protectAdmin, getAdminProfile);

export default router;

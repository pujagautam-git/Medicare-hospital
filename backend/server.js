
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protectAdmin from "./middleware/authMiddleware.js";
import departmentRoutes from "./routes/departmentRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MediCare Hospital API is running!",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);

// Protected test route
app.get("/api/admin/dashboard", protectAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the MediCare Admin Dashboard!",
    admin: req.admin,
  });
});

const PORT = process.env.PORT || 5005;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

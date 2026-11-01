import Doctor from "../models/Doctor.js";
import fs from "fs/promises";
import path from "path";

const deleteDoctorImage = async (imagePath) => {
  if (!imagePath || !imagePath.startsWith("/uploads/")) return;

  const filename = path.basename(imagePath);
  const filePath = path.join(process.cwd(), "uploads", filename);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Image deletion failed:", error.message);
    }
  }
};

// Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const doctors = await Doctor.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctors.",
    });
  }
};

// Get single doctor
export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor.",
    });
  }
};

// Create doctor
export const createDoctor = async (req, res) => {
  try {
    const { name, slug, specialization, qualification, experience, description, status } =
      req.body;

    const doctor = await Doctor.create({
      name,
      slug,
      specialization,
      qualification,
      experience,
      description,
      status,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully.",
      doctor,
    });
  } catch (error) {
    if (req.file) await deleteDoctorImage(`/uploads/${req.file.filename}`);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A doctor with this slug already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create doctor.",
    });
  }
};

// Update doctor
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const oldImage = doctor.image;

    Object.assign(doctor, req.body);

    if (req.file) {
      doctor.image = `/uploads/${req.file.filename}`;
    }

    const shouldRemoveImage = req.body.removeImage === "true";

    if (!req.file && shouldRemoveImage) {
      doctor.image = "";
    }

    await doctor.save();

    if ((req.file || shouldRemoveImage) && oldImage) {
      await deleteDoctorImage(oldImage);
    }

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully.",
      doctor,
    });
  } catch (error) {
    if (req.file) await deleteDoctorImage(`/uploads/${req.file.filename}`);

    res.status(500).json({
      success: false,
      message: "Failed to update doctor.",
    });
  }
};

// Delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const imagePath = doctor.image;

    await Doctor.findByIdAndDelete(req.params.id);

    if (imagePath) {
      await deleteDoctorImage(imagePath);
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete doctor.",
    });
  }
};
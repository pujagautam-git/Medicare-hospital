import Department from "../models/Department.js";
import fs from "fs/promises";
import path from "path";

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const departments = await Department.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: departments.length,
      departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get single department
export const getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Create department
export const createDepartment = async (req, res) => {
  try {
    const { name, slug, description, icon, status } = req.body;

    const department = await Department.create({
      name,
      slug,
      description,
      icon,
      status,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    return res.status(201).json({
      success: true,
      message: "Department created successfully.",
      department,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A department with this slug already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update department
export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    const oldImage = department.image;

    Object.assign(department, req.body);

    const shouldRemoveImage = req.body.removeImage === "true";

if (req.file) {
  department.image = `/uploads/${req.file.filename}`;
} else if (shouldRemoveImage) {
  department.image = "";
}

    await department.save();

    // Delete old image only after the new department data is saved.
   if ((req.file || shouldRemoveImage) && oldImage) {
  await deleteDepartmentImage(oldImage);
}

    res.status(200).json({
      success: true,
      message: "Department updated successfully.",
      department,
    });
  } catch (error) {
    console.error("Update department error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update department.",
    });
  }
};

// Delete department
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    const imagePath = department.image;

    await Department.findByIdAndDelete(req.params.id);

    if (imagePath) {
      await deleteDepartmentImage(imagePath);
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully.",
    });
  } catch (error) {
    console.error("Delete department error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete department.",
    });
  }
};
const deleteDepartmentImage = async (imagePath) => {
  if (!imagePath || !imagePath.startsWith("/uploads/")) return;

  const filename = path.basename(imagePath);
  const filePath = path.join(process.cwd(), "uploads", filename);

  try {
    await fs.unlink(filePath);
    console.log("Old department image deleted:", filename);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Image deletion failed:", error.message);
    }
  }
};
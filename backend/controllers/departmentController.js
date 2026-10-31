import Department from "../models/Department.js";

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });

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
    const { name, slug, description, icon, image, status } = req.body;

    const department = await Department.create({
      name,
      slug,
      description,
      icon,
      image,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.code === 11000
        ? "This department slug already exists"
        : error.message,
    });
  }
};

// Update department
export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.code === 11000
        ? "This department slug already exists"
        : error.message,
    });
  }
};

// Delete department
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
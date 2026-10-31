import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Stethoscope,
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Eye,
  Activity,
  FlaskConical,
} from "lucide-react";
import api from "../../../services/api";
import "./adminDepartment.css";

const iconOptions = [
  "Stethoscope",
  "HeartPulse",
  "Brain",
  "Bone",
  "Baby",
  "Eye",
  "Activity",
  "FlaskConical",
];

const iconMap = {
  Stethoscope,
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Eye,
  Activity,
  FlaskConical,
};

const initialForm = {
  name: "",
  slug: "",
  description: "",
  icon: "Stethoscope",
  image: "",
  status: "active",
};

function AdminDepartments() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchadminDepartments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/departments");
      setDepartments(response.data.departments || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load departments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchadminDepartments();
  }, []);

  const openAddModal = () => {
    setFormData(initialForm);
    setEditingId(null);
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (department) => {
    setFormData({
      name: department.name || "",
      slug: department.slug || "",
      description: department.description || "",
      icon: department.icon || "Stethoscope",
      image: department.image || "",
      status: department.status || "active",
    });
    setEditingId(department._id);
    setError("");
    setModalOpen(true);
  };

  const handleNameChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: editingId
        ? prev.slug
        : value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      if (editingId) {
        await api.put(`/departments/${editingId}`, formData);
      } else {
        await api.post("/departments", formData);
      }

      setModalOpen(false);
      setFormData(initialForm);
      setEditingId(null);
      await fetchDepartments();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to save department."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/departments/${id}`);
      setDepartments((prev) =>
        prev.filter((department) => department._id !== id)
      );
    } catch (err) {
      window.alert(
        err.response?.data?.message || "Unable to delete department."
      );
    }
  };

  const toggleStatus = async (department) => {
    const newStatus =
      department.status === "active" ? "inactive" : "active";

    try {
      const response = await api.put(`/departments/${department._id}`, {
        status: newStatus,
      });

      setDepartments((prev) =>
        prev.map((item) =>
          item._id === department._id
            ? response.data.department
            : item
        )
      );
    } catch (err) {
      window.alert(
        err.response?.data?.message || "Unable to update status."
      );
    }
  };

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="departments-page">
      <div className="departments-heading">
        <div>
          <h2>Departments</h2>
          <p>Manage your hospital departments and their information.</p>
        </div>

        <button className="department-add-btn" onClick={openAddModal}>
          <Plus size={18} />
          Add Department
        </button>
      </div>

      <div className="departments-toolbar">
        <div className="department-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <span className="department-count">
          {departments.length} total departments
        </span>
      </div>

      {error && !modalOpen && (
        <p className="department-error">{error}</p>
      )}

      {loading ? (
        <div className="department-message">Loading departments...</div>
      ) : filteredDepartments.length === 0 ? (
        <div className="department-empty">
          <Stethoscope size={35} />
          <h3>No departments found</h3>
          <p>
            {search
              ? "Try another search term."
              : "Add your first hospital department to get started."}
          </p>
        </div>
      ) : (
        <div className="department-table-wrapper">
          <table className="department-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDepartments.map((department) => {
                const Icon = iconMap[department.icon] || Stethoscope;

                return (
                  <tr key={department._id}>
                    <td>
                      <div className="department-name-cell">
                        <div className="department-icon">
                          <Icon size={20} />
                        </div>
                        <div>
                          <strong>{department.name}</strong>
                          <span>{department.description}</span>
                        </div>
                      </div>
                    </td>

                    <td>{department.slug}</td>

                    <td>
                      <button
                        className={`department-status ${
                          department.status
                        }`}
                        onClick={() => toggleStatus(department)}
                        title="Click to change status"
                      >
                        {department.status}
                      </button>
                    </td>

                    <td>
                      {new Date(department.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <div className="department-actions">
                        <button
                          className="department-edit"
                          onClick={() => openEditModal(department)}
                          aria-label="Edit department"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          className="department-delete"
                          onClick={() => handleDelete(department._id)}
                          aria-label="Delete department"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div
          className="department-modal-overlay"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="department-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="department-modal-header">
              <div>
                <h3>{editingId ? "Edit Department" : "Add Department"}</h3>
                <p>Enter the department details below.</p>
              </div>

              <button
                className="department-modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="department-form-group">
                <label htmlFor="department-name">Department Name</label>
                <input
                  id="department-name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Cardiology"
                  required
                />
              </div>

              <div className="department-form-group">
                <label htmlFor="department-slug">Slug</label>
                <input
                  id="department-slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="e.g. cardiology"
                  required
                />
              </div>

              <div className="department-form-group">
                <label htmlFor="department-description">Description</label>
                <textarea
                  id="department-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Write a short department description..."
                  rows={4}
                  required
                />
              </div>

              <div className="department-form-row">
                <div className="department-form-group">
                  <label htmlFor="department-icon">Icon</label>
                  <select
                    id="department-icon"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="department-form-group">
                  <label htmlFor="department-status">Status</label>
                  <select
                    id="department-status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="department-form-group">
                <label htmlFor="department-image">Image URL (optional)</label>
                <input
                  id="department-image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="Enter an image URL"
                />
              </div>

              {error && <p className="department-error">{error}</p>}

              <div className="department-modal-actions">
                <button
                  type="button"
                  className="department-cancel-btn"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="department-save-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Department"
                    : "Save Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDepartments;
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Stethoscope,
  ImagePlus,
} from "lucide-react";

import api from "../../../services/api";
import AdminLayout from "../../components/AdminLayout";
import "./adminDoctor.css";

const initialForm = {
  name: "",
  slug: "",
  specialization: "",
  qualification: "",
  experience: "",
  description: "",
  status: "active",
};

function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const serverUrl = api.defaults.baseURL.replace(/\/api\/?$/, "");

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${serverUrl}${image}`;
  };

  // Fetch doctors
  const fetchAdminDoctors = async () => {
    try {
      setLoading(true);
      const response = await api.get("/doctors");
      setDoctors(response.data.doctors || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load doctors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminDoctors();
  }, []);

  // Open add modal
  const openAddModal = () => {
    setFormData(initialForm);
    setSelectedImage(null);
    setImagePreview("");
    setEditingId(null);
    setError("");
    setModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (doctor) => {
    setFormData({
      name: doctor.name || "",
      slug: doctor.slug || "",
      specialization: doctor.specialization || "",
      qualification: doctor.qualification || "",
      experience: doctor.experience || "",
      description: doctor.description || "",
      status: doctor.status || "active",
    });

    setSelectedImage(null);
    setImagePreview(getImageUrl(doctor.image));
    setEditingId(doctor._id);
    setError("");
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    setImagePreview("");
    setEditingId(null);
    setFormData(initialForm);
    setError("");
  };

  // Generate slug from doctor name
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

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Create or update doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (selectedImage) {
        data.append("image", selectedImage);
      }

      if (editingId) {
        await api.put(`/doctors/${editingId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await api.post("/doctors", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      closeModal();
      await fetchAdminDoctors();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to save doctor."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete doctor
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/doctors/${id}`);

      setDoctors((prev) => prev.filter((doctor) => doctor._id !== id));
    } catch (err) {
      window.alert(
        err.response?.data?.message || "Unable to delete doctor."
      );
    }
  };

  // Toggle doctor status
  const toggleStatus = async (doctor) => {
    const newStatus =
      doctor.status === "active" ? "inactive" : "active";

    try {
      const response = await api.put(`/doctors/${doctor._id}`, {
        status: newStatus,
      });

      setDoctors((prev) =>
        prev.map((item) =>
          item._id === doctor._id ? response.data.doctor : item
        )
      );
    } catch (err) {
      window.alert(
        err.response?.data?.message || "Unable to update status."
      );
    }
  };

  // Search doctors
  const filteredDoctors = doctors.filter((doctor) => {
    const searchValue = search.toLowerCase();

    return (
      doctor.name?.toLowerCase().includes(searchValue) ||
      doctor.specialization?.toLowerCase().includes(searchValue)
    );
  });

  return (
    <AdminLayout
      title="Doctors"
      subtitle="Manage your hospital doctors and their information."
    >
      <div className="doctors-page">
        <div className="doctors-heading">
          <div>
            <h2>Doctors</h2>
            <p>Manage your hospital doctors and their information.</p>
          </div>

          <button className="doctor-add-btn" onClick={openAddModal}>
            <Plus size={18} />
            Add Doctor
          </button>
        </div>

        <div className="doctors-toolbar">
          <div className="doctor-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search doctors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <span className="doctor-count">
            {doctors.length} total doctors
          </span>
        </div>

        {error && !modalOpen && (
          <p className="doctor-error">{error}</p>
        )}

        {loading ? (
          <div className="doctor-message">Loading doctors...</div>
        ) : filteredDoctors.length === 0 ? (
          <div className="doctor-empty">
            <Stethoscope size={35} />
            <h3>No doctors found</h3>
            <p>
              {search
                ? "Try another search term."
                : "Add your first doctor to get started."}
            </p>
          </div>
        ) : (
          <div className="doctor-table-wrapper">
            <table className="doctor-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>
                      <div className="doctor-name-cell">
                        {doctor.image ? (
                          <img
                            src={getImageUrl(doctor.image)}
                            alt={doctor.name}
                            className="doctor-thumbnail"
                          />
                        ) : (
                          <div className="doctor-icon">
                            <Stethoscope size={20} />
                          </div>
                        )}

                        <div>
                          <strong>{doctor.name}</strong>
                          <span>{doctor.qualification}</span>
                        </div>
                      </div>
                    </td>

                    <td>{doctor.specialization}</td>
                    <td>{doctor.experience}</td>

                    <td>
                      <button
                        className={`doctor-status ${doctor.status}`}
                        onClick={() => toggleStatus(doctor)}
                        title="Click to change status"
                      >
                        {doctor.status}
                      </button>
                    </td>

                    <td>
                      {new Date(doctor.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <div className="doctor-actions">
                        <button
                          className="doctor-edit"
                          onClick={() => openEditModal(doctor)}
                          aria-label="Edit doctor"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          className="doctor-delete"
                          onClick={() => handleDelete(doctor._id)}
                          aria-label="Delete doctor"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {modalOpen && (
          <div
            className="doctor-modal-overlay"
            onClick={closeModal}
          >
            <div
              className="doctor-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="doctor-modal-header">
                <div>
                  <h3>{editingId ? "Edit Doctor" : "Add Doctor"}</h3>
                  <p>Enter the doctor details below.</p>
                </div>

                <button
                  className="doctor-modal-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <X size={21} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="doctor-form-group">
                  <label htmlFor="doctor-name">Doctor Name</label>
                  <input
                    id="doctor-name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Dr. Anisha Sharma"
                    required
                  />
                </div>

                <div className="doctor-form-group">
                  <label htmlFor="doctor-slug">Slug</label>
                  <input
                    id="doctor-slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="e.g. dr-anisha-sharma"
                    required
                  />
                </div>

                <div className="doctor-form-row">
                  <div className="doctor-form-group">
                    <label htmlFor="doctor-specialization">
                      Specialization
                    </label>
                    <input
                      id="doctor-specialization"
                      value={formData.specialization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialization: e.target.value,
                        })
                      }
                      placeholder="e.g. Cardiologist"
                      required
                    />
                  </div>

                  <div className="doctor-form-group">
                    <label htmlFor="doctor-qualification">
                      Qualification
                    </label>
                    <input
                      id="doctor-qualification"
                      value={formData.qualification}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          qualification: e.target.value,
                        })
                      }
                      placeholder="e.g. MBBS, MD"
                      required
                    />
                  </div>
                </div>

                <div className="doctor-form-group">
                  <label htmlFor="doctor-experience">Experience</label>
                  <input
                    id="doctor-experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experience: e.target.value,
                      })
                    }
                    placeholder="e.g. 10 Years"
                    required
                  />
                </div>

                <div className="doctor-form-group">
                  <label htmlFor="doctor-description">Description</label>
                  <textarea
                    id="doctor-description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Write a short doctor profile..."
                    rows={4}
                    required
                  />
                </div>

                <div className="doctor-form-group">
                  <label htmlFor="doctor-status">Status</label>
                  <select
                    id="doctor-status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="doctor-form-group">
                  <label>Doctor Photo</label>

                  <label
                    htmlFor="doctor-image"
                    className="doctor-image-upload"
                  >
                    <ImagePlus size={24} />
                    <span>
                      {selectedImage
                        ? "Choose a different image"
                        : "Choose image from computer"}
                    </span>
                    <small>JPG, PNG or WEBP · Maximum 5 MB</small>
                  </label>

                  <input
                    id="doctor-image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    hidden
                  />

                  {imagePreview && (
                    <div className="doctor-image-preview">
                      <img src={imagePreview} alt="Doctor preview" />

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview("");
                        }}
                      >
                        <X size={16} />
                        Remove image
                      </button>
                    </div>
                  )}
                </div>

                {error && <p className="doctor-error">{error}</p>}

                <div className="doctor-modal-actions">
                  <button
                    type="button"
                    className="doctor-cancel-btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="doctor-save-btn"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                        ? "Update Doctor"
                        : "Save Doctor"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminDoctors;
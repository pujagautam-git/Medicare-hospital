
import { useEffect, useState } from "react";
import {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Eye,
  Stethoscope,
  Activity,
  Microscope,
  ArrowUpRight,
} from "lucide-react";

import api from "../../services/api";
import "./Department.css";

const iconMap = {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Eye,
  Stethoscope,
  Activity,
  Microscope,
};

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const serverUrl = api.defaults.baseURL.replace(/\/api\/?$/, "");

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${serverUrl}${image}`;
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/departments?status=active");
        setDepartments(response.data.departments || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
        setError("Unable to load departments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <section className="departments-section" id="departments">
      <div className="container">

        {/* Section Heading */}
        <div className="public-departments-heading" data-aos="fade-up">
          <span className="section-label">OUR SPECIALTIES</span>

          <h2>
            Explore Our Medical
            <span> Departments</span>
          </h2>

          <p>
            Our specialized departments bring together experienced
            professionals and modern medical facilities to provide
            quality healthcare for every patient.
          </p>
        </div>

        {/* Department Cards */}
        {loading ? (
          <p className="public-departments-message">
            Loading departments...
          </p>
        ) : error ? (
          <p className="public-departments-message">{error}</p>
        ) : departments.length === 0 ? (
          <p className="public-departments-message">
            No departments are currently available.
          </p>
        ) : (
          <div className="public-departments-grid">
            {departments.map((department, index) => {
              const Icon = iconMap[department.icon] || Stethoscope;

              return (
                <div
                  className="public-department-card"
                  key={department._id}
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 100}
                >
                  {department.image ? (
                    <img
                      src={getImageUrl(department.image)}
                      alt={department.name}
                      className="public-department-image"
                    />
                  ) : (
                    <div className="public-department-icon">
                      <Icon size={27} strokeWidth={1.8} />
                    </div>
                  )}

                  <h3>{department.name}</h3>

                  <p>{department.description}</p>

                  <a
                    href={`#${department.slug}`}
                    className="public-department-link"
                  >
                    Explore Department
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="public-departments-footer" data-aos="fade-up">
          <a href="#all-departments" className="public-departments-btn">
            View All Departments
            <ArrowUpRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}

export default Departments;

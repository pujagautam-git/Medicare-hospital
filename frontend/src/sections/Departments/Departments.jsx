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

import "./Department.css";

const departments = [
  {
    icon: HeartPulse,
    title: "Cardiology",
    description:
      "Comprehensive heart care, diagnosis and treatment for cardiovascular conditions.",
  },
  {
    icon: Brain,
    title: "Neurology",
    description:
      "Expert care for brain, spinal cord and nervous system disorders.",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description:
      "Specialized treatment for bones, joints, muscles and mobility problems.",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description:
      "Complete healthcare services focused on children's growth and wellbeing.",
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    description:
      "Advanced eye examinations, vision care and treatment for eye conditions.",
  },
  {
    icon: Stethoscope,
    title: "General Medicine",
    description:
      "Diagnosis, prevention and treatment of common medical conditions.",
  },
  {
    icon: Activity,
    title: "Gynecology",
    description:
      "Dedicated healthcare services for women's health and wellness.",
  },
  {
    icon: Microscope,
    title: "Laboratory",
    description:
      "Reliable diagnostic testing and laboratory services for better care.",
  },
];

function Departments() {
  return (
    <section className="departments-section" id="departments">
      <div className="container">
        {/* Section Heading */}
        <div className="departments-heading" data-aos="fade-up">
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
        <div className="departments-grid">
          {departments.map((department, index) => {
            const Icon = department.icon;

            return (
              <div
                className="department-card"
                key={department.title}
                data-aos="fade-up"
                data-aos-delay={(index % 4) * 100}
              >
                <div className="department-icon">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                <h3>{department.title}</h3>

                <p>{department.description}</p>

                <a
                  href={`#${department.title
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  className="department-link"
                >
                  Explore Department
                  <ArrowUpRight size={17} />
                </a>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="departments-footer" data-aos="fade-up">
          <a href="#all-departments" className="departments-btn">
            View All Departments
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Departments;
import {
  Award,
  Users,
  Stethoscope,
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import "./About.css";

const statistics = [
  {
    icon: <Award size={25} />,
    number: "15+",
    label: "Years of Experience",
  },
  {
    icon: <Users size={25} />,
    number: "25K+",
    label: "Happy Patients",
  },
  {
    icon: <Stethoscope size={25} />,
    number: "40+",
    label: "Expert Doctors",
  },
  {
    icon: <Building2 size={25} />,
    number: "15+",
    label: "Medical Departments",
  },
];

const benefits = [
  "Experienced and qualified medical professionals",
  "Advanced medical equipment and technology",
  "Patient-focused and compassionate care",
  "24/7 emergency and healthcare services",
];

function About() {
  return (
    <section className="about-section" id="about">
      {/* Statistics */}
      <div className="container">
        <div className="stats-grid">
          {statistics.map((item) => (
            <div className="stat-item" key={item.label}>
              <div className="stat-icon">{item.icon}</div>

              <div className="stat-content">
                <h3>{item.number}</h3>
                <p>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Hospital */}
      <div className="container">
        <div className="about-container">
          {/* About Image */}
          <div className="about-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=85"
              alt="Modern hospital building"
              className="about-image"
            />

            <div className="about-experience-card">
              <Award size={30} />
              <div>
                <strong>15+ Years</strong>
                <span>Of Healthcare Excellence</span>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="about-content">
            <span className="section-label">ABOUT OUR HOSPITAL</span>

            <h2>
              Dedicated to Your Health,
              <span> Committed to Your Care.</span>
            </h2>

            <p className="about-description">
              At MediCare Multispeciality Hospital, we believe everyone
              deserves access to quality healthcare. Our dedicated team
              combines medical expertise, modern technology, and
              compassionate care to support you at every stage of life.
            </p>

            <div className="about-benefits">
              {benefits.map((benefit) => (
                <div className="about-benefit" key={benefit}>
                  <CheckCircle2 size={19} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <a href="#services" className="about-btn">
              Learn More About Us
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

import {
  Ambulance,
  Bed,
  Microscope,
  HeartPulse,
  Pill,
  Stethoscope,
  ArrowUpRight,
} from "lucide-react";

import "./Facilities.css";

const facilities = [
  {
    id: 1,
    title: "Emergency & Trauma Care",
    description:
      "Round-the-clock emergency services with a dedicated medical team for immediate patient care.",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=85",
    icon: Ambulance,
    featured: true,
  },
  {
    id: 2,
    title: "Modern Operation Theatre",
    description:
      "Well-equipped operation theatres designed for safe and advanced surgical procedures.",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=900&q=85",
    icon: Stethoscope,
  },
  {
    id: 3,
    title: "Advanced Diagnostic Lab",
    description:
      "Modern laboratory facilities for accurate and timely diagnostic testing.",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85",
    icon: Microscope,
  },
  {
    id: 4,
    title: "Comfortable Patient Rooms",
    description:
      "Clean, comfortable and peaceful rooms designed to support patient recovery.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=85",
    icon: Bed,
  },
  {
    id: 5,
    title: "Intensive Care Unit",
    description:
      "Specialized critical care facilities with continuous monitoring and medical support.",
    image:
      "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=900&q=85",
    icon: HeartPulse,
  },
  {
    id: 6,
    title: "24/7 Pharmacy",
    description:
      "Convenient access to essential medicines and pharmaceutical support.",
    image:
      "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=900&q=85",
    icon: Pill,
  },
];

function Facilities() {
  return (
    <section className="facilities-section" id="facilities">
      <div className="container">
        <div className="facilities-header" data-aos="fade-up">
          <div>
            <span className="section-label">OUR INFRASTRUCTURE</span>
            <h2>
              World-Class Facilities for
              <span> Better Healthcare</span>
            </h2>
            <p>
              We combine modern medical technology, advanced infrastructure,
              and compassionate care to create a better healthcare experience.
            </p>
          </div>

          <a href="#contact" className="facilities-view-link">
            Explore Our Hospital
            <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="facilities-grid">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;

            return (
              <article
                className={`facility-card ${
                  facility.featured ? "facility-featured" : ""
                }`}
                key={facility.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="facility-image">
                  <img src={facility.image} alt={facility.title} />

                  <div className="facility-icon">
                    <Icon size={22} />
                  </div>

                  <div className="facility-image-overlay" />
                </div>

                <div className="facility-content">
                  <h3>{facility.title}</h3>
                  <p>{facility.description}</p>

                  <a href="#contact" aria-label={`Learn more about ${facility.title}`}>
                    Learn More
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Facilities;

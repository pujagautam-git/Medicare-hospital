import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import "./Doctors.css";

const doctors = [
  {
    id: 1,
    name: "Dr. James Anderson",
    specialization: "Cardiologist",
    qualification: "MD, DM Cardiology",
    experience: "12+ Years Experience",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 2,
    name: "Dr. Sarah Mitchell",
    specialization: "Neurologist",
    qualification: "MD, DM Neurology",
    experience: "10+ Years Experience",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 3,
    name: "Dr. Michael Roberts",
    specialization: "Orthopedic Surgeon",
    qualification: "MS Orthopedics",
    experience: "15+ Years Experience",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 4,
    name: "Dr. Emily Carter",
    specialization: "Pediatrician",
    qualification: "MD Pediatrics",
    experience: "8+ Years Experience",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=85",
  },
];

function Doctors() {
  return (
    <section className="doctors-section" id="doctors">
      <div className="container">
        {/* Section Heading */}
        <div className="doctors-heading" data-aos="fade-up">
          <div className="doctors-heading-content">
            <span className="section-label">MEET OUR SPECIALISTS</span>

            <h2>
              Experienced Doctors,
              <span> Exceptional Care.</span>
            </h2>

            <p>
              Meet our dedicated team of medical professionals committed
              to providing personalized and compassionate healthcare.
            </p>
          </div>

          <a href="#all-doctors" className="doctors-view-all">
            View All Doctors
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* Doctor Cards */}
        <div className="doctors-grid">
          {doctors.map((doctor, index) => (
            <article
              className="doctor-card"
              key={doctor.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="doctor-image-wrapper">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="doctor-image"
                  loading="lazy"
                />

                <span className="doctor-availability">
                  Available for Appointment
                </span>
              </div>

              <div className="doctor-info">
                <span className="doctor-specialization">
                  {doctor.specialization}
                </span>

                <h3>{doctor.name}</h3>

                <p className="doctor-qualification">
                  {doctor.qualification}
                </p>

                <div className="doctor-experience">
                  <span>{doctor.experience}</span>
                </div>

                <a
                  href={`#appointment-${doctor.id}`}
                  className="doctor-appointment-btn"
                >
                  <CalendarDays size={16} />
                  Book Appointment
                  <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Doctors;
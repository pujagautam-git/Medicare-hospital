
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Phone,
  ShieldCheck,
} from "lucide-react";
import "./Appointment.css";

function Appointment() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    doctor: "",
    date: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend demo only. Backend integration will come later.
    setSubmitted(true);
    setFormData({
      name: "",
      phone: "",
      email: "",
      department: "",
      doctor: "",
      date: "",
      message: "",
    });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="appointment-section" id="appointment">
      <div className="container">
        <div className="appointment-wrapper">
          <div className="appointment-info" data-aos="fade-right">
            <span className="section-label">BOOK AN APPOINTMENT</span>

            <h2>
              Your Health Deserves
              <span> Timely Care.</span>
            </h2>

            <p className="appointment-description">
              Schedule an appointment with our experienced medical
              professionals. We are here to provide you with the care
              and attention you deserve.
            </p>

            <div className="appointment-benefits">
              <div className="appointment-benefit">
                <div className="benefit-icon">
                  <CalendarDays size={22} />
                </div>
                <div>
                  <h4>Easy Appointment</h4>
                  <p>Book your visit in just a few simple steps.</p>
                </div>
              </div>

              <div className="appointment-benefit">
                <div className="benefit-icon">
                  <Clock size={22} />
                </div>
                <div>
                  <h4>Flexible Scheduling</h4>
                  <p>Choose a date that works best for you.</p>
                </div>
              </div>

              <div className="appointment-benefit">
                <div className="benefit-icon">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4>Trusted Medical Care</h4>
                  <p>Get care from our qualified medical team.</p>
                </div>
              </div>
            </div>

            <div className="appointment-emergency">
              <div className="emergency-icon">
                <Phone size={23} />
              </div>
              <div>
                <span>Need Emergency Assistance?</span>
                <a href="tel:+9779800000000">+977 9800000000</a>
              </div>
            </div>
          </div>

          <div className="appointment-form-card" data-aos="fade-left">
            <div className="appointment-form-heading">
              <h3>Book Your Appointment</h3>
              <p>Fill in your details and we'll get in touch with you.</p>
            </div>

            {submitted && (
              <div className="appointment-success" role="status">
                Your demo request has been submitted successfully.
                Backend booking integration is coming later.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="appointment-form-grid">
                <div className="form-group">
                  <label htmlFor="patient-name">Full Name *</label>
                  <input
                    id="patient-name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="patient-phone">Phone Number *</label>
                  <input
                    id="patient-phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="patient-email">Email Address</label>
                  <input
                    id="patient-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appointment-date">Preferred Date *</label>
                  <input
                    id="appointment-date"
                    type="date"
                    name="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appointment-department">Department *</label>
                  <select
                    id="appointment-department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Laboratory">Laboratory</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="appointment-doctor">Preferred Doctor</label>
                  <select
                    id="appointment-doctor"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                  >
                    <option value="">Select Doctor</option>
                    <option value="Dr. James Anderson">Dr. James Anderson</option>
                    <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell</option>
                    <option value="Dr. Michael Roberts">Dr. Michael Roberts</option>
                    <option value="Dr. Emily Carter">Dr. Emily Carter</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="appointment-message">
                    Message (Optional)
                  </label>
                  <textarea
                    id="appointment-message"
                    name="message"
                    rows="3"
                    placeholder="Tell us briefly about your concern..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="appointment-submit-btn">
                Book Appointment
                <ArrowRight size={18} />
              </button>

              <p className="appointment-note">
                Our team will contact you to confirm your appointment.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Appointment;

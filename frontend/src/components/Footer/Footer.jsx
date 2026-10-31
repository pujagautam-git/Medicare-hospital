
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const quickLinks = [
  { label: "Home", link: "#home" },
  { label: "About Us", link: "#about" },
  { label: "Our Doctors", link: "#doctors" },
  { label: "Departments", link: "#departments" },
  { label: "Facilities", link: "#facilities" },
  { label: "Health Articles", link: "#blog" },
  { label: "Contact Us", link: "#contact" },
];

const departments = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Ophthalmology",
  "General Medicine",
];

function Footer() {
  return (
    <footer className="footer-section" id="contact">
      <div className="container">
        <div className="footer-main">
          {/* Hospital Information */}
          <div className="footer-about">
            <a href="#home" className="footer-logo">
              <span className="footer-logo-icon">M+</span>
              <span className="footer-logo-text">
                <strong>MediCare</strong>
                <small>Multispeciality Hospital</small>
              </span>
            </a>

            <p>
              Dedicated to providing quality healthcare with compassion,
              advanced medical technology, and a commitment to your
              family's wellbeing.
            </p>

            <div className="footer-socials">
              <a href="https://facebook.com" aria-label="Facebook">
                <FaFacebookF size={18} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
              {/* <a href="https://linkedin.com" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.link}>
                    <ArrowRight size={14} />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div className="footer-links">
            <h3>Our Departments</h3>
            <ul>
              {departments.map((department) => (
                <li key={department}>
                  <a href="#departments">
                    <ArrowRight size={14} />
                    {department}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-contact">
            <h3>Get In Touch</h3>

            <div className="footer-contact-item">
              <MapPin size={19} />
              <span>Biratnagar, Nepal</span>
            </div>

            <div className="footer-contact-item">
              <Phone size={19} />
              <a href="tel:+9779800000000">+977 9800000000</a>
            </div>

            <div className="footer-contact-item">
              <Mail size={19} />
              <a href="mailto:info@medicarehospital.com">
                info@medicarehospital.com
              </a>
            </div>

            <div className="footer-contact-item">
              <Clock size={19} />
              <span>Open 24 Hours, 7 Days a Week</span>
            </div>

            <a href="#appointment" className="footer-appointment-btn">
              Book an Appointment
              <ArrowRight size={17} />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} MediCare Multispeciality Hospital.
            All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

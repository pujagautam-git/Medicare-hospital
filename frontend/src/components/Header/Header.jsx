import { useState } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  Clock,
  MapPin
} from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "./Header.css";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Departments", href: "#departments" },
  { name: "Doctors", href: "#doctors" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      {/* Top Information Bar */}
      <div className="topbar">
        <div className="container topbar-content">
          <div className="topbar-left">
            <span>
              <Phone size={14} />
              +977 9800000000
            </span>

            <span>
              <Mail size={14} />
              info@medicarehospital.com
            </span>

            <span>
              <Clock size={14} />
              Open 24/7
            </span>
          </div>

          <div className="topbar-right">
            <span>
              <MapPin size={14} />
              Kathmandu, Nepal
            </span>

            <a href="#facebook" aria-label="Facebook">
              <FaFacebookF size={15} />
            </a>

            <a href="#instagram" aria-label="Instagram">
              <FaInstagram size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="navbar">
        <div className="container navbar-content">
          <a href="#home" className="brand" onClick={closeMenu}>
            <div className="brand-icon">M+</div>

            <div className="brand-text">
              <h2>MediCare</h2>
              <span>Multispeciality Hospital</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name}
              </a>
            ))}
          </nav>

          <a href="#appointment" className="appointment-btn">
            Book Appointment
          </a>

          {/* Mobile Menu Button */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${menuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
            >
              {link.name}
            </a>
          ))}

          <a
            href="#appointment"
            className="mobile-appointment-btn"
            onClick={closeMenu}
          >
            Book Appointment
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
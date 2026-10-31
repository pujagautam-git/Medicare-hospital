import { ArrowRight, CalendarDays, Clock, Phone } from "lucide-react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-container">
        {/* Hero Content */}
        <div className="hero-content">
          <span className="hero-label">
            <span className="hero-label-dot"></span>
            YOUR HEALTH, OUR PRIORITY
          </span>

          <h1>
            Your Health Is Our
            <span> Greatest Priority.</span>
          </h1>

          <p className="hero-description">
            Experience compassionate care, advanced medical technology,
            and expert healthcare professionals dedicated to keeping
            you and your family healthy.
          </p>

          <div className="hero-actions">
            <a href="#appointment" className="hero-primary-btn">
              Book Appointment
              <ArrowRight size={18} />
            </a>

            <a href="#services" className="hero-secondary-btn">
              Explore Services
            </a>
          </div>

          {/* Hero Highlights */}
          <div className="hero-highlights">
            <div className="hero-highlight">
              <div className="highlight-icon">
                <Clock size={19} />
              </div>
              <div>
                <strong>24/7</strong>
                <span>Emergency Care</span>
              </div>
            </div>

            <div className="hero-highlight">
              <div className="highlight-icon">
                <CalendarDays size={19} />
              </div>
              <div>
                <strong>Easy Booking</strong>
                <span>Online Appointments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hero-image-wrapper">
          <div className="hero-image-background"></div>

          <img
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1100&q=85"
            alt="Healthcare professional providing medical care"
            className="hero-image"
          />

          {/* Emergency Card */}
          <div className="hero-emergency-card">
            <div className="emergency-icon">
              <Phone size={20} />
            </div>

            <div>
              <span>Need Emergency Help?</span>
              <strong>Available 24/7</strong>
            </div>
          </div>

          <div className="hero-image-badge">
            <span className="badge-number">01</span>
            <span>Care that puts you first</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
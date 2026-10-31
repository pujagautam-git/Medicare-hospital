
import { useState } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Sophia Williams",
    role: "Patient",
    image: "https://i.pravatar.cc/120?img=47",
    rating: 5,
    review:
      "The doctors and nursing staff were extremely caring and professional. They made me feel comfortable throughout my treatment. I truly appreciate the excellent care I received.",
  },
  {
    id: 2,
    name: "Daniel Smith",
    role: "Patient",
    image: "https://i.pravatar.cc/120?img=12",
    rating: 5,
    review:
      "From registration to consultation, everything was well organized. The medical team explained everything clearly and made the entire experience stress-free.",
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Patient",
    image: "https://i.pravatar.cc/120?img=44",
    rating: 5,
    review:
      "A clean and welcoming hospital with wonderful staff. I was impressed by the facilities and the attention given to every detail of patient care.",
  },
  {
    id: 4,
    name: "James Anderson",
    role: "Patient",
    image: "https://i.pravatar.cc/120?img=60",
    rating: 5,
    review:
      "The doctors were attentive and took the time to answer all my questions. The overall experience was positive, and I felt well cared for.",
  },
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleTestimonials = [
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % testimonials.length],
    testimonials[(activeIndex + 2) % testimonials.length],
  ];

  const handlePrevious = () => {
    setActiveIndex((prev) =>
      (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="testimonials-header" data-aos="fade-up">
          <div>
            <span className="section-label">PATIENT TESTIMONIALS</span>
            <h2>
              What Our Patients
              <span> Say About Us</span>
            </h2>
            <p>
              Your trust and satisfaction inspire us to deliver better
              healthcare every day.
            </p>
          </div>

          <div className="testimonial-controls">
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonials"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="testimonials-grid">
          {visibleTestimonials.map((testimonial, index) => (
            <article
              className="testimonial-card"
              key={testimonial.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="testimonial-card-top">
                <div className="testimonial-stars" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <Quote size={32} className="testimonial-quote-icon" />
              </div>

              <p className="testimonial-review">
                "{testimonial.review}"
              </p>

              <div className="testimonial-author">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  loading="lazy"
                />
                <div>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="testimonial-bottom">
          <div className="testimonial-rating-summary">
            <div className="rating-stars">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
            <div>
              <strong>5.0/5</strong>
              <span>Patient satisfaction rating</span>
            </div>
          </div>

          <div className="testimonial-pagination">
            {testimonials.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={activeIndex === index ? "active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

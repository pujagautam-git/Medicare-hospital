
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  UserRound,
} from "lucide-react";

import "./Blog.css";

const articles = [
  {
    id: 1,
    category: "Heart Health",
    date: "October 20, 2026",
    author: "Medical Team",
    title: "Simple Habits That Can Help Keep Your Heart Healthy",
    description:
      "Discover everyday lifestyle changes, healthy eating habits, and physical activities that support better heart health.",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=85",
    featured: true,
  },
  {
    id: 2,
    category: "Healthy Lifestyle",
    date: "October 15, 2026",
    author: "Dr. Sarah Mitchell",
    title: "Why Regular Health Checkups Matter",
    description:
      "Regular health screenings can help identify potential health concerns early and support preventive care.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    category: "Women's Health",
    date: "October 10, 2026",
    author: "Medical Team",
    title: "Essential Health Tips Every Woman Should Know",
    description:
      "Learn about preventive screenings, nutrition, and healthy routines that support women's wellbeing.",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85",
  },
];

function Blog() {
  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <div className="blog-header" data-aos="fade-up">
          <div>
            <span className="section-label">HEALTH & WELLNESS</span>
            <h2>
              Latest Health Articles
              <span> & Insights</span>
            </h2>
            <p>
              Explore helpful health tips, expert advice, and the latest
              updates to make informed decisions about your wellbeing.
            </p>
          </div>

          <a href="#all-articles" className="blog-view-all">
            View All Articles
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="blog-grid">
          {articles.map((article, index) => (
            <article
              className="blog-card"
              key={article.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <a
                href={`/blog/${article.id}`}
                className="blog-image"
                aria-label={`Read ${article.title}`}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                />
                <span className="blog-category">{article.category}</span>
              </a>

              <div className="blog-content">
                <div className="blog-meta">
                  <span>
                    <CalendarDays size={14} />
                    {article.date}
                  </span>
                  <span>
                    <UserRound size={14} />
                    {article.author}
                  </span>
                </div>

                <h3>
                  <a href={`/blog/${article.id}`}>{article.title}</a>
                </h3>

                <p>{article.description}</p>

                <a href={`/blog/${article.id}`} className="blog-read-more">
                  Read Article
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="blog-bottom" data-aos="fade-up">
          <p>Stay informed. Stay healthy. Take care of yourself.</p>
          <a href="#all-articles">
            Explore More Health Articles
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Blog;

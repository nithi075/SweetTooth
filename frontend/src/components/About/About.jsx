import { Link } from "react-router-dom";
import Review from "../contact/review/review";
import "./About.css";

export default function AboutUs() {
  return (
    <section className="about-section">
      {/* ================= HERO ================= */}
      <div className="about-hero">
        <h1>About Sweet Tooth</h1>
        <p>Crafting Happiness, One Dessert at a Time 🍰✨</p>
      </div>

      {/* ================= STORY ================= */}
      <div className="about-container">
        <div className="about-image-box">
          <img
            src="/src/assets/banner.png"
            alt="Sweet Tooth Bakery"
            className="about-img"
          />
        </div>

        <div className="about-content">
          <h2>Our Story</h2>
          <p>
            Sweet Tooth began with a simple dream — to create desserts that not
            only taste amazing, but also spark joy in every celebration.
          </p>
          <p>
            Every cake, brownie, and pastry is made with love, premium
            ingredients, and a commitment to perfection.
          </p>
        </div>
      </div>

      {/* ================= MISSION ================= */}
      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          To make every celebration sweeter with handcrafted treats
          that bring people together.
        </p>

        <div className="mission-cards">
          <div className="mission-card">
            <img src="/src/assets/about1.jpg" alt="Fresh" />
            <h3>Fresh Ingredients</h3>
            <p>We bake fresh everyday using premium ingredients.</p>
          </div>

          <div className="mission-card">
            <img src="/src/assets/about2.jpg" alt="Love" />
            <h3>Baked With Love</h3>
            <p>Every dessert is handcrafted with care and passion.</p>
          </div>

          <div className="mission-card">
            <img src="/src/assets/about3.jpg" alt="Custom" />
            <h3>Custom Creations</h3>
            <p>We design cakes that match your story and celebration.</p>
          </div>
        </div>
        <div className="about-reviews">
        <Review />  

        <div className="view-all-reviews">
          <Link to="/reviews" className="view-reviews-btn">
            View All Reviews →
          </Link>
        </div>
            <div className="about-quote">
          <p>“Sweet moments begin with Sweet Tooth.”</p>
        </div>
      </div>

      

      </div>

      {/* ================= REVIEWS ================= */}
      
    </section>
  );
}

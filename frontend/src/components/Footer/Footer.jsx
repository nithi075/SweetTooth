import "./Footer.css";
import { FaInstagram, FaFacebookF, FaYoutube, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">

      {/* WAVE BACKGROUND */}
      <div className="footer-wave"></div>

      <div className="footer-container">

        {/* BRAND BLOCK */}
        <div className="footer-section brand">
          <img 
            src="/src/assets/SweetTooth_Logo.png" 
            alt="Logo" 
            className="footer-cupcake"
          />
          <h2 className="footer-logo">Sweet Tooth</h2>
          <p className="footer-text">
            Crafted with love, sprinkled with joy.  
            Bringing sweetness to your celebrations.
          </p>
        </div>

        {/* CONTACT + SOCIAL ROW */}
        <div className="footer-row">

          {/* CONTACT */}
          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <p className="footer-contact"><FaPhoneAlt /> +91 82200 91042</p>
            <p className="footer-contact"><FaMapMarkerAlt /> Trichy, Tamil Nadu</p>
          </div>

          {/* SOCIAL */}
          <div className="footer-section">
            <h3 className="footer-title">Follow Us</h3>
            <div className="footer-social">
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </div>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Sweet Tooth — Made With Love ❤️</p>
      </div>

    </footer>
  );
}

import { useState } from "react";
import "./Contact.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
} from "react-icons/fa";
import API from "../api.js";

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitMessage = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill required fields");
      return;
    }

    try {
      await API.post("/messages", form);
      alert("Message sent successfully 💗");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  return (
    <section className="contact-section">

      {/* HERO */}
      <div className="contact-hero">
        <h1>Let’s Create Something Sweet Together</h1>
        <p>Your celebrations deserve magical desserts. Tell us how we can help! 🎀</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="contact-container">

        {/* LEFT PANEL */}
        <div className="contact-info">
          <h2 className="contact-title">Reach Us</h2>

          <div className="info-item"><FaPhoneAlt /> +91 82200 91042</div>
          <div className="info-item"><FaEnvelope /> sweettoothtrichy@gmail.com</div>
          <div className="info-item"><FaMapMarkerAlt /> Trichy, Tamil Nadu</div>

          <h3 className="follow-title">Stay Connected</h3>

          <div className="insta-card">
            <img
              src="/src/assets/insta_profile.jpg"
              alt="Instagram Profile"
              className="insta-avatar"
            />

            <div className="insta-details">
              <h4>@sweet_tooth_trichy</h4>
              <p>Daily bakes, reels & behind-the-scenes 💗</p>
             <a
                href="https://www.instagram.com/sweet_tooth_trichy/"
                target="_blank"
                rel="noopener noreferrer"
                className="insta-follow-btn"
              >
                <FaInstagram /> Follow
              </a>
                  
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form className="contact-form" onSubmit={submitMessage}>
          <h2 className="form-title">Send Us a Message</h2>

          <div className="form-group">
            <label>Your Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>

            <div className="form-group half">
              <label>Subject</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
              >
                <option value="">Select one</option>
                <option>Custom Cake Order</option>
                <option>Event Enquiry</option>
                <option>Course Enquiry</option>
                <option>General Query</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Your Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us what you're looking for..."
              required
            />
          </div>

          <button className="submit-btn">Send Message</button>
        </form>
      </div>

      {/* MAP */}
      <div className="map-box">
        <h2 className="map-title">Our Location</h2>
        <p className="map-sub">Drop by to experience the sweetness in person 💗</p>

       <iframe
  title="map"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.796306171577!2d78.70467!3d10.79048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf53a53e9136d%3A0x2dfbeb9c6f2b249!2sTrichy%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1766599999999"
  width="100%"
  height="320"
  style={{ border: 0 }}
  allowFullScreen
></iframe>

      </div>

    </section>
  );
}

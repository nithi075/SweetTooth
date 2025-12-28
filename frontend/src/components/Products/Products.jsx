import { useEffect, useState } from "react";
import "./Products.css";
import { FiHeart } from "react-icons/fi";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function IndiaLoves() {
  const [cakes, setCakes] = useState([]);
  const [wishlist, setWishlist] = useState([]); // store productIds
  const navigate = useNavigate();

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    API.get("/products")
      .then((res) => setCakes(res.data))
      .catch((err) => console.error(err));
  }, []);

  /* ================= FETCH WISHLIST ================= */
  useEffect(() => {
    API.get("/wishlist")
      .then((res) => {
        const ids = res.data.map((item) => item.productId);
        setWishlist(ids);
      })
      .catch((err) => console.error(err));
  }, []);

  /* ================= TOGGLE WISHLIST ================= */
  const toggleWishlist = async (cake, e) => {
    e.stopPropagation();

    try {
      const res = await API.post("/wishlist", {
        productId: cake._id,
        title: cake.title,
        price: cake.price,
        img: cake.images?.[0],
        badge: cake.bestseller ? "Best Seller" : "",
      });

      const ids = res.data.map((item) => item.productId);
      setWishlist(ids);
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  };

  return (
    <section className="india-loves">
      <h1 className="il-title">Best Bakes</h1>
      <p className="il-sub">Our Cakes. Your Happy Moments.</p>

      {/* 🔥 HORIZONTAL SCROLL LIST */}
      <div className="il-grid">
        {cakes.slice(0, 8).map((cake) => (
          <div
            className="il-card"
            key={cake._id}
            onClick={() => navigate(`/cake/${cake._id}`)}
          >
            {/* IMAGE – ONLY FIRST IMAGE */}
            <div className="il-img-box">
              <img
                src={`http://localhost:5000${cake.images?.[0]}`}
                alt={cake.title}
                className="il-img"
                loading="lazy"
              />
            </div>

            {/* CONTENT */}
            <div className="il-content">
              <h3 className="il-name">{cake.title}</h3>

              <div className="price-heart-row">
                <p className="il-price">₹{cake.price}</p>

                <FiHeart
                  className={`heart ${
                    wishlist.includes(cake._id) ? "active" : ""
                  }`}
                  onClick={(e) => toggleWishlist(cake, e)}
                />
              </div>

              <div className="il-rating">
                <span className="star">★</span>
                <span>{cake.rating || 4.5}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 VIEW ALL */}
      <div className="view-all-wrap">
        <button
          className="view-all-btn"
          onClick={() => navigate("/treat")}
        >
          VIEW ALL
        </button>
      </div>
    </section>
  );
}

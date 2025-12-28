import { useEffect, useState } from "react";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./wishlist.css";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH WISHLIST
  ========================= */
  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/wishlist"
      );
      setWishlist(res.data);
    } catch (err) {
      console.error("Wishlist fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  /* =========================
     REMOVE FROM WISHLIST (TOGGLE)
  ========================= */
  const removeFromWishlist = async (cake) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/wishlist",
        {
          productId: cake.productId,
          title: cake.title,
          price: cake.price,
          img: cake.img,
          badge: cake.badge,
        }
      );
      setWishlist(res.data);
    } catch (err) {
      console.error("Remove wishlist error:", err);
    }
  };

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        Loading wishlist...
      </div>
    );
  }

  return (
    <section className="wishlist-section">
      <h2 className="wishlist-title">Your Wishlist ❤️</h2>

      {/* EMPTY STATE */}
      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-img">
            <svg width="120" height="120" viewBox="0 0 24 24">
              <path
                d="M12 21s-6.7-4.35-9.33-7.43C.5 11.3 1.4 7.5 4.6 6.4c1.9-.65 3.8.1 4.9 1.6 1.1-1.5 3-2.25 4.9-1.6 3.2 1.1 4.1 4.9 1.93 7.17C18.7 16.65 12 21 12 21z"
                fill="#ffe4ec"
                stroke="#ff4f88"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <p>No favourites yet</p>
          <span>Tap ❤️ on cakes to save them</span>
        </div>
      ) : (
        /* WISHLIST GRID – SAME AS TREATS */
        <div className="treats-grid wishlist-grid">
          {wishlist.map((cake) => (
            <div
              className="treat-card"
              key={cake._id}
              onClick={() => navigate(`/cake/${cake.productId}`)}
            >
              <div className="card-img-box">
                <img
                  src={`http://localhost:5000${cake.img}`}
                  className="treat-img"
                  alt={cake.title}
                />
                {cake.badge && (
                  <span className="badge">{cake.badge}</span>
                )}
              </div>

              <div className="card-content">
                <h3 className="cake-name">{cake.title}</h3>

                <div className="price-heart-row">
                  <p className="price">₹{cake.price}</p>

                  <FiHeart
                    className="heart-icon active"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(cake);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;

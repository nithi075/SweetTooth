import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SingleCake.css";
import { FiHeart } from "react-icons/fi";
import API from "../api";
import SingleCakeReview from "../SingleCakesReview/SIngleCakeReview";

export default function SingleCake() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cake, setCake] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [activeImg, setActiveImg] = useState("");
  const [wishlist, setWishlist] = useState(false);

  const [selectedKg, setSelectedKg] = useState("1");
  const [price, setPrice] = useState(0);

  const [message, setMessage] = useState("");
  const [adding, setAdding] = useState(false);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    API.get(`/products/${id}`).then((res) => {
      setCake(res.data);

      const firstImg = res.data.images?.[0] || "";
      setActiveImg(firstImg);

      if (res.data.priceByKg?.["1"]) {
        setPrice(res.data.priceByKg["1"]);
      }
    });

    API.get("/products").then((res) => {
      setAllProducts(res.data);
    });
  }, [id]);

  /* ================= CHECK WISHLIST ================= */
  useEffect(() => {
    API.get("/wishlist").then((res) => {
      const exists = res.data.find(
        (item) => item.productId === id
      );
      setWishlist(!!exists);
    });
  }, [id]);

  if (!cake) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  const related = allProducts.filter(
    (p) => p.category === cake.category && p._id !== cake._id
  );

  /* ================= KG CHANGE ================= */
  const handleKgChange = (kg) => {
    setSelectedKg(kg);
    setPrice(cake.priceByKg[kg]);
  };

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async (isBuyNow = false) => {
    try {
      setAdding(true);

      await API.post("/cart", {
        productId: cake._id,
        title: cake.title,
        price,
        qty: 1,
        kg: selectedKg,
        img: cake.images[0], // 🔥 Cloudinary URL
        message,
      });

      if (isBuyNow) navigate("/cart");
    } catch (err) {
      console.error("Add to cart failed", err);
    } finally {
      setAdding(false);
    }
  };

  /* ================= TOGGLE WISHLIST ================= */
  const toggleWishlist = async () => {
    try {
      const res = await API.post("/wishlist", {
        productId: cake._id,
        title: cake.title,
        price,
        img: cake.images?.[0], // 🔥 Cloudinary URL
        badge: cake.bestseller ? "Best Seller" : "",
      });

      const exists = res.data.find(
        (item) => item.productId === cake._id
      );
      setWishlist(!!exists);
    } catch (err) {
      console.error("Wishlist toggle error", err);
    }
  };

  return (
    <>
      {/* ================= PRODUCT DETAILS ================= */}
      <section className="cake-details-section">
        <div className="cake-details-container">

          {/* LEFT – IMAGE */}
          <div className="left-column">
            <div className="thumbnail-list">
              {cake.images.map((img, i) => (
                <img
                  key={i}
                  src={img} // 🔥 FIXED (Cloudinary)
                  className={`thumbnail ${
                    activeImg === img ? "active" : ""
                  }`}
                  onClick={() => setActiveImg(img)}
                  alt="thumbnail"
                />
              ))}
            </div>

            <div className="main-image-box">
              {cake.eggless && (
                <span className="eggless-badge">EGGLESS</span>
              )}

              {activeImg && (
                <img
                  src={activeImg} // 🔥 FIXED
                  className="main-image"
                  alt={cake.title}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-cake.jpg";
                  }}
                />
              )}
            </div>
          </div>

          {/* RIGHT – INFO */}
          <div className="right-column">
            <h1 className="cake-title">{cake.title}</h1>

            {/* KG SELECT */}
            <div className="kg-selector">
              {Object.keys(cake.priceByKg || {}).map((kg) => (
                <button
                  key={kg}
                  className={`kg-btn ${
                    selectedKg === kg ? "active" : ""
                  }`}
                  onClick={() => handleKgChange(kg)}
                >
                  {kg} Kg
                </button>
              ))}
            </div>

            <h2 className="cake-price">
              ₹{price} <span className="gst">(Inclusive of GST)</span>
            </h2>

            <p className="cake-description">
              Delicious freshly baked cake for your special moments 🎂
            </p>

            <h3 className="section-heading">Cake Message</h3>
            <textarea
              maxLength={25}
              className="cake-message-box"
              placeholder="Write a sweet wish!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              className="buy-btn"
              disabled={adding}
              onClick={() => handleAddToCart(true)}
            >
              {adding ? "ADDING..." : `BUY NOW | ₹${price}`}
            </button>

            <button
              className="add-cart-btn"
              disabled={adding}
              onClick={() => handleAddToCart(false)}
            >
              ADD TO CART
            </button>

            {/* ❤️ WISHLIST */}
            <FiHeart
              className={`wishlist-icon ${
                wishlist ? "active" : ""
              }`}
              onClick={toggleWishlist}
            />
          </div>
        </div>
      </section>

      {/* ================= YOU MAY ALSO LIKE ================= */}
      {related.length > 0 && (
        <section className="suggest-section">
          <div className="suggest-header">
            <h2>You May Also Like</h2>
          </div>

          <div className="suggest-grid">
            {related.slice(0, 4).map((item) => (
              <div
                key={item._id}
                className="suggest-card"
                onClick={() => navigate(`/cake/${item._id}`)}
              >
                <img
                  src={item.images[0]} // 🔥 FIXED
                  alt={item.title}
                />
                <h4>{item.title}</h4>
                <p>From ₹{item.priceByKg?.["1"]}</p>
              </div>
            ))}
          </div>

          <SingleCakeReview />
        </section>
      )}
    </>
  );
}

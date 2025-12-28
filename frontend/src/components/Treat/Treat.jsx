import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Treat.css";
import { FiHeart } from "react-icons/fi";
import API from "../api";

/* ================= BACKEND URL ================= */
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://sweettooth-backend.onrender.com";

export default function Treats() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* =========================
     STATES
  ========================= */
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Filters
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [onlyBestseller, setOnlyBestseller] = useState(false);
  const [sortBy, setSortBy] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  /* =========================
     FETCH PRODUCTS
  ========================= */
  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Products error:", err));
  }, []);

  /* =========================
     FETCH WISHLIST
  ========================= */
  useEffect(() => {
    API.get("/wishlist")
      .then((res) =>
        setWishlist(res.data.map((item) => item.productId))
      )
      .catch((err) => console.error("Wishlist error:", err));
  }, []);

  /* =========================
     APPLY CATEGORY FROM URL
  ========================= */
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) setCategory(urlCategory);
  }, [searchParams]);

  /* =========================
     RESET PAGE ON FILTER CHANGE
  ========================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [category, priceRange, onlyBestseller, sortBy]);

  /* =========================
     IMAGE URL HANDLER (🔥 FIX)
  ========================= */
  const getImageUrl = (cake) => {
    const img = cake.images?.[0];
    if (!img) return "/assets/placeholder.png";
    if (img.startsWith("http")) return img; // Cloudinary
    return `${BACKEND_URL}${img}`; // old local safety
  };

  /* =========================
     TOGGLE WISHLIST
  ========================= */
  const toggleWishlist = async (cake, e) => {
    e.stopPropagation();
    try {
      const res = await API.post("/wishlist", {
        productId: cake._id,
        title: cake.title,
        price: cake.priceByKg?.["1"],
        img: cake.images?.[0],
        badge: cake.bestseller ? "Best Seller" : "",
      });

      setWishlist(res.data.map((item) => item.productId));
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  /* =========================
     FILTER + SORT
  ========================= */
  const filteredProducts = products
    .filter((cake) => {
      if (category !== "all" && cake.category !== category) return false;

      const price = cake.priceByKg?.["1"] || 0;

      if (priceRange === "low" && price > 500) return false;
      if (priceRange === "mid" && (price < 500 || price > 1000)) return false;
      if (priceRange === "high" && price < 1000) return false;

      if (onlyBestseller && !cake.bestseller) return false;

      return true;
    })
    .sort((a, b) => {
      const priceA = a.priceByKg?.["1"] || 0;
      const priceB = b.priceByKg?.["1"] || 0;

      if (sortBy === "priceLow") return priceA - priceB;
      if (sortBy === "priceHigh") return priceB - priceA;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* =========================
     UI
  ========================= */
  return (
    <section className="treats-section">
      {/* FILTER BAR */}
      <div className="filter-bar">
        <button
          className={`filter-chip ${category === "all" ? "active" : ""}`}
          onClick={() => setCategory("all")}
        >
          All
        </button>

        <button
          className={`filter-chip ${category === "classic" ? "active" : ""}`}
          onClick={() => setCategory("classic")}
        >
          Classic
        </button>

        <button
          className={`filter-chip ${category === "gourmet" ? "active" : ""}`}
          onClick={() => setCategory("gourmet")}
        >
          Desserts
        </button>

        <button
          className={`filter-chip ${category === "designer" ? "active" : ""}`}
          onClick={() => setCategory("designer")}
        >
          Designer
        </button>

        <button
          className={`filter-chip ${priceRange === "low" ? "active" : ""}`}
          onClick={() => setPriceRange("low")}
        >
          Under ₹500
        </button>

        <button
          className={`filter-chip ${priceRange === "mid" ? "active" : ""}`}
          onClick={() => setPriceRange("mid")}
        >
          ₹500–₹1000
        </button>

        <button
          className={`filter-chip ${priceRange === "high" ? "active" : ""}`}
          onClick={() => setPriceRange("high")}
        >
          Above ₹1000
        </button>

        <button
          className={`filter-chip ${onlyBestseller ? "active" : ""}`}
          onClick={() => setOnlyBestseller(!onlyBestseller)}
        >
          Bestseller
        </button>

        {/* ADMIN */}
        <button
          className="filter-chip secret-chip"
          onClick={() => navigate("/add-cake")}
        >
          More
        </button>

        <select
          className="sort-btn"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {/* PRODUCTS GRID */}
      <div className="treats-grid">
        {paginatedProducts.map((cake) => (
          <div
            key={cake._id}
            className="treat-card"
            onClick={() => navigate(`/cake/${cake._id}`)}
          >
            <div className="card-img-box">
              <img
                src={getImageUrl(cake)}
                alt={cake.title}
                className="treat-img"
                loading="lazy"
                onError={(e) => (e.target.src = "/assets/placeholder.png")}
              />
              {cake.bestseller && (
                <span className="badge">Best Seller</span>
              )}
            </div>

            <div className="card-content">
              <h3 className="cake-name">{cake.title}</h3>
              <div className="price-heart-row">
                <p className="price">₹{cake.priceByKg?.["1"]}</p>
                <FiHeart
                  className={`heart-icon ${
                    wishlist.includes(cake._id) ? "active" : ""
                  }`}
                  onClick={(e) => toggleWishlist(cake, e)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

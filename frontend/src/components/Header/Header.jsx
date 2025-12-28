import "./Header.css";
import { FiShoppingCart, FiMenu, FiX, FiHeart } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();

  /* =====================
     FETCH COUNTS
  ===================== */
  const fetchCounts = async () => {
    try {
      const cartRes = await API.get("/cart");
      setCartCount(cartRes.data.length);

      // 🔥 wishlist backend later; temp dummy
      setWishlistCount(0);
    } catch (err) {
      console.error("Header count error", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="simple-header">

        {/* LOGO */}
        <NavLink to="/" className="logo-section">
          <img
            src="/src/assets/SweetTooth_Logo.png"
            alt="logo"
            className="header-logo"
          />

          <div className="logo-text">
            <h2>Sweet Tooth</h2>
            <span>Cakes & Desserts</span>
          </div>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="nav-menu">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/treat">Treats</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {/* ❤️ WISHLIST */}
          <div
            className="wishlist-icon-desktop"
            onClick={() => navigate("/wishlist")}
          >
            <FiHeart size={20} />
            {wishlistCount > 0 && (
              <span className="cart-badge">{wishlistCount}</span>
            )}
          </div>

          {/* 🛒 CART */}
          <div
            className="cart-icon-desktop"
            onClick={() => navigate("/cart")}
          >
            <FiShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </div>
        </nav>

        {/* MOBILE ICONS */}
        <div className="mobile-icons">
          {/* ❤️ WISHLIST */}
          <div
            className="mobile-wishlist"
            onClick={() => navigate("/wishlist")}
          >
            <FiHeart size={22} />
            {wishlistCount > 0 && (
              <span className="cart-badge">{wishlistCount}</span>
            )}
          </div>

          {/* 🛒 CART */}
          <div
            className="mobile-cart"
            onClick={() => navigate("/cart")}
          >
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </div>

          {/* ☰ MENU */}
          <FiMenu
            className="hamburger"
            onClick={() => setOpen(true)}
          />
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="mobile-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE NAV */}
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        <FiX className="mobile-close" onClick={() => setOpen(false)} />

        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/treat" onClick={() => setOpen(false)}>Treats</NavLink>
        <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
      </div>
    </>
  );
}

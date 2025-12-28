import { useEffect, useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import API from "../api";
import "./ReviewPage.css";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newReview, setNewReview] = useState({
    name: "",
    review: "",
    rating: 5,
  });

  /* 🔥 FETCH REVIEWS */
  useEffect(() => {
    API.get("/reviews")
      .then((res) => {
        setReviews(res.data || []);
        setIndex(0);
      })
      .catch((err) => {
        console.error("❌ Review fetch failed", err);
        setReviews([]);
      })
      .finally(() => setLoading(false));
  }, []);

  /* SAFE NAVIGATION */
  const next = () => {
    if (!reviews.length) return;
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    if (!reviews.length) return;
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  /* ⭐ SUBMIT REVIEW */
  const submitReview = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/reviews", newReview);

      setReviews((prev) => [...prev, res.data]);
      setIndex(reviews.length);
      setOpenForm(false);
      setNewReview({ name: "", review: "", rating: 5 });
    } catch (err) {
      console.error("❌ Review submit failed", err);
      alert("Failed to submit review");
    }
  };

  /* 🔄 LOADING STATE */
  if (loading) {
    return (
      <section className="review-section">
        <h2 style={{ textAlign: "center" }}>Loading reviews…</h2>
      </section>
    );
  }

  /* 🧁 EMPTY STATE */
  if (!reviews.length) {
    return (
      <section className="review-section">
        <h1 className="review-title">Customer Reviews 💕</h1>

        <p style={{ textAlign: "center", opacity: 0.7 }}>
          No reviews yet. Be the first one!
        </p>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            className="write-btn"
            onClick={() => setOpenForm(true)}
          >
            Write a Review ✍️
          </button>
        </div>

        {/* MODAL */}
        {openForm && (
          <div
            className="review-modal-overlay"
            onClick={() => setOpenForm(false)}
          >
            <div
              className="review-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Add Your Review 💗</h2>

              <form onSubmit={submitReview}>
                <input
                  placeholder="Your Name"
                  required
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      name: e.target.value,
                    })
                  }
                />

                <textarea
                  placeholder="Your Review"
                  required
                  value={newReview.review}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      review: e.target.value,
                    })
                  }
                />

                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      rating: Number(e.target.value),
                    })
                  }
                >
                  <option value={5}>⭐⭐⭐⭐⭐</option>
                  <option value={4}>⭐⭐⭐⭐</option>
                  <option value={3}>⭐⭐⭐</option>
                  <option value={2}>⭐⭐</option>
                  <option value={1}>⭐</option>
                </select>

                <button className="submit-review-btn">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    );
  }

  /* ✅ NORMAL STATE */
  return (
    <section className="review-section">
      <h1 className="review-title">What Our Customers Say 💕</h1>

      <button className="write-btn" onClick={() => setOpenForm(true)}>
        Write a Review ✍️
      </button>

      <div className="review-card">
        <button className="arrow left" onClick={prev}>
          <FaChevronLeft />
        </button>

        <div className="review-content fade-in">
          <h3 className="review-name">{reviews[index].name}</h3>

          <div className="rating-row">
            {[...Array(reviews[index].rating)].map((_, i) => (
              <FaStar key={i} className="star" />
            ))}
          </div>

          <p className="review-text">
            “{reviews[index].review}”
          </p>
        </div>

        <button className="arrow right" onClick={next}>
          <FaChevronRight />
        </button>
      </div>

      {/* ⭐ REVIEW MODAL */}
      {openForm && (
        <div
          className="review-modal-overlay"
          onClick={() => setOpenForm(false)}
        >
          <div
            className="review-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add Your Review 💗</h2>

            <form onSubmit={submitReview}>
              <input
                placeholder="Your Name"
                required
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    name: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Your Review"
                required
                value={newReview.review}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    review: e.target.value,
                  })
                }
              />

              <select
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    rating: Number(e.target.value),
                  })
                }
              >
                <option value={5}>⭐⭐⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
                <option value={2}>⭐⭐</option>
                <option value={1}>⭐</option>
              </select>

              <button className="submit-review-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

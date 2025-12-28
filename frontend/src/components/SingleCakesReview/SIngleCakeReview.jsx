import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleCakeReview.css";
import { FaStar, FaRegStar, FaCheckCircle } from "react-icons/fa";
import API from "../api";

export default function SingleCakeReview() {
  const { id: productId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    review: "",
    rating: 5,
  });

  /* FETCH PRODUCT REVIEWS */
  useEffect(() => {
    if (!productId) return;

    API.get(`/reviews/${productId}`)
      .then((res) => setReviews(res.data))
      .catch(console.error);
  }, [productId]);

  /* SUBMIT PRODUCT REVIEW */
  const submitReview = async (e) => {
    e.preventDefault();
    if (!productId) return;

    const res = await API.post(`/reviews/${productId}`, newReview);
    setReviews([res.data, ...reviews]);

    setNewReview({ name: "", review: "", rating: 5 });
  };

  const avgRating =
    reviews.reduce((a, b) => a + b.rating, 0) /
    (reviews.length || 1);

  return (
    <section className="cake-review-section">
      {/* SUMMARY */}
      <div className="review-summary">
        <h2>Customer Reviews</h2>
        <div className="big-rating">
          {avgRating.toFixed(1)}
        </div>

        <div className="stars">
          {[...Array(5)].map((_, i) =>
            i < Math.round(avgRating) ? (
              <FaStar key={i} className="star-icon" />
            ) : (
              <FaRegStar key={i} className="star-icon" />
            )
          )}
        </div>

        <p>Based on {reviews.length} reviews</p>
      </div>

      {/* REVIEW CARDS */}
      <div className="review-cards">
        {reviews.map((r) => (
          <div className="review-card" key={r._id}>
            <div className="review-content-box">
              <div className="rating-row">
                {[...Array(r.rating)].map((_, i) => (
                  <FaStar key={i} className="star-icon" />
                ))}
              </div>

              <p className="review-text">“{r.review}”</p>

              <div className="review-user-details">
                <h4>
                  {r.name}
                  <FaCheckCircle className="verified-icon" />
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WRITE REVIEW */}
      <div className="write-review-box">
        <h3>Write a Review</h3>

        <form onSubmit={submitReview}>
          <input
            placeholder="Your Name"
            required
            value={newReview.name}
            onChange={(e) =>
              setNewReview({ ...newReview, name: e.target.value })
            }
          />

          <textarea
            placeholder="Share your experience"
            required
            value={newReview.review}
            onChange={(e) =>
              setNewReview({
                ...newReview,
                review: e.target.value,
              })
            }
          />

          <div className="rating-select">
            {[1, 2, 3, 4, 5].map((n) =>
              n <= newReview.rating ? (
                <FaStar
                  key={n}
                  className="star-select filled"
                  onClick={() =>
                    setNewReview({
                      ...newReview,
                      rating: n,
                    })
                  }
                />
              ) : (
                <FaRegStar
                  key={n}
                  className="star-select"
                  onClick={() =>
                    setNewReview({
                      ...newReview,
                      rating: n,
                    })
                  }
                />
              )
            )}
          </div>

          <button className="submit-review-btn">
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
}

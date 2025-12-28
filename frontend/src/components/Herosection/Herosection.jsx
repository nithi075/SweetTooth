import "./Herosection.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  return (
    <section className="hero-slider">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 20000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        speed={600}
        className="hero-swiper"
      >
        {/* SLIDE 1 */}
        <SwiperSlide>
          <div className="hero-slide slide1">
            <div className="hero-center-text">
              <h1>Every Slice, A Love Story</h1>
              <h2 className="hero-sub">ANNIVERSARY CAKES</h2>
              <button className="hero-btn">ORDER NOW</button>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <div className="hero-slide slide2">
            <div className="hero-center-text">
              <h1>Fresh. Soft. Delicious.</h1>
              <h2 className="hero-sub">HOMEMADE CAKES</h2>
              <button className="hero-btn">ORDER NOW</button>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3 */}
        <SwiperSlide>
          <div className="hero-slide slide3">
            <div className="hero-center-text">
              <h1>Celebrate Every Moment</h1>
              <h2 className="hero-sub">CUSTOM CAKES</h2>
              <button className="hero-btn">ORDER NOW</button>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </section>
  );
}

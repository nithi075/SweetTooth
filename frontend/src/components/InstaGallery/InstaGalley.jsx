import { useState } from "react";
import { reelsData } from "../../data/reelsData";
import ReelModal from "../ReelModal/ReelModal";
import "./InstaGalley.css";

export default function InstaGallery() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <h1 className="insta-title">A Glimpse from our social world</h1>
      <button className="Follow-btn">Follow Us</button>
      <div className="gallery-grid">
        {reelsData.map((item, index) => (
          <img
            key={item.id}
            src={item.thumbnail}
            className="gallery-thumb"
            onClick={() => {
              setActiveIndex(index);
              setOpen(true);
            }}
          />
        ))}
      </div>

      {open && (
        <ReelModal
          reels={reelsData}
          index={activeIndex}
          close={() => setOpen(false)}
        />
      )}
    </>
  );
}

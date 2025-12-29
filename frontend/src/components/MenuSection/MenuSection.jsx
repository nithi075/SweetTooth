import "./MenuSection.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, title: "CLASSIC", value: "classic", img: "/images/menu/menu1.jpg" },
  { id: 2, title: "GOURMET", value: "gourmet", img: "/images/menu/menu2.jpg" },
  { id: 3, title: "DESIGNER", value: "designer", img: "/images/menu/menu3.jpg" },
  { id: 4, title: "DESSERTS", value: "desserts", img: "/images/menu/menu4.jpg" },
];

export default function MenuSection() {
  const navigate = useNavigate();

  return (
    <section className="menu-section">
      <h2 className="menu-title">Menu</h2>
      <p className="menu-sub">What will you wish for?</p>

      <div className="menu-grid">
        {categories.map((item) => (
          <div
            key={item.id}
            className="menu-card"
            onClick={() => navigate(`/treat?category=${item.value}`)}
          >
            <div className="menu-img-wrapper">
              <img src={item.img} alt={item.title} />
            </div>
            <h3 className="menu-name">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

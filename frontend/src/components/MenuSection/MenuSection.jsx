import "./MenuSection.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, title: "CAKE", value: "cake", img: "/images/menu/menu1.jpg" },
  { id: 2, title: "DESSERTS", value: "desserts", img: "/images/menu/menu2.jpg" },
  { id: 3, title: "DESIGNER", value: "designer", img: "/images/menu/menu3.jpg" },
  { id: 4, title: "BROWNIE", value: "brownie", img: "/images/menu/menu4.jpg" },
];

export default function MenuSection() {
  const navigate = useNavigate();

  return (
    <section className="menu-section">
      <h1 className="menu-title">Menu</h1>
      <p className="menu-sub">What will you wish for?</p>

      <div className="menu-grid">
        {categories.map((item) => (
          <div
            className="menu-card"
            key={item.id}
            onClick={() => navigate(`/treat?category=${item.value}`)}
          >
            <div className="stars">
              <span>★</span><span>★</span><span>★</span>
              <span>★</span><span>★</span>
            </div>

            <img src={item.img} alt={item.title} className="menu-img" />
            <h3 className="menu-name">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

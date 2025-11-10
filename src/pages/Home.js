import React, { useEffect } from "react";
import ProductList from "../components/product/ProductList";
import useFetch from "../hooks/useFetch";
import Loader from "../components/common/Loader";
import "../styles/home.scss";
import { Carousel, Typography, Button } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchProducts } from "../services/productService";

const { Title, Paragraph } = Typography;

const Home = () => {
  const { data: products, loading } = useFetch(fetchProducts, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="home-page gaming-theme" style={{ backgroundColor: "#0b1120", color: "#e2e8f0" }}>
      {/* === HERO SECTION === */}
      <section className="hero-section">
        <Carousel
          autoplay
          autoplaySpeed={4000}
          effect="fade"
          dots={false}
          className="hero-carousel"
        >
          <div className="hero-slide slide-1">
            <div className="overlay"></div>
            <div className="hero-content" data-aos="zoom-in">
              <Title level={1} style={{ color: "#00ff6a" }}>
                Hiệu năng đỉnh cao ⚡
              </Title>
              <Paragraph style={{ color: "#dbe4e2" }}>
                RAM, CPU — sức mạnh cho mọi chiến binh gaming.
              </Paragraph>
              <Button type="primary" size="large" href="/products" className="glow-btn">
                Xem linh kiện
              </Button>
            </div>
          </div>

          <div className="hero-slide slide-2">
            <div className="overlay"></div>
            <div className="hero-content" data-aos="fade-up">
              <Title level={1} style={{ color: "#00ff6a" }}>
                Build PC Gaming Mạnh Mẽ 💪
              </Title>
              <Paragraph style={{ color: "#dbe4e2" }}>
                Trải nghiệm tốc độ cực đỉnh — cấu hình dành riêng cho game thủ.
              </Paragraph>
              <Button type="primary" size="large" href="/products" className="glow-btn">
                Mua ngay
              </Button>
            </div>
          </div>

          <div className="hero-slide slide-3">
            <div className="overlay"></div>
            <div className="hero-content" data-aos="fade-up">
              <Title level={1} style={{ color: "#00ff6a" }}>
                Deal Sốc Linh Kiện 💥
              </Title>
              <Paragraph style={{ color: "#dbe4e2" }}>
                Giảm giá đến 50% cho CPU và màn hình gaming.
              </Paragraph>
              <Button type="primary" size="large" href="/products" className="glow-btn">
                Xem ưu đãi
              </Button>
            </div>
          </div>
        </Carousel>
      </section>

      {/* === FEATURED PRODUCTS === */}
      <section className="featured-section" data-aos="fade-up">
        <div className="container">
          <Title level={3} className="section-title" style={{ color: "#00ff6a", textAlign: "center" }}>
            🔥 Linh Kiện Nổi Bật
          </Title>
          <ProductList products={products.slice(0, 8)} />
        </div>
      </section>

      {/* === CTA === */}
      <section className="cta-section" data-aos="fade-up">
        <div className="cta-content">
          <Title level={3} style={{ color: "#00ff6a" }}>
            Tăng tốc sức mạnh Gaming của bạn 🎮
          </Title>
          <Paragraph style={{ color: "#dbe4e2", fontSize: "16px" }}>
            Từ RAM RGB, CPU hiệu năng cao đến màn hình 240Hz — tất cả đều có tại{" "}
            <b style={{ color: "#00ff6a" }}>LeoShop</b>.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            href="/products"
            style={{
              backgroundColor: "#00ff6a",
              border: "none",
              color: "#0e1116",
              fontWeight: 700,
              padding: "12px 32px",
              borderRadius: "10px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              boxShadow: "0 0 20px rgba(0, 255, 106, 0.5)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#00e65b";
              e.currentTarget.style.boxShadow =
                "0 0 30px #00ff6a, 0 0 60px rgba(0, 255, 106, 0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#00ff6a";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 106, 0.5)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Bắt đầu build PC
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;

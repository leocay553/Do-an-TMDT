import React, { useEffect } from "react";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import "../../styles/footer.scss";

const Footer = () => {
  useEffect(() => {
    const border = document.querySelector(".rgb-border");
    let hue = 0;
    const animate = () => {
      hue = (hue + 1) % 360;
      if (border) border.style.filter = `hue-rotate(${hue}deg)`;
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <footer className="footer-container">
    
      <div className="rgb-border"></div>

      <div className="footer-content">
        <h2 className="footer-title">
          LEO<span>SHOP</span>
        </h2>
        <p className="footer-desc">
          Linh kiện gaming chính hãng — Build PC theo phong cách của bạn ⚡
        </p>

       
        <div className="footer-social">
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FacebookOutlined />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <InstagramOutlined />
          </a>
          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <YoutubeOutlined />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <GithubOutlined />
          </a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} <span>LeoShop</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

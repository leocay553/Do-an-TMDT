
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Badge, Avatar, Dropdown, Drawer, Button } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  AppstoreOutlined,
  MenuOutlined,
  CloseOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import "../../styles/header.scss";

const { Header: AntHeader } = Layout;

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items || []);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Tính tổng số lượng sản phẩm trong giỏ
  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const userMenu = {
    items: [
      {
        key: "profile",
        label: <Link to="/profile">Trang cá nhân</Link>,
        icon: <UserOutlined style={{ color: "#00ff6a" }} />,
      },
      {
        key: "logout",
        label: "Đăng xuất",
        icon: <LogoutOutlined style={{ color: "#00ff6a" }} />,
      },
    ],
  };

  const menuItems = [
    {
      key: "home",
      label: <Link to="/">Trang chủ</Link>,
      icon: <HomeOutlined style={{ color: "#00ff6a" }} />,
    },
    {
      key: "products",
      label: <Link to="/products">Sản phẩm</Link>,
      icon: <AppstoreOutlined style={{ color: "#00ff6a" }} />,
    },
    {
      key: "orders",
      label: <Link to="/order-history">Lịch sử đơn hàng</Link>,
      icon: <HistoryOutlined style={{ color: "#00ff6a" }} />,
    },
  ];

  return (
    <AntHeader className="custom-header" style={{ backgroundColor: "#0a2f0a" }}>
      <div
        className="header-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="header-logo"
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            fontSize: 26,
            fontWeight: "bold",
            background:
              "linear-gradient(90deg, #00ff6a, #00ffff, #ff00ff, #00ff6a)",
            backgroundSize: "300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "rgbMove 5s linear infinite",
          }}
          title="Trang chủ"
        >
          LeoShop
        </div>

        <div className="desktop-menu">
          <Menu
            mode="horizontal"
            items={menuItems}
            className="header-menu"
            selectable={false}
            style={{
              backgroundColor: "transparent",
              color: "#00ff6a",
              borderBottom: "none",
            }}
          />
        </div>

        <div
          className="header-right"
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* Giỏ hàng */}
          <Link to="/cart" className="cart-icon" title="Giỏ hàng">
            <Badge count={totalQuantity} size="small" offset={[0, 3]}>
              <ShoppingCartOutlined
                style={{ fontSize: 22, color: "#00ff6a", marginRight: 16 }}
              />
            </Badge>
          </Link>

          <Dropdown menu={userMenu} placement="bottomRight" arrow>
            <Avatar
              icon={<UserOutlined />}
              className="header-avatar"
              size="small"
              style={{
                cursor: "pointer",
                backgroundColor: "#043318ff",
              }}
              title="Tài khoản"
            />
          </Dropdown>

          <Button
            className="mobile-menu-btn"
            type="text"
            icon={<MenuOutlined style={{ color: "#00ff6a" }} />}
            onClick={() => setDrawerOpen(true)}
            style={{ marginLeft: 16 }}
            aria-label="Mở menu"
          />
        </div>
      </div>

      <Drawer
        title="Danh mục"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={<CloseOutlined style={{ color: "#00ff6a" }} />}
        bodyStyle={{ padding: 0, backgroundColor: "#0a2f0a" }}
        headerStyle={{ backgroundColor: "#0a2f0a", color: "#00ff6a" }}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          selectable={false}
          onClick={() => setDrawerOpen(false)}
          style={{ backgroundColor: "#0a2f0a", color: "#00ff6a" }}
        />
      </Drawer>

      {/* Hiệu ứng RGB animation */}
      <style>
        {`
          @keyframes rgbMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </AntHeader>
  );
};

export default Header;

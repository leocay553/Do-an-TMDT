import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spin, message } from "antd";
import { DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { fetchProducts } from "../services/productService";
import { addToCart } from "../services/cartService";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = "userId 1"; 

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch {
        message.error("Lỗi khi tải sản phẩm!");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(userId, product);
      message.success("✅ Đã thêm vào giỏ hàng!");
    } catch (err) {
      console.error("Add to cart error:", err);
      message.error("❌ Thêm thất bại!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-green-400">
        <Spin tip="Đang tải sản phẩm..." />
      </div>
    );

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", padding: 40 }}>
      <Row gutter={[24, 24]}>
        {products.map((p) => (
          <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                background: "#1e293b",
                borderRadius: 12,
                color: "#22c55e",
                textAlign: "center",
                boxShadow: "0 0 10px #22c55e55",
              }}
              cover={
                <img
                  alt={p.name}
                  src={p.image_url}
                  style={{
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 12,
                    border: "1px solid #22c55e55",
                  }}
                />
              }
            >
              <h3 style={{ color: "#22c55e" }}>{p.name || p.description}</h3>
              <p
                style={{
                  color: "#a1a1aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontWeight: "bold",
                }}
              >
                <DollarOutlined style={{ color: "#22c55e" }} />
                {p.price.toLocaleString()}₫
              </p>
              <Button
                onClick={() => handleAddToCart(p)}
                style={{
                  backgroundColor: "#22c55e",
                  borderColor: "#22c55e",
                  color: "#0f172a",
                  fontWeight: "bold",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
                icon={<ShoppingCartOutlined />}
              >
                Thêm vào giỏ
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductPage;

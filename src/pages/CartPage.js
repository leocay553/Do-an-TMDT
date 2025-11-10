import React, { useEffect, useState } from "react";
import {
  Button,
  InputNumber,
  message,
  Spin,
  Typography,
  Empty,
  Layout,
  Row,
  Col,
} from "antd";
import {
  ShoppingCartOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; 
import {
  fetchCartItems,
  updateCartItemQty,
  removeCartItem,
  clearCartByUser,
} from "../services/cartService";

const { Title, Text } = Typography;
const { Content } = Layout;

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = "userId 1"; 
  const navigate = useNavigate();

  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await fetchCartItems(userId);
      setItems(data);
    } catch {
      message.error("Không thể tải giỏ hàng!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const onQtyChange = async (id, qty) => {
    if (qty < 1) return;
    try {
      await updateCartItemQty(id, qty);
      loadCart();
    } catch {
      message.error("Cập nhật thất bại!");
    }
  };

  const onRemove = async (id) => {
    try {
      await removeCartItem(id);
      message.success("Đã xóa sản phẩm!");
      loadCart();
    } catch {
      message.error("Lỗi khi xóa!");
    }
  };

  const onClear = async () => {
    try {
      await clearCartByUser(userId);
      message.success("Đã xóa toàn bộ giỏ hàng!");
      loadCart();
    } catch {
      message.error("Lỗi khi xóa toàn bộ!");
    }
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-green-400">
        <Spin tip="Đang tải giỏ hàng..." />
      </div>
    );

  if (items.length === 0)
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#22c55e",
          textAlign: "center",
        }}
      >
        <Empty
          description={
            <span style={{ color: "#22c55e", fontSize: 18 }}>
              <ShoppingCartOutlined /> Giỏ hàng trống
            </span>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
        <Button
          type="primary"
          onClick={() => navigate("/products")}
          style={{
            marginTop: 20,
            backgroundColor: "#22c55e",
            borderColor: "#22c55e",
            color: "#000",
            fontWeight: "bold",
            fontSize: 16,
            padding: "10px 24px",
            boxShadow: "0 0 15px #22c55eaa",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 25px #22c55eff")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 15px #22c55eaa")
          }
          icon={<ShoppingCartOutlined />}
        >
          Mua hàng ngay
        </Button>
      </div>
    );

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#001529", padding: 20 }}>
      <Content style={{ maxWidth: 900, margin: "auto", color: "#22c55e" }}>
        <Title
          level={2}
          style={{ color: "#22c55e", textAlign: "center", marginBottom: 30 }}
        >
          <ShoppingCartOutlined /> Giỏ hàng của bạn
        </Title>

        {items.map((item) => (
          <Row
            key={item.id}
            align="middle"
            style={{
              backgroundColor: "#0f172a",
              marginBottom: 16,
              borderRadius: 8,
              padding: 12,
              boxShadow: "0 0 10px #22c55e33",
            }}
          >
            <Col xs={6} sm={4} md={3}>
              <img
                src={item.image_url}
                alt={item.name}
                style={{
                  width: "100%",
                  borderRadius: 6,
                  objectFit: "cover",
                  border: "1px solid #22c55e55",
                }}
              />
            </Col>
            <Col
              xs={18}
              sm={20}
              md={21}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ flex: 1 }}>
                <Text strong style={{ fontSize: 16, color: "#22c55e" }}>
                  {item.name}
                </Text>
                <br />
                <Text style={{ color: "#a1a1aa" }}>
                  <DollarCircleOutlined /> {item.price.toLocaleString()}₫
                </Text>
              </div>

              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) => onQtyChange(item.id, value)}
                style={{ width: 90, marginRight: 20 }}
              />
              <Button danger onClick={() => onRemove(item.id)} icon={<DeleteOutlined />}>
                Xóa
              </Button>
            </Col>
          </Row>
        ))}

        <div
          style={{
            marginTop: 30,
            textAlign: "right",
            color: "#22c55e",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Tổng tiền: {total.toLocaleString()}₫
        </div>

        <div style={{ marginTop: 20, textAlign: "right" }}>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            style={{
              backgroundColor: "#22c55e",
              borderColor: "#22c55e",
              fontWeight: "bold",
              marginRight: 12,
            }}
            onClick={() => navigate("/checkout")}
          >
            Thanh toán
          </Button>
          <Button
            icon={<DeleteOutlined />}
            style={{ color: "#22c55e", borderColor: "#22c55e", fontWeight: "bold" }}
            onClick={onClear}
          >
            Xóa tất cả
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default CartPage;

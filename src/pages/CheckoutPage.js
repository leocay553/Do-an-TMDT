import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  Divider,
  message,
  Layout,
  Row,
  Col,
  Spin,
} from "antd";
import { CreditCardOutlined, ShoppingOutlined } from "@ant-design/icons";
import { fetchCartItems } from "../services/cartService";

const { Title, Text } = Typography;
const { Content } = Layout;

const CheckoutPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await fetchCartItems("userId 1"); 
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

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const onFinish = (values) => {
    if (items.length === 0) {
      message.warning("Giỏ hàng trống, không thể thanh toán.");
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer: values,
      items,
      total,
      date: new Date().toLocaleString(),
    };

    
    const savedOrders = localStorage.getItem("orderHistory");
    const orderHistory = savedOrders ? JSON.parse(savedOrders) : [];

    
    orderHistory.unshift(newOrder);

    
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

    message.success("Thanh toán thành công!");

    
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-green-400">
        <Spin tip="Đang tải đơn hàng..." />
      </div>
    );

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#001529", padding: 20 }}>
      <Content style={{ maxWidth: 900, margin: "auto", color: "#22c55e" }}>
        <Title
          level={2}
          style={{ textAlign: "center", marginBottom: 40, color: "#22c55e" }}
        >
          <CreditCardOutlined /> Thanh toán
        </Title>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          
          <div style={{ flex: 1, minWidth: 280 }}>
            <Form layout="vertical" onFinish={onFinish} autoComplete="off">
              <Form.Item
                name="name"
                label="Họ tên"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input
                  placeholder="Nhập họ tên"
                  style={{
                    backgroundColor: "#0f172a",
                    borderColor: "#22c55e",
                    color: "#22c55e",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input
                  placeholder="Nhập địa chỉ"
                  style={{
                    backgroundColor: "#0f172a",
                    borderColor: "#22c55e",
                    color: "#22c55e",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                  { pattern: /^\d+$/, message: "Số điện thoại chỉ gồm số" },
                ]}
              >
                <Input
                  placeholder="Nhập số điện thoại"
                  style={{
                    backgroundColor: "#0f172a",
                    borderColor: "#22c55e",
                    color: "#22c55e",
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#22c55e",
                    borderColor: "#22c55e",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                  size="large"
                  icon={<CreditCardOutlined />}
                >
                  Thanh toán{" "}
                  {total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Button>
              </Form.Item>
            </Form>
          </div>

          
          <div
            style={{
              width: 320,
              borderRadius: 6,
              padding: 16,
              backgroundColor: "#0f172a",
              height: "fit-content",
              boxShadow: "0 0 15px #22c55e44",
            }}
          >
            <Title level={4} style={{ color: "#22c55e" }}>
              <ShoppingOutlined /> Đơn hàng
            </Title>

            {items.length === 0 ? (
              <Text style={{ color: "#22c55e" }}>Giỏ hàng trống</Text>
            ) : (
              items.map((item) => (
                <Row
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 12,
                    color: "#22c55e",
                  }}
                >
                  <Col flex="auto">
                    <Text style={{ color: "#22c55e" }}>
                      {item.name} x{item.quantity}
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ color: "#22c55e" }}>
                      {(item.price * item.quantity).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                  </Col>
                </Row>
              ))
            )}

            <Divider style={{ borderColor: "#22c55e" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: 16,
                color: "#22c55e",
              }}
            >
              <Text>Tổng cộng</Text>
              <Text>
                {total.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CheckoutPage;

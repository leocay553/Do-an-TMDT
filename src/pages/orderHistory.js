import React, { useEffect, useState } from "react";
import { Typography, List, Card, Divider } from "antd";
import { HistoryOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orderHistory");
    if (savedOrders) {
      setOrderHistory(JSON.parse(savedOrders));
    }
  }, []);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
        backgroundColor: "#001529",
        borderRadius: 10,
        boxShadow: "0 0 20px #22c55e77",
        color: "#22c55e",
      }}
    >
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: 40, color: "#22c55e" }}
      >
        <HistoryOutlined /> Lịch sử đơn hàng
      </Title>

      {orderHistory.length === 0 ? (
        <Text
          style={{ color: "#22c55e", display: "block", textAlign: "center" }}
        >
          Chưa có đơn hàng nào.
        </Text>
      ) : (
        <List
          dataSource={orderHistory}
          renderItem={(order, index) => (
            <List.Item
              style={{
                backgroundColor: "#0f172a",
                marginBottom: 12,
                borderRadius: 8,
                boxShadow: "0 0 10px #22c55e44",
                color: "#22c55e",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              key={index}
            >
              <Card
                size="small"
                style={{
                  width: "100%",
                  backgroundColor: "#1e293b",
                  borderRadius: 8,
                  borderColor: "#22c55e44",
                }}
                bodyStyle={{ padding: "12px 16px" }}
              >
                <Text strong>Khách hàng: </Text>
                <Text>{order.customer.name}</Text>
                <br />
                <Text strong>Địa chỉ: </Text>
                <Text>{order.customer.address}</Text>
                <br />
                <Text strong>SĐT: </Text>
                <Text>{order.customer.phone}</Text>
                <Divider style={{ borderColor: "#22c55e" }} />
                <Text strong>Ngày đặt: </Text>
                <Text>{order.date}</Text>
                <Divider style={{ borderColor: "#22c55e" }} />
                <Text strong>Đơn hàng:</Text>
                <ul style={{ paddingLeft: 20 }}>
                  {order.items.map((item) => (
                    <li key={item.id} style={{ color: "#22c55e" }}>
                      {item.name} x{item.quantity} -{" "}
                      {(item.price * item.quantity).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </li>
                  ))}
                </ul>
                <Divider style={{ borderColor: "#22c55e" }} />
                <Text strong>Tổng tiền: </Text>
                <Text>
                  {order.total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default OrderHistory;

import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Register:", values);
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at center, #001b0f 0%, #000 100%)",
        color: "#00ff6a",
      }}
    >
      <Card
        bordered={false}
        style={{
          width: 420,
          background: "rgba(10, 25, 15, 0.95)",
          border: "1px solid rgba(0, 255, 106, 0.3)",
          boxShadow: "0 0 25px rgba(0, 255, 106, 0.3)",
          borderRadius: 16,
          color: "#00ff6a",
          padding: "24px 32px",
        }}
        title={
          <h2
            style={{
              textAlign: "center",
              color: "#00ff6a",
              marginBottom: 0,
              textShadow: "0 0 10px rgba(0,255,106,0.9)",
            }}
          >
            Đăng ký tài khoản LeoShop
          </h2>
        }
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label={<span style={{ color: "#c6ffdd" }}>Họ và tên</span>}
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input
              placeholder="Nhập họ và tên"
              style={{
                backgroundColor: "#0c1a12",
                border: "1px solid #00ff6a",
                color: "#fff",
                boxShadow: "0 0 10px rgba(0,255,106,0.3)",
              }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span style={{ color: "#c6ffdd" }}>Email</span>}
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input
              placeholder="Nhập email"
              style={{
                backgroundColor: "#0c1a12",
                border: "1px solid #00ff6a",
                color: "#fff",
                boxShadow: "0 0 10px rgba(0,255,106,0.3)",
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ color: "#c6ffdd" }}>Mật khẩu</span>}
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu"
              style={{
                backgroundColor: "#0c1a12",
                border: "1px solid #00ff6a",
                color: "#fff",
                boxShadow: "0 0 10px rgba(0,255,106,0.3)",
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{
                height: 45,
                fontWeight: 700,
                background:
                  "linear-gradient(90deg, #00ff6a, #00cc55, #00ff6a)",
                backgroundSize: "200% 200%",
                border: "none",
                color: "#000",
                boxShadow: "0 0 25px rgba(0,255,106,0.7)",
                animation: "glowMove 3s ease infinite",
                textTransform: "uppercase",
              }}
            >
              Đăng ký
            </Button>
          </Form.Item>

          <div
            style={{
              textAlign: "center",
              marginTop: 8,
              color: "#b7ffcc",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              style={{
                color: "#00ff6a",
                fontWeight: 600,
                textShadow: "0 0 10px rgba(0,255,106,0.8)",
              }}
            >
              Đăng nhập ngay
            </Link>
          </div>
        </Form>
      </Card>

      <style>
        {`
          @keyframes glowMove {
            0% { background-position: 0% 50%; box-shadow: 0 0 15px #00ff6a; }
            50% { background-position: 100% 50%; box-shadow: 0 0 30px #00ff6a; }
            100% { background-position: 0% 50%; box-shadow: 0 0 15px #00ff6a; }
          }
        `}
      </style>
    </div>
  );
};

export default RegisterPage;

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Tooltip,
  Tag,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DollarOutlined,
  InboxOutlined,
  TagsOutlined,
  PictureOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  editProduct,
  deleteProduct,
  fetchProducts,
} from "../redux/ProductSlice";
import "../styles/admin.scss";

const AdminProductManager = () => {

  const [enteredPassword, setEnteredPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

 
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();


  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchProducts());
    }
  }, [dispatch, isAuthorized]);

 
  const openModal = (product = null) => {
    setEditingProduct(product);
    if (product) form.setFieldsValue(product);
    else form.resetFields();
    setIsModalOpen(true);
  };

  
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        await dispatch(editProduct({ ...editingProduct, ...values }));
        message.success("🛠️ Cập nhật sản phẩm thành công!");
      } else {
        await dispatch(addProduct(values));
        message.success("✅ Thêm sản phẩm mới thành công!");
      }
      dispatch(fetchProducts());
      setIsModalOpen(false);
    } catch {
      message.error("❌ Có lỗi xảy ra khi lưu!");
    }
  };


  const handleDelete = async (id) => {
    Modal.confirm({
      title: "⚠️ Xóa sản phẩm này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      centered: true,
      onOk: async () => {
        await dispatch(deleteProduct(id));
        message.success("🗑️ Đã xóa sản phẩm!");
        dispatch(fetchProducts());
      },
    });
  };


  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image_url",
      render: (url) => (
        <img
          src={url}
          alt="product"
          style={{
            width: 70,
            height: 70,
            borderRadius: 8,
            border: "2px solid #00ffcc",
            boxShadow: "0 0 10px #00ffcc",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (text) => (
        <span style={{ color: "#fff", fontWeight: 500 }}>{text}</span>
      ),
    },
    {
      title: "Giá (VNĐ)",
      dataIndex: "price",
      render: (price) => (
        <Tag color="cyan" style={{ fontSize: 14, fontWeight: "bold" }}>
          {price?.toLocaleString()}₫
        </Tag>
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "stock_quantity",
      render: (num) => (
        <span style={{ color: num > 5 ? "#4ade80" : "#f87171" }}>{num}</span>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      render: (cat) => (
        <Tag color="magenta" style={{ textTransform: "uppercase" }}>
          {cat || "Khác"}
        </Tag>
      ),
    },
    {
      title: "Mật khẩu",
      dataIndex: "product_password",
      render: (pw) => (
        <span style={{ color: "#38bdf8", fontWeight: "bold" }}>
          {pw ? "••••••" : "Không có"}
        </span>
      ),
    },
    {
      title: "Hành động",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              onClick={() => openModal(record)}
              style={{
                background: "#00ffcc",
                border: "none",
                color: "#000",
                boxShadow: "0 0 10px #00ffcc",
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              style={{
                boxShadow: "0 0 10px #ff4d4f",
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];


  if (!isAuthorized) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "radial-gradient(circle at center, #0f172a, #000)",
          color: "#00ffcc",
        }}
      >
        <h2 style={{ textShadow: "0 0 10px #00ffcc", marginBottom: 20 }}>
          🔐 Nhập mật khẩu để truy cập Admin
        </h2>
        <Input.Password
          placeholder="Nhập mật khẩu..."
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
          style={{
            width: 260,
            backgroundColor: "#1e293b",
            color: "#fff",
            border: "1px solid #00ffcc",
            marginBottom: 20,
          }}
          onPressEnter={() => {
            if (enteredPassword === "leoshop123") {
              message.success("✅ Truy cập thành công!");
              setIsAuthorized(true);
            } else {
              message.error("❌ Sai mật khẩu!");
            }
          }}
        />
        <Button
          type="primary"
          icon={<LockOutlined />}
          onClick={() => {
            if (enteredPassword === "leoshop123") {
              message.success("✅ Truy cập thành công!");
              setIsAuthorized(true);
            } else {
              message.error("❌ Sai mật khẩu!");
            }
          }}
          style={{
            background: "linear-gradient(90deg,#00ffcc,#0099ff)",
            border: "none",
            boxShadow: "0 0 12px #00ffcc",
            fontWeight: "bold",
          }}
        >
          Xác nhận
        </Button>
      </div>
    );
  }


  return (
    <div
      style={{
        padding: 24,
        background: "radial-gradient(circle at center, #0f172a 0%, #000 100%)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h2
          style={{
            fontSize: 22,
            color: "#00ffcc",
            textShadow: "0 0 12px #00ffcc",
            fontWeight: "bold",
          }}
        >
          ⚡ Quản lý sản phẩm
        </h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
          style={{
            background: "linear-gradient(90deg,#00ffcc,#0099ff)",
            border: "none",
            boxShadow: "0 0 12px #00ffcc",
            fontWeight: "bold",
          }}
        >
          Thêm sản phẩm
        </Button>
      </div>

      
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        bordered
        style={{
          background: "rgba(15,23,42,0.8)",
          border: "1px solid #00ffcc",
          borderRadius: 10,
        }}
      />


      <Modal
        title={
          editingProduct ? (
            <>
              <EditOutlined /> Chỉnh sửa sản phẩm
            </>
          ) : (
            <>
              <PlusOutlined /> Thêm sản phẩm mới
            </>
          )
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText="Lưu"
        cancelText="Hủy"
        centered
        bodyStyle={{
          background: "#0f172a",
          color: "#fff",
        }}
        okButtonProps={{
          style: {
            background: "#00ffcc",
            border: "none",
            color: "#000",
            fontWeight: "bold",
            boxShadow: "0 0 8px #00ffcc",
          },
        }}
        cancelButtonProps={{
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "none",
          },
        }}
      >
        <Form
          layout="vertical"
          form={form}
          style={{
            color: "#fff",
          }}
          labelCol={{
            style: { color: "#00ffcc", fontWeight: "bold" },
          }}
        >
          <Form.Item
            name="description"
            label={
              <>
                <TagsOutlined /> Mô tả
              </>
            }
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input
              placeholder="VD: RAM Corsair RGB 16GB"
              style={{
                backgroundColor: "#1e293b",
                color: "#fff",
                border: "1px solid #00ffcc",
              }}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label={
              <>
                <DollarOutlined /> Giá (VNĐ)
              </>
            }
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <InputNumber
              placeholder="VD: 1500000"
              style={{
                width: "100%",
                backgroundColor: "#1e293b",
                color: "#fff",
                border: "1px solid #00ffcc",
              }}
            />
          </Form.Item>

          <Form.Item
            name="stock_quantity"
            label={
              <>
                <InboxOutlined /> Tồn kho
              </>
            }
          >
            <InputNumber
              placeholder="VD: 10"
              style={{
                width: "100%",
                backgroundColor: "#1e293b",
                color: "#fff",
                border: "1px solid #00ffcc",
              }}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label={
              <>
                <TagsOutlined /> Danh mục
              </>
            }
          >
            <Input
              placeholder="VD: RAM, CPU, GPU..."
              style={{
                backgroundColor: "#1e293b",
                color: "#fff",
                border: "1px solid #00ffcc",
              }}
            />
          </Form.Item>

        
         

          <Form.Item
            name="image_url"
            label={
              <>
                <PictureOutlined /> Link ảnh
              </>
            }
          >
            <Input
              placeholder="VD: https://..."
              style={{
                backgroundColor: "#1e293b",
                color: "#fff",
                border: "1px solid #00ffcc",
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProductManager;

import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Checkbox,
  Button,
  Typography,
  Spin,
  Empty,
  message,
  Modal,
} from "antd";
import { ShoppingCartOutlined, DollarOutlined, EyeOutlined } from "@ant-design/icons";
import { fetchProducts } from "../services/productService";
import PaginationBar from "../components/common/PaginationBar";
import { addToCart } from "../services/cartService";
import "../styles/productsPage.scss";

const { Title } = Typography;

const ramOptions = ["4GB", "8GB", "16GB", "32GB"];
const cpuOptions = [
  "Intel i3",
  "Intel i5",
  "Intel i7",
  "AMD Ryzen 5",
  "AMD Ryzen 7",
];
const screenOptions = ["13 inch", "20 inch", "24 inch", "17 inch"];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRam, setFilterRam] = useState([]);
  const [filterCpu, setFilterCpu] = useState([]);
  const [filterScreen, setFilterScreen] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const pageSize = 8;
  const userId = "userId 1";

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Load products failed", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchRam = filterRam.length === 0 || (product.description === "RAM" && filterRam.includes(product.category));
    const matchCpu = filterCpu.length === 0 || (product.description === "CPU" && filterCpu.includes(product.category));
    const matchScreen = filterScreen.length === 0 || (product.description === "Màn hình" && filterScreen.includes(product.category));

    filterScreen.length === 0 || filterScreen.includes(product.screen);
    return matchRam && matchCpu && matchScreen;
  });

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAddToCart = async (product) => {
    try {
      await addToCart(userId, product);
      message.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      message.error("Không thể thêm sản phẩm!");
      console.error(error);
    }
  };

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  
  const ramOptionsStyled = ramOptions.map((ram) => ({
    label: <span style={{ color: "#22c55e" }}>{ram}</span>,
    value: ram,
  }));
  const cpuOptionsStyled = cpuOptions.map((cpu) => ({
    label: <span style={{ color: "#22c55e" }}>{cpu}</span>,
    value: cpu,
  }));
  const screenOptionsStyled = screenOptions.map((screen) => ({
    label: <span style={{ color: "#22c55e" }}>{screen}</span>,
    value: screen,
  }));

  return (
    <div style={{ padding: 20, backgroundColor: "#0b1120", minHeight: "100vh" }}>
      <Title level={2} style={{ color: "#22c55e", textAlign: "center", marginBottom: 30 }}>
        Danh sách sản phẩm Gaming Gear
      </Title>

      <Row gutter={16}>
        
        <Col xs={24} sm={6}>
          <Card
            title={
              <Title level={4} style={{ color: "#22c55e", marginBottom: 0 }}>
                Bộ lọc
              </Title>
            }
            size="small"
            style={{
              backgroundColor: "#1a1a2e",
              borderColor: "#22c55e",
              borderWidth: 1,
            }}
            headStyle={{ borderBottomColor: "#22c55e" }}
          >
            <div style={{ marginBottom: 20 }}>
              <Title level={5} style={{ color: "#22c55e" }}>
                RAM
              </Title>
              <Checkbox.Group
                options={ramOptionsStyled}
                value={filterRam}
                onChange={setFilterRam}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <Title level={5} style={{ color: "#22c55e" }}>
                CPU
              </Title>
              <Checkbox.Group
                options={cpuOptionsStyled}
                value={filterCpu}
                onChange={setFilterCpu}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <Title level={5} style={{ color: "#22c55e" }}>
                Màn hình
              </Title>
              <Checkbox.Group
                options={screenOptionsStyled}
                value={filterScreen}
                onChange={setFilterScreen}
              />
            </div>

            <Button
              type="link"
              style={{ color: "#22c55e", paddingLeft: 0, fontWeight: 600 }}
              onClick={() => {
                setFilterRam([]);
                setFilterCpu([]);
                setFilterScreen([]);
              }}
            >
              Xóa bộ lọc
            </Button>
          </Card>
        </Col>

        
        <Col xs={24} sm={18}>
          {loading ? (
            <Spin tip="Đang tải sản phẩm..." />
          ) : paginatedProducts.length === 0 ? (
            <Empty description="Không có sản phẩm phù hợp" />
          ) : (
            <Row gutter={[16, 16]}>
              {paginatedProducts.map((product) => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <Card
                    hoverable
                    style={{
                      backgroundColor: "#1e293b",
                      color: "#e2e8f0",
                      borderColor: "#22c55e",
                      borderRadius: 12,
                    }}
                    cover={
                      <img
                        src={product.image_url}
                        alt={product.name}
                        style={{
                          width: "100%",
    height: 200,
    objectFit: "contain",
    backgroundColor: "#0f172a",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
                        }}
                      />
                    }
                    actions={[
                      <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetail(product)}
                        key="view"
                        style={{
                          backgroundColor: "#22c55e",
                          borderColor: "#22c55e",
                          color: "#0f172a",
                          fontWeight: 600,
                        }}
                      >
                        Xem chi tiết
                      </Button>,
                      <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleAddToCart(product)}
                        key="cart"
                        style={{
                          backgroundColor: "#22c55e",
                          borderColor: "#22c55e",
                          color: "#0f172a",
                          fontWeight: 600,
                        }}
                      >
                        Giỏ hàng
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <span style={{ color: "#22c55e", fontWeight: 600 }}>
                          {product.name || product.description}
                        </span>
                      }
                      description={
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            color: "#e2e8f0",
                          }}
                        >
                          <DollarOutlined style={{ color: "#22c55e" }} />
                          {product.price.toLocaleString()}₫
                        </span>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          <div style={{ marginTop: 30 }}>
            <PaginationBar
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </Col>
      </Row>

      {/* --- Modal chi tiết sản phẩm --- */}
      <Modal
        title={
          <span style={{ color: "#22c55e", fontWeight: 600 }}>
            {selectedProduct?.name || "Chi tiết sản phẩm"}
          </span>
        }
        open={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Đóng
          </Button>,
          <Button
            key="addCart"
            type="primary"
            style={{
              backgroundColor: "#22c55e",
              borderColor: "#22c55e",
              color: "#0f172a",
              fontWeight: 600,
            }}
            onClick={() => {
              handleAddToCart(selectedProduct);
              handleModalClose();
            }}
          >
            Thêm vào giỏ hàng
          </Button>,
        ]}
        bodyStyle={{ backgroundColor: "#0f172a", color: "#e2e8f0" }}
      >
        {selectedProduct && (
          <div>
            <img
              src={selectedProduct.image_url}
              alt={selectedProduct.name}
              style={{
                width: "100%",
                marginBottom: 16,
                borderRadius: 8,
              }}
            />
            <p>
              <strong style={{ color: "#22c55e" }}>CPU:</strong>{" "}
              {selectedProduct.cpu}
            </p>
            <p>
              <strong style={{ color: "#22c55e" }}>RAM:</strong>{" "}
              {selectedProduct.ram}
            </p>
            <p>
              <strong style={{ color: "#22c55e" }}>Màn hình:</strong>{" "}
              {selectedProduct.screen}
            </p>
            <p>
              <strong style={{ color: "#22c55e" }}>Giá:</strong>{" "}
              {selectedProduct.price.toLocaleString()}₫
            </p>
            <p>
              <strong style={{ color: "#22c55e" }}>Mô tả:</strong>{" "}
              {selectedProduct.description || "Không có mô tả"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductsPage;

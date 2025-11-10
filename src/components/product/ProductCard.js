import React from 'react';
import { Card, Button } from 'antd';           
import { Link } from 'react-router-dom';       
import { useDispatch } from 'react-redux';
import { addItem } from '../../contexts/CartContext';
import '../../styles/productCard.scss';

const { Meta } = Card;  

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  if (!product) return null;
  return (
    <Card
      hoverable
      cover={
        <Link to={`/products/${product.id}`}>
          <img alt={product.title} src={product.image_url || product.image} style={{ height: 200, objectFit: 'contain' }} />
        </Link>
      }
      style={{ borderRadius: 8 }}
    >
      <Meta title={product.title} description={`$${product.price}`} />
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button onClick={() => dispatch(addItem({ id: product.id, title: product.title, price: product.price, image: product.image_url || product.image }))}>
          Thêm vào giỏ
        </Button>
        <Link to={`/products/${product.id}`}>Xem chi tiết</Link>
      </div>
    </Card>
  );
};

export default ProductCard;


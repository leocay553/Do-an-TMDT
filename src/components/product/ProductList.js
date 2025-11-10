import React from 'react';
import ProductCard from './ProductCard';
import '../../styles/productList.scss';

const ProductList = ({ products = [] }) => {
  return (
    <div className="product-list" style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16}}>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
};

export default ProductList;

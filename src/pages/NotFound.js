import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{textAlign:'center', padding:40}}>
    <h2>404 - Không tìm thấy</h2>
    <Link to="/">Về trang chủ</Link>
  </div>
);

export default NotFound;

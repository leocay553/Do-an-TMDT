import React from 'react';
import { Spin } from 'antd';

const Loader = ({ size='default' }) => <div style={{textAlign:'center', padding: 20}}><Spin size={size} /></div>;

export default Loader;

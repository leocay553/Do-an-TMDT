import React from 'react';
import { Button as AntButton } from 'antd';

const Button = ({ type='primary', children, onClick, ...rest }) => {
  return (
    <AntButton type={type} onClick={onClick} {...rest}>
      {children}
    </AntButton>
  );
};

export default Button;

import { Modal } from 'antd';
import React from 'react';

export const confirmModal = (options) => {
  return Modal.confirm({
    ...options
  });
};

export default Modal;

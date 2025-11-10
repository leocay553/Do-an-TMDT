import { notification, message } from 'antd';

export const notifySuccess = (msg, desc) => notification.success({ message: msg, description: desc });
export const notifyError = (msg, desc) => notification.error({ message: msg, description: desc });
export const notifyInfo = (msg, desc) => notification.info({ message: msg, description: desc });
export const showMsg = (text) => message.info(text);

import React from 'react';
import { Input, InputNumber } from 'antd';

export const TextInput = (props) => <Input {...props} />;
export const NumberInput = (props) => <InputNumber style={{width: '100%'}} {...props} />;
export default TextInput;

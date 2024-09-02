
import React, { Input } from 'antd';
import { type SearchProps } from 'antd/es/input';
import { CloseOutlined } from '@ant-design/icons';

// Строка поиска с крестиком для очищения
function InputSearch({onCrossClick, ...otherProps}: Omit<SearchProps, 'suffix'> & { onCrossClick: () => void }) {
    return <Input.Search {...otherProps} suffix={<CloseOutlined onClick={onCrossClick} />} />
}
export default InputSearch
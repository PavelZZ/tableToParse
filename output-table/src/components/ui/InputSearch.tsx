
import React, { Input } from 'antd';
import { type SearchProps } from 'antd/es/input';
import { CloseOutlined } from '@ant-design/icons';

// Строка поиска с крестиком для очищения
function InputSearch(props: Omit<SearchProps, 'suffix'> & { onCrossClick: () => void }) {
    return <Input.Search {...props} suffix={<CloseOutlined onClick={props.onCrossClick} />} />
}
export default InputSearch
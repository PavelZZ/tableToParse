import React, { useState } from "react";
import { type TDataToParse, type DataIndex, TDataType } from "../../types";
import {
    Table, Flex, TableColumnType, TableColumnsType,
} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import AgeSlider from "./AgeSlider";
import InputSearch from "./InputSearch";
import Highlighter from "react-highlight-words"

interface ITableProps {
    data: TDataToParse['users']
}

/**
 * Общий конфиг колонок таблицы с фильтрацией
 * @param dataIndex - колонка таблицы
 * @param isHighLighted - подсвечивать ли совпадения в таблице (подсветка только при поиске по всем колонкам)
 * @param allSearchValue - строка поиска для подсветки
 * @returns {TableColumnType<TDataToParse['users'][number]>} - конфиг для фильтрации для каждой колонки таблицы
 */
const getColumnSearchProps = (dataIndex: DataIndex, isHighLighted: boolean, allSearchValue: string): TableColumnType<TDataToParse['users'][number]> => ({
    filterDropdown: ({ selectedKeys, setSelectedKeys, confirm }) => {
        const onSearch = (value?: number[]) => {
            if (dataIndex === 'age') {
                setSelectedKeys(value ? [value.join(',')] : [])
            }
            confirm()
        }
        return (
            dataIndex === 'age' ? (
                <AgeSlider onSearch={onSearch} />
            ) :
                <InputSearch placeholder={`Поиск по ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }}
                    onCrossClick={() => setSelectedKeys([])}
                    onSearch={() => onSearch()}
                    onPressEnter={() => onSearch()} />
        )
    },
    filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
        if (dataIndex === 'age') {
            const [from, to] = (value as string).split(',').map(Number)
            return (record[dataIndex] >= from) && (record[dataIndex] <= to)
        }
        return record[dataIndex].toString().toLowerCase().includes(
            (value as string).toLowerCase())
    },
    render: (text) => {
        return isHighLighted ?
            <Highlighter searchWords={[allSearchValue]} autoEscape textToHighlight={text.toString()} /> : text
    }
})

/**
 * Таблица пользователей
 * @param {{data}} - список пользователей
 */
function UserInfoTable({ data }: ITableProps) {
    const [allSearchValue, setAllSearchValue] = useState('')
    const [isHighLighted, setIsHighlighted] = useState(false)
    const [filteredData, setFilteredData] = useState(data);
    const handleSearch = (value: string) => {
        const filteredItems = data.filter((item) => {
            return Object.keys(item).some((key) =>
                String(item[key as keyof TDataType]).toLowerCase().includes(value.toLowerCase())
            );
        });
        setFilteredData(filteredItems)
        setIsHighlighted(Boolean(value))
        setAllSearchValue(value)
    };
    const tableColumns: TableColumnsType<TDataType> = [
        {
            title: 'id',
            width: '10%',
            showSorterTooltip: { target: 'full-header' },
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id,
            },
            sortDirections: ['descend', 'ascend'],
            key: 'id',
            ...getColumnSearchProps('id', isHighLighted, allSearchValue)
        },
        {
            title: 'Name',
            width: '20%',
            dataIndex: 'name',
            sorter: { compare: (a, b) => a.name.localeCompare(b.name), multiple: 1 },
            sortDirections: ['descend', 'ascend'],
            key: 'name',
            ...getColumnSearchProps('name', isHighLighted, allSearchValue)
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            sorter: { compare: (a, b) => a.gender.localeCompare(b.gender), multiple: 2 },
            sortDirections: ['descend', 'ascend'],
            filters: [
                { text: 'Male', value: 'Male' },
                { text: 'Female', value: 'Female' },
            ],
            onFilter: (value, record) => {
                return record['gender'] === value
            },
            render: (text) => {
                return isHighLighted ?
                    <Highlighter searchWords={[allSearchValue]} autoEscape textToHighlight={text.toString()} /> : text
            }
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: { compare: (a, b) => a.age - b.age, multiple: 3 },
            sortDirections: ['descend', 'ascend'],
            key: 'age',
            ...getColumnSearchProps('age', isHighLighted, allSearchValue)
        },
        {
            title: 'City',
            dataIndex: 'city',
            sorter: {
                compare: (a, b) => a.city.localeCompare(b.city),
                multiple: 4
            },
            sortDirections: ['descend', 'ascend'],
            key: 'city',
            ...getColumnSearchProps('city', isHighLighted, allSearchValue)
        },
    ]
    return (
        <Flex style={{ height: '100%' }} vertical justify="flex-end" gap={30}>
            <InputSearch
                placeholder="Поиск по всем колонкам"
                style={{ width: 400 }}
                value={allSearchValue}
                onCrossClick={() => setAllSearchValue('')}
                onChange={(e) => setAllSearchValue(e.target.value)}
                onSearch={handleSearch} />
            <Table dataSource={filteredData} columns={tableColumns} scroll={{ y: 600 }} />
        </Flex >
    )
}
export { UserInfoTable }
import React from "react";
import { type TDataToParse } from "../types";
import { Table, TableProps } from "antd";
interface ITableProps {
    data: TDataToParse['users']
}

const TABLE_COLUMNS: TableProps['columns'] = [
    {
        title: 'Id',
        width: '10%',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Name',
        width: '20%',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city'
    },
]
function UserInfoTable({ data }: ITableProps) {
    return <Table dataSource={data} columns={TABLE_COLUMNS} />
}
export { UserInfoTable }
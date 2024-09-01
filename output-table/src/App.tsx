
import React from 'react';
import data from './db.json'
import './main.css'
import { UserInfoTable } from './components';
import { ConfigProvider } from 'antd';
import ruRU from "antd/es/locale/ru_RU";

/**
 * Точка входа в приложение
 */
function App() {
  return (
    <ConfigProvider locale={ruRU}>
      <UserInfoTable data={data.users} />
    </ConfigProvider>
  );
}

export default App;

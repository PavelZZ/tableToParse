
import React from 'react';
import data from './db.json'
import { UserInfoTable } from './components';
function App() {
  console.log(data.users)
  return (
    <div className="App">
      <UserInfoTable data={data.users} />
    </div>
  );
}

export default App;

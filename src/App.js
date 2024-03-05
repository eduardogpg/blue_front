import React from 'react';
import { Routes, Route } from 'react-router-dom';

import List from './Components/List';
import Detail from './Components/Detail';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/:slug" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;

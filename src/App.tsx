import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import ListPage from './pages/List/ListPage';
import CreatePage from './pages/Create/CreatePage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/client/list' element={<ListPage/>}/>
        <Route path='/client/create' element={<CreatePage/>}/>
        <Route path='*' element={<Navigate to="/client/list" />}/>
      </Routes>
    </div>
  );
}

export default App;

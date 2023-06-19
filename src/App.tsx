import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import ListPage from './pages/List/ListPage';
import CreatePage from './pages/Create/CreatePage';
import { Toaster } from 'react-hot-toast'; //Componente para mensajes emergentes

function App() {
  return (
    <div className="app">
        <Routes>
          <Route path='/client/list' element={<ListPage/>}/>
          <Route path='/client/create' element={<CreatePage/>}/>
          <Route path='*' element={<Navigate to="/client/list" />}/>
        </Routes>        
        <Toaster position='top-center'/>
    </div>
  );
}

export default App;

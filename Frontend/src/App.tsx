import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';

const App: React.FC = (): React.JSX.Element => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App;
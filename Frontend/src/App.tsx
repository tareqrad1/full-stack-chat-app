import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuthStore } from './store/useAuthStore';
import Loading from './components/Loading';

const App: React.FC = (): React.JSX.Element => {
  const { checkAuth, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth, user]);
  
  if(isCheckingAuth) return <Loading />

  return (
    <div>
      <Routes>
        <Route path='*' element={<NotFoundPage /> } />
        <Route path='/' element={user ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path='/signup' element={user ? <Navigate to={'/'} /> : <Register /> } />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App;
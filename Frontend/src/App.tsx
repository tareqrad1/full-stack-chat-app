import React, { useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuthStore } from './store/useAuthStore';
import Loading from './components/Loading';
import { Toaster } from 'react-hot-toast';

const App: React.FC = (): React.JSX.Element => {
  const { checkAuth, user, isCheckingAuth } = useAuthStore();
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true;
      checkAuth();
    }
  },[checkAuth]);
  console.log(user);
  
  if(isCheckingAuth) return <Loading />
  return (
    <div>
      <Routes>
        <Route path='*' element={<NotFoundPage /> } />
        <Route path='/' element={user ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path='/signup' element={!user ? <Register /> : <Navigate to="/" replace={true}/>} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;
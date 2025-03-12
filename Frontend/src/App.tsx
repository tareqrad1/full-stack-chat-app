import React, { useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuthStore } from './store/useAuthStore';
import Loading from './components/Loading';
import { Toaster } from 'react-hot-toast';
import ProfilePage from './pages/ProfilePage';
import { useChatStore } from './store/useChatStore';

const App: React.FC = (): React.JSX.Element => {
  const { checkAuth, user, isCheckingAuth } = useAuthStore();
  const { getUsers } = useChatStore();
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true;
      checkAuth();
      getUsers();
    }
  },[checkAuth, getUsers]);
  
  if(isCheckingAuth) return <Loading />
  return (
    <div>
      <Routes>
        <Route path='*' element={<NotFoundPage /> } />
        <Route path='/' element={user ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path='/signup' element={!user ? <Register /> : <Navigate to="/" replace={true}/>} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/profile' element={user ? <ProfilePage /> : <Navigate to={'/login'} />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;
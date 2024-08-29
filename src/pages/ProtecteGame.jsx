import React from 'react'
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
const ProtecteGame = () => {
  const gameSession = Cookies.get('gameSession');
    
    if (!gameSession) return <Navigate to='/game' replace />;
    
    return <Outlet />;
}

export default ProtecteGame

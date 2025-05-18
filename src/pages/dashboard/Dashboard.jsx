import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const name = location.state?.name || 'Usuário';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Olá, {name}!</h1>

      <button
        onClick={handleLogout}
        className="text-red-500 hover:underline"
      >
        Sair
      </button>
    </div>
  );
};

export default Dashboard;

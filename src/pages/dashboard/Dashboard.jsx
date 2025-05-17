import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const name = location.state?.name || 'Usuário';

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Olá, {name}!</h1>
    </div>
  );
};

export default Dashboard;

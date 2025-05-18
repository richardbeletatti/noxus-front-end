import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">ADMIN</h1>

      <button
        onClick={handleLogout}
        className="text-red-500 hover:underline"
      >
        Sair
      </button>
    </div>
  );
};

export default Admin;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleViewUsers = () => {
    navigate('/admin/users');
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">ADMIN</h1>

      <div className="admin-buttons">
        <button onClick={handleViewUsers} className="admin-button">
          Ver Usuários
        </button>
        <button onClick={handleLogout} className="admin-button logout">
          Sair
        </button>
      </div>
    </div>
  );
};

export default Admin;

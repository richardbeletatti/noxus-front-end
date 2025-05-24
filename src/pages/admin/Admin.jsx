import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import NoxusLogo from '../../assets/noxus-logo.png';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleViewUsers = () => {
    navigate('/admin/users');
  };

  const handleCreateAccount = () => {
    navigate('/admin/create-account');
  };

  const handleReports = () => {
    navigate('/admin/reports');
  };

  return (
    <div className="admin-container">
      <img src={NoxusLogo} alt="Noxus Logo" className="noxus-logo" />

      <h1 className="admin-title">Central de Controle</h1>

      <div className="admin-buttons-vertical">
        <button onClick={handleViewUsers} className="admin-button">
          Ver Usuários
        </button>
        <button onClick={handleCreateAccount} className="admin-button">
          Criar Conta
        </button>
        <button onClick={handleReports} className="admin-button">
          Relatórios
        </button>
        <button onClick={handleLogout} className="admin-button logout">
          Sair
        </button>
      </div>

      <footer className="admin-footer">
        © Agência Além Digital
      </footer>
    </div>
  );
};

export default Admin;

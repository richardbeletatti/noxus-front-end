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

  const accountManager = () => {
    navigate('/admin/account-manager');
  };

  return (
    <div className="admin-container">
      <img src={NoxusLogo} alt="Noxus Logo" className="noxus-logo" />

      <h1 className="admin-title">Central de Controle</h1>

      <div className="admin-buttons-vertical">
        <button onClick={handleViewUsers} className="admin-button">
          Painel das Empresas
        </button>
        <button onClick={handleCreateAccount} className="admin-button">
          Criar conta
        </button>
        <button onClick={accountManager} className="admin-button">
          Gerenciar contas
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

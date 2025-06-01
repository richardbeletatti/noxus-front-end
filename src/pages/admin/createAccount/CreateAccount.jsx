import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';
import NoxusLogo from '../../../assets/noxus-logo.png';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateAccount = async () => {
    if (!name || !email || !password) {
      setError('Todos os campos são obrigatórios');
      setSuccess('');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/admin/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        throw new Error('Erro ao criar conta');
      }

      setSuccess('Conta criada com sucesso!');
      setError('');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Erro ao criar conta');
      setSuccess('');
    }
  };

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div className="create-account-container">
      <div className="header-top">
        <button className="create-account-back-button" onClick={handleBack}>← Voltar</button>
        <img src={NoxusLogo} alt="Noxus Logo" className="noxus-logo" />
        <div style={{ width: '75px' }}></div>
      </div>

      <h2 className="create-account-title">Criar Nova Conta</h2>

      {error && <div className="create-account-error">{error}</div>}
      {success && <div className="create-account-success">{success}</div>}

      <div className="create-account-field">
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome da empresa"
        />
      </div>

      <div className="create-account-field">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email da empresa"
        />
      </div>

      <div className="create-account-field">
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
      </div>

      <button className="create-account-button" onClick={handleCreateAccount}>
        Criar Conta
      </button>
    </div>
  );
};

export default CreateAccount;

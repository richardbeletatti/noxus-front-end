import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserList.css';
import NoxusLogo from '../../../assets/noxus-logo.png';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleOpenKanban = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleBack = () => {
    navigate('/admin');
  };

  useEffect(() => {
    fetch('http://localhost:8080/admin/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar usuários');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando usuários...</p>;

  return (
    <div className="user-list-container">
      <div className="header-top">
        <button className="button-back" onClick={handleBack}>← Voltar</button>
        <img src={NoxusLogo} alt="Noxus Logo" className="noxus-logo" />
        <div style={{ width: '75px' }}>{/* espaço para balancear o botão voltar */}</div>
      </div>

      <h2>Painel das Empresas</h2>
      <ul style={{ padding: 0 }}>
        {users.length === 0 && <li>Nenhum usuário encontrado.</li>}
        {users.map(user => (
          <li key={user.id} className="user-card">
            <div className="user-info">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=8e44ad&color=fff&rounded=true&size=40`}
                alt={user.name}
                className="user-avatar"
              />
              <span>{user.name} - {user.email}</span>
            </div>
            <button
              className="button-edit"
              onClick={() => handleOpenKanban(user.id)}
            >
              Ver Painel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserPanel.css';
import KanbanPage from '../../kanban/KanbanPage';

const UserPanel = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/admin/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar dados do usuário');
        return res.json();
      })
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) return <p>Carregando painel do usuário...</p>;
  if (!userData) return <p>Usuário não encontrado.</p>;

  return (
    <div className="user-panel-container">
      {/* Cabeçalho sofisticado */}
      <div className="user-panel-header">
        <button onClick={() => navigate(-1)} className="user-panel-back" title="Voltar">
          ←
        </button>

        <div className="user-panel-title-container">
          <h2>{userData.name}</h2>
          <p>{userData.email}</p>
        </div>

        <button onClick={handleLogout} className="user-panel-logout">
          Sair
        </button>
      </div>

      {/* Kanban */}
      <div className="kanban-container">
        <KanbanPage userId={userId} />
      </div>
    </div>
  );
};

export default UserPanel;

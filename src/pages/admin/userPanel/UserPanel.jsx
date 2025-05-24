import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserPanel.css';

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

  if (loading) return <p>Carregando painel do usuário...</p>;
  if (!userData) return <p>Usuário não encontrado.</p>;

  return (
    <div className="user-panel-container">
      <button onClick={() => navigate(-1)} className="button-edit">Voltar</button>
      <h2>Painel de {userData.name}</h2>
      {/* Aqui você pode colocar mais dados e componentes do painel */}
      <p>Email: {userData.email}</p>
      {/* Exemplo de conteúdo do painel */}
    </div>
  );
};

export default UserPanel;

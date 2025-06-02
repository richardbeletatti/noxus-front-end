import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountManager.css';
import NoxusLogo from '../../../assets/noxus-logo.png';

const AccountManager = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/admin/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setAccounts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar contas:', err);
        setLoading(false);
      });
  }, []);

  const handleBack = () => {
    navigate('/admin');
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta conta?')) {
      fetch(`http://localhost:8080/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Erro ao deletar conta');
          setAccounts(accounts.filter(account => account.id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/admin/users/${editingUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(editingUser)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao atualizar conta');
        return res.json();
      })
      .then(updatedUser => {
        setAccounts(accounts.map(acc => acc.id === updatedUser.id ? updatedUser : acc));
        setEditingUser(null);
      })
      .catch(err => console.error(err));
  };

  if (loading) return <p>Carregando contas...</p>;

  return (
    <div className="account-manager-container">
      <div className="header-top">
        <button className="button-back" onClick={handleBack}>← Voltar</button>
        <img src={NoxusLogo} alt="Noxus Logo" className="noxus-logo" />
        <div style={{ width: '75px' }}></div>
      </div>

      <h2>Gerenciador de Contas</h2>
      <ul style={{ padding: 0 }}>
        {accounts.length === 0 && <li>Nenhuma conta encontrada.</li>}
        {accounts.map(account => (
          <li key={account.id} className="account-card">
            <div className="account-info">
              <span>{account.name} - {account.email}</span>
            </div>
            <div className="button-group">
              <button className="button-edit" onClick={() => handleEdit(account)}>Editar</button>
              <button className="button-delete" onClick={() => handleDelete(account.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>

      {editingUser && (
        <div className="edit-modal">
          <div className="edit-content">
            <h3>Editar Conta</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                placeholder="Nome"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Nova Senha"
                onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
              />
              <div className="button-group">
                <button type="submit" className="button-save">Salvar</button>
                <button type="button" className="button-cancel" onClick={() => setEditingUser(null)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManager;

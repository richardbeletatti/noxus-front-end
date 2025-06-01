import React, { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumns";
import "./Kanban.css";

const KanbanPage = ({ userId }) => {
  const [columns, setColumns] = useState([]);
  const token = localStorage.getItem("token");

  // Aqui você pode extrair role do token, se precisar para controle de UI
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const role = decodedToken?.role;
  const isAdmin = role === "admin";

  // Função para buscar as colunas no back-end
  const fetchColumns = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/kanban/users/${userId}/columns`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Erro ao buscar colunas");
      const data = await response.json();
      console.log('Colunas recebidas:', data);
      setColumns(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchColumns();
    }
  }, [userId]);

  // Função para criar nova coluna (só admin pode criar)
  const handleAddColumn = async () => {
    const newColumnTitle = prompt("Digite o nome da nova coluna:");
    if (newColumnTitle) {
      try {
        const response = await fetch(
          `http://localhost:8080/admin/kanban/users/${userId}/columns`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: newColumnTitle,
              cards: [],
            }),
          }
        );
        if (!response.ok) throw new Error("Erro ao criar coluna");
        fetchColumns();
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  };

  // Função para deletar coluna (só admin pode deletar)
  const handleDeleteColumn = async (columnId) => {
    if (window.confirm("Tem certeza que quer excluir esta coluna?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/admin/kanban/users/${userId}/columns/${columnId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Erro ao deletar coluna");
        fetchColumns();
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  };

  return (
    <div className="kanban-container">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          isAdmin={isAdmin}
          onDeleteColumn={handleDeleteColumn}
        />
      ))}
      {isAdmin && (
        <button className="add-column-button" onClick={handleAddColumn}>
          + Adicionar Coluna
        </button>
      )}
    </div>
  );
};

export default KanbanPage;

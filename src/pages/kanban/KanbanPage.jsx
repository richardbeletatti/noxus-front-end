import React, { useState } from "react";
import KanbanColumn from "./KanbanColumns";
import { parseJwt } from "../../utils/authUtils";
import "./Kanban.css";

const KanbanPage = () => {
  const [columns, setColumns] = useState([
    {
      id: "leads",
      title: "Leads",
      cards: [
        { id: "1", title: "Card 1", description: "Descrição do Card 1" },
        { id: "2", title: "Card 2", description: "Descrição do Card 2" }
      ]
    }
  ]);

  const token = localStorage.getItem("token");
  const decodedToken = token ? parseJwt(token) : null;

  if (!decodedToken) {
    return <div>Token inválido ou não encontrado.</div>;
  }

  const role = decodedToken.role;
  const isAdmin = role === "admin";

  const handleAddColumn = () => {
    const newColumnTitle = prompt("Digite o nome da nova coluna:");
    if (newColumnTitle) {
      const newColumn = {
        id: Date.now().toString(),
        title: newColumnTitle,
        cards: []
      };
      setColumns([...columns, newColumn]);
    }
  };

  const handleDeleteColumn = (id) => {
    if (id === "leads") {
      alert('A coluna "Leads" não pode ser excluída.');
      return;
    }
    setColumns(columns.filter((column) => column.id !== id));
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

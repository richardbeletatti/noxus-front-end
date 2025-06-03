import React, { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumns";
import AddCardModal from "../card/AddCardModal";
import "./Kanban.css";

const KanbanPage = ({ userId }) => {
  const [columns, setColumns] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // ➜ ESTADO DO MODAL
  const [currentColumnId, setCurrentColumnId] = useState(null); // ➜ COLUNA ATUAL PARA O CARD
  const token = localStorage.getItem("token");

  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const role = decodedToken?.role;
  const isAdmin = role === "admin";

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
      console.log("Colunas recebidas:", data);
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

  // ➜ ABRIR MODAL PARA CRIAR NOVO CARD
  const openAddCardModal = (columnId) => {
    setCurrentColumnId(columnId);
    setModalOpen(true);
  };

  const closeAddCardModal = () => {
    setModalOpen(false);
    setCurrentColumnId(null);
  };

  const handleSaveCard = async (cardData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/kanban/users/${userId}/columns/${currentColumnId}/cards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cardData),
        }
      );
      if (!response.ok) throw new Error("Erro ao criar card");
      closeAddCardModal();
      fetchColumns();
    } catch (error) {
      console.error("Erro:", error);
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
          onAddCard={openAddCardModal} // ➜ PASSA A FUNÇÃO PARA CRIAR CARD
        />
      ))}
      {isAdmin && (
        <button className="add-column-button" onClick={handleAddColumn}>
          + Adicionar Coluna
        </button>
      )}
      <AddCardModal
        isOpen={modalOpen}
        onClose={closeAddCardModal}
        onSave={handleSaveCard}
      />
    </div>
  );
};

export default KanbanPage;

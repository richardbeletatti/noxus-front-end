import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KanbanColumn from "../kanban/KanbanColumns";
import AddCardModal from "../card/AddCardModal";
import "../kanban/Kanban.css";

const UserKanbanPage = () => {
  const [columns, setColumns] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState(null);
  const [userName, setUserName] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    setUserName(decodedToken?.name || "Usuário");
    fetchColumns();
  }, []);

  const fetchColumns = async () => {
    try {
      const response = await fetch("http://localhost:8080/kanban/columns", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Erro ao buscar colunas");
      const data = await response.json();
      setColumns(data);
    } catch (error) {
      console.error("Erro ao buscar colunas:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const openAddCardModal = (columnId) => {
    setCurrentColumnId(columnId);
    setSelectedCard(null); // indica que é criação
    setModalOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card); // indica que é visualização
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentColumnId(null);
    setSelectedCard(null);
  };

  const handleSaveCard = async (cardData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/kanban/columns/${currentColumnId}/cards`,
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
      await fetchColumns();
      closeModal();
    } catch (error) {
      console.error("Erro ao adicionar card:", error);
    }
  };

const handleDeleteCard = async () => {
  if (!selectedCard) return;

  try {
    const response = await fetch(
      `http://localhost:8080/kanban/cards/${selectedCard.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Erro ao deletar card");

    await fetchColumns(); // atualiza a tela com o card removido
    setSelectedCard(null);
    setModalOpen(false);
  } catch (error) {
    console.error("Erro ao deletar card:", error);
  }
};

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#27293d",
          color: "#fff",
          padding: "12px 20px",
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div style={{ width: 60 }}></div>

        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, fontWeight: "normal" }}>{userName}</h2>
          <p style={{ margin: 0, fontSize: "0.9em", color: "#ccc" }}>
            {decodedToken?.sub}
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#aa2222",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            padding: "6px 12px",
            cursor: "pointer",
            width: 60,
          }}
        >
          Sair
        </button>
      </header>

      <div className="kanban-container" style={{ marginTop: 16 }}>
        {columns.length === 0 ? (
          <p style={{ color: "#fff", padding: 20 }}>Carregando colunas...</p>
        ) : (
          columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              isAdmin={false}
              onDeleteColumn={null}
              onAddCard={openAddCardModal}
              onCardClick={handleCardClick}
            />
          ))
        )}
      </div>

      <AddCardModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSaveCard}
        onDelete={handleDeleteCard}
        card={selectedCard}
      />
    </div>
  );
};

export default UserKanbanPage;

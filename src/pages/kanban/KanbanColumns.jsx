import React, { useState } from "react";
import "./Kanban.css";

const KanbanColumn = ({ column, isAdmin, onDeleteColumn, onAddCard }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const openPopup = (card) => {
    setSelectedCard(card);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedCard(null);
    setPopupOpen(false);
  };

  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <h3>{column.name}</h3>
        {isAdmin && (
          <button onClick={() => onDeleteColumn(column.id)}>X</button>
        )}
      </div>

      <div className="kanban-cards">
        {column.cards.map((card) => (
          <div
            key={card.id}
            className="kanban-card"
            onClick={() => openPopup(card)}
          >
            <h4>{card.title}</h4>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

      {isAdmin && (
        <button
          className="add-card-button"
          onClick={() => onAddCard(column.id)}
        >
          + Criar Card
        </button>
      )}

      {popupOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close" onClick={closePopup}>
              ×
            </button>
            <h2>{selectedCard.title}</h2>
            <p>{selectedCard.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanColumn;

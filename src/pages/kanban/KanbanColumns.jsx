import React from "react";
import "./Kanban.css";

const KanbanColumn = ({ column, isAdmin, onDeleteColumn, onAddCard, onCardClick }) => {
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
            onClick={() => onCardClick(card)}
          >
            <h4>{card.title}</h4>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

      {onAddCard && (
        <button className="add-card-button" onClick={() => onAddCard(column.id)}>
          + Criar Card
        </button>
      )}
    </div>
  );
};

export default KanbanColumn;

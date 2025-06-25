import React, { useState, useEffect } from "react";
import "./AddCardModal.css";

const AddCardModal = ({ isOpen, onClose, onSave, onDelete, card }) => {
  const [title, setTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (card) {
      setTitle(card.title || "");
      setPhoneNumber(card.phoneNumber || "");
      setDescription(card.description || "");
    } else {
      setTitle("");
      setPhoneNumber("");
      setDescription("");
    }
  }, [card]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave({
      title,
      phoneNumber,
      description,
      conversationHistory: "https://wa.me/5599999999999", // link fixo
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{card ? "Detalhes do Card" : "Criar novo card"}</h2>

        <input
          placeholder="Nome"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!!card}
        />

        <input
          placeholder="Telefone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={!!card}
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!!card}
        />

        <div className="modal-buttons">
          {!card && (
            <button className="save-btn" onClick={handleSubmit}>
              Salvar
            </button>
          )}
          {card && (
              <button
                className="delete-btn"
                onClick={onDelete}
                style={{
                  backgroundColor: "#d9534f",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  marginRight: "8px",
                  cursor: "pointer",
                }}
              >
                Deletar
              </button>
            )}
          <button
          className="cancel-btn"
          onClick={onClose}
          style={{
            backgroundColor: "#6c757d", // cinza escuro
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Fechar
        </button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;

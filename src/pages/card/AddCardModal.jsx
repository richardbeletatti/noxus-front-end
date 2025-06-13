import React, { useState } from "react";
import "./AddCardModal.css";

const AddCardModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave({
      title,
      phoneNumber,
      description,
      conversationHistory: "https://wa.me/5599999999999", // link fixo
    });

    // Limpa os campos após salvar
    setTitle("");
    setPhoneNumber("");
    setDescription("");

     onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Criar novo card</h2>

        <input
          placeholder="Nome"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Telefone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="save-btn" onClick={handleSubmit}>
            Salvar
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;

import React, { useState } from "react";
import "./AddCardModal.css";

const AddCardModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [history, setHistory] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave({
      name,
      phone,
      history,
      description,
      title: name,
    });
    setName("");
    setPhone("");
    setHistory("");
    setDescription("");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Criar novo card</h2>
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="E-mail de Contato"
          value={history}
          onChange={(e) => setHistory(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      
        <div className="modal-buttons">
            <button className="save-btn">Salvar</button>
            <button className="cancel-btn" onClick={onClose}>Cancelar</button>
        </div>

      </div>
    </div>
  );
};

export default AddCardModal;

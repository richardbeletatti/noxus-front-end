import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KanbanColumn from "../kanban/KanbanColumns";
import "../kanban/Kanban.css";

const UserKanbanPage = () => {
  const [columns, setColumns] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userName = decodedToken?.name || "Usuário";

  const fetchColumns = async () => {
    try {
      const response = await fetch(`http://localhost:8080/kanban/columns`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Erro ao buscar colunas");
      const data = await response.json();
      setColumns(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      {/* Cabeçalho */}
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
        {/* Espaço vazio para centralizar o nome */}
        <div style={{ width: 60 }}></div>

        <h2 style={{ margin: 0, fontWeight: "normal" }}>{userName}</h2>

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

      {/* Kanban */}
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
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserKanbanPage;

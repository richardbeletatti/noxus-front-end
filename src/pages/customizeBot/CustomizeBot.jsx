import React, { useState, useEffect } from "react";
import "./CustomizeBot.css";

const CustomizeBot = () => {
  const token = localStorage.getItem("token");

  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");
  const [intents, setIntents] = useState([{ name: "", questions: [""] }]);
  const [availableColumns, setAvailableColumns] = useState([]);

  // 🔹 Carrega colunas do kanban
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetch("http://localhost:8080/kanban/columns", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Erro ao buscar colunas");
        const data = await response.json();
        setAvailableColumns(data);
      } catch (err) {
        console.error("Erro ao carregar colunas:", err);
      }
    };

    fetchColumns();
  }, [token]);

  // 🔹 Carrega configurações existentes do bot
  useEffect(() => {
    const fetchBotConfig = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/bot/load", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Erro ao buscar configurações");
        const data = await response.json();

        setWhatsappNumber(data.whatsappNumber || "");
        setGreetingMessage(data.greetingMessage || "");
        setIntents(
          data.intents && data.intents.length > 0
            ? data.intents
            : [{ name: "", questions: [""] }]
        );
      } catch (err) {
        console.error("Erro ao carregar configurações:", err);
      }
    };

    fetchBotConfig();
  }, [token]);

  // 🔹 Manipuladores de estado
  const handleIntentChange = (index, value) => {
    const updated = [...intents];
    updated[index].name = value;
    setIntents(updated);
  };

  const handleQuestionChange = (intentIndex, questionIndex, value) => {
    const updated = [...intents];
    updated[intentIndex].questions[questionIndex] = value;
    setIntents(updated);
  };

  const addIntent = () => {
    setIntents([...intents, { name: "", questions: [""] }]);
  };

  const removeIntent = (indexToRemove) => {
    if (intents.length > 1) {
      const updated = intents.filter((_, index) => index !== indexToRemove);
      setIntents(updated);
    }
  };

  const addQuestion = (intentIndex) => {
    const updated = [...intents];
    updated[intentIndex].questions.push("");
    setIntents(updated);
  };

  const removeLastQuestion = (intentIndex) => {
    const updated = [...intents];
    if (updated[intentIndex].questions.length > 1) {
      updated[intentIndex].questions.pop();
      setIntents(updated);
    }
  };

  // 🔹 Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      whatsappNumber,
      greetingMessage,
      intents,
    };

    try {
      const response = await fetch("http://localhost:8080/api/bot/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao salvar configurações");

      alert("Bot configurado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar configurações.");
    }
  };

  return (
    <div className="customize-bot-page">
      <div className="customize-bot-card">
        <h2 style={{ marginBottom: 20 }}>🤖 Configuração do Bot do WhatsApp</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div>
            <label className="input-label">Número do WhatsApp:</label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="+5511999999999"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="input-label">Mensagem de Saudação:</label>
            <textarea
              value={greetingMessage}
              onChange={(e) => setGreetingMessage(e.target.value)}
              placeholder="Olá! Como posso te ajudar hoje?"
              required
              className="input-field"
              style={{ height: 80 }}
            />
          </div>

          <div>
            <h3 style={{ marginBottom: 10 }}>🎯 Intenções e Perguntas</h3>
            {intents.map((intent, intentIndex) => (
              <div key={intentIndex} className="intent-box">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <label className="input-label">Nome da Intenção:</label>

                  {intents.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIntent(intentIndex)}
                      className="btn btn-small btn-danger"
                    >
                      🗑️ Remover Intenção
                    </button>
                  )}
                </div>

                <select
                  value={intent.name}
                  onChange={(e) =>
                    handleIntentChange(intentIndex, e.target.value)
                  }
                  required
                  className="input-field"
                >
                  <option value="">Selecione uma interação</option>
                  {availableColumns.map((col) => (
                    <option key={col.id} value={col.name}>
                      {col.name}
                    </option>
                  ))}
                </select>

                <label className="input-label">Perguntas:</label>
                {intent.questions.map((q, qIndex) => (
                  <input
                    key={qIndex}
                    type="text"
                    value={q}
                    onChange={(e) =>
                      handleQuestionChange(intentIndex, qIndex, e.target.value)
                    }
                    placeholder={`Pergunta ${qIndex + 1}`}
                    required
                    className="input-field"
                  />
                ))}

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => addQuestion(intentIndex)}
                    className="btn btn-small"
                  >
                    ➕ Adicionar Pergunta
                  </button>

                  {intent.questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLastQuestion(intentIndex)}
                      className="btn btn-small btn-danger"
                    >
                      🗑️ Remover Última Pergunta
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button type="button" onClick={addIntent} className="btn">
              ➕ Adicionar Nova Intenção
            </button>
          </div>

          <button type="submit" className="btn btn-submit">
            💾 Salvar Configurações
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomizeBot;

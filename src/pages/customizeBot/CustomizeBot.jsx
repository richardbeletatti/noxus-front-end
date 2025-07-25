import React, { useState, useEffect } from "react";

const CustomizeBot = () => {
  const token = localStorage.getItem("token");

  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");
  const [intents, setIntents] = useState([{ name: "", questions: [""] }]);

  // Carrega dados existentes (futuramente do back-end)
  useEffect(() => {
    // Exemplo futuro de GET para preencher campos
    // fetch("http://localhost:8080/whatsapp-bot", { headers: { Authorization: `Bearer ${token}` } })
    //   .then(res => res.json())
    //   .then(data => {
    //     setWhatsappNumber(data.number);
    //     setGreetingMessage(data.greeting);
    //     setIntents(data.intents);
    //   });
  }, []);

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

  const addQuestion = (intentIndex) => {
    const updated = [...intents];
    updated[intentIndex].questions.push("");
    setIntents(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      whatsappNumber,
      greetingMessage,
      intents,
    };

    try {
      const response = await fetch("http://localhost:8080/whatsapp-bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Erro ao salvar configurações");

      alert("Bot configurado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar configurações.");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto", color: "#fff" }}>
      <h2>🤖 Configuração do Bot do WhatsApp</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label>Número do WhatsApp:</label>
          <input
            type="text"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="+5511999999999"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label>Mensagem de Saudação:</label>
          <textarea
            value={greetingMessage}
            onChange={(e) => setGreetingMessage(e.target.value)}
            placeholder="Olá! Como posso te ajudar hoje?"
            required
            style={{ ...inputStyle, height: 80 }}
          />
        </div>

        <div>
          <h3>🎯 Intenções e Perguntas</h3>
          {intents.map((intent, intentIndex) => (
            <div key={intentIndex} style={{ marginBottom: 20, padding: 10, border: "1px solid #ccc", borderRadius: 6 }}>
              <input
                type="text"
                value={intent.name}
                onChange={(e) => handleIntentChange(intentIndex, e.target.value)}
                placeholder="Ex: comprar"
                required
                style={inputStyle}
              />

              <div style={{ marginTop: 8 }}>
                <strong>Perguntas:</strong>
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
                    style={{ ...inputStyle, marginTop: 4 }}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addQuestion(intentIndex)}
                  style={smallButton}
                >
                  + Adicionar Pergunta
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addIntent} style={buttonStyle}>
            + Adicionar Intenção
          </button>
        </div>

        <button type="submit" style={{ ...buttonStyle, backgroundColor: "#2e89ff" }}>
          💾 Salvar Configurações
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginTop: "4px",
};

const buttonStyle = {
  backgroundColor: "#444",
  color: "#fff",
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: 12,
};

const smallButton = {
  ...buttonStyle,
  padding: "4px 8px",
  fontSize: "0.9em",
  marginTop: 8,
};

export default CustomizeBot;

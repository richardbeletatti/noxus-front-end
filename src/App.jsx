import { useState } from "react";

const initialColumns = {
  novo: {
    name: "Novo",
    items: [
      { id: 1, title: "Lead 1 - João" },
      { id: 2, title: "Lead 2 - Maria" },
    ],
  },
  emContato: {
    name: "Em Contato",
    items: [
      { id: 3, title: "Lead 3 - Pedro" },
    ],
  },
  fechado: {
    name: "Fechado",
    items: [
      { id: 4, title: "Lead 4 - Ana" },
    ],
  },
};

export default function App() {
  const [columns] = useState(initialColumns);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Kanban CRM</h1>
      
      {/* Container das colunas */}
      <div className="flex flex-row gap-6 overflow-x-auto border border-red-500">
        {Object.entries(columns).map(([key, column]) => (
          <div key={key} className="bg-white rounded shadow p-4 w-64 flex-shrink-0">
            <h2 className="font-semibold text-lg mb-4 border-b pb-2">{column.name}</h2>
            <div className="flex flex-col gap-3">
              {column.items.map(item => (
                <div key={item.id} className="bg-blue-100 p-3 rounded shadow-sm cursor-pointer hover:bg-blue-200">
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

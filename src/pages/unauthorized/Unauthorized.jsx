import React from 'react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-red-600">
        Acesso negado: Você não tem permissão para acessar esta página.
      </h1>
    </div>
  );
};

export default Unauthorized;

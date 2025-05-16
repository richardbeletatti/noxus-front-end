import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import noxusLogo from '../../assets/noxus-logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

   const loginData = {
      email: email,
      password: password,
    };

    console.log("Enviando dados para o backend:", loginData);

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password
      });
      console.log("Resposta do servidor:", response.data); 
      
      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      alert('Login falhou. Verifique seu e-mail e senha.');
    }
  };

  return (
    <div className="login-container min-h-screen justify-center">
      <div className="flex flex-col items-center">
        <img src={noxusLogo} alt="Logo" className="login-logo" />
        <h1 className="text-xl font-bold">Bem-vindo ao Noxus!</h1>
        <p className="text-sm text-gray-400">Faça seu login</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>

        <footer className="login-footer">
          © Agência Alem Digital
        </footer>
      </div>
    </div>
  );
};

export default Login;
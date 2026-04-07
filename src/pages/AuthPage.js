import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  
  const [mode, setMode] = useState('login'); 
  const [message, setMessage] = useState('');
  
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

const handleLogin = (e) => {
    e.preventDefault();
    if (login === 'admin' && password === 'admin') {
      navigate('/home');
    } else {
      alert('Неверный логин или пароль');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    setMessage('Вы успешно зарегистрированы! Теперь авторизуйтесь.');
    switchMode('login');
  };

  const handleForgot = (e) => {
    e.preventDefault();
    setMessage('Ссылка для восстановления отправлена на вашу почту!');
    switchMode('login');
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setLogin('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    if (newMode !== 'login') setMessage('');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Ideas Notes</h1>
        
        {message && <p className="success-message">{message}</p>}

        {mode === 'login' && (
          <form className="auth-form" onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="Логин" 
              className="auth-input"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Пароль" 
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-btn">Войти</button>
            <button type="button" className="auth-btn" onClick={() => switchMode('register')}>
              Зарегистрироваться
            </button>
            <p className="forgot-password" onClick={() => switchMode('forgot')}>
              Забыли пароль<b>?</b>
            </p>
          </form>
        )}

        {mode === 'register' && (
          <form className="auth-form" onSubmit={handleRegister}>
            <input 
              type="text" 
              placeholder="Придумайте логин" 
              className="auth-input"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder="Google почта" 
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Придумайте пароль" 
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Повторите пароль" 
              className="auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-btn">Создать аккаунт</button>
            <button type="button" className="auth-btn" onClick={() => switchMode('login')}>
              Назад ко входу
            </button>
          </form>
        )}

        {mode === 'forgot' && (
          <form className="auth-form" onSubmit={handleForgot}>
            <input 
              type="text" 
              placeholder="Введите логин" 
              className="auth-input"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder="Введите почту" 
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="auth-btn">Отправить ссылку</button>
            <button type="button" className="auth-btn" onClick={() => switchMode('login')}>
              Назад ко входу
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
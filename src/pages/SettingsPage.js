import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsPage.css';

const SettingsPage = ({ setTheme }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/auth');
  };

  return (
    <div className="settings-page">
      <div className="settings-box">
        <h1 className="settings-title">Настройки</h1>
        
        <div className="settings-section">
          <h3>Режим фона</h3>
          <div className="theme-options">
            <button className="theme-btn std" onClick={() => setTheme('standard')}>Стандарт</button>
            <button className="theme-btn lgt" onClick={() => setTheme('light')}>Светлый</button>
            <button className="theme-btn drk" onClick={() => setTheme('dark')}>Темный</button>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>Выйти из аккаунта</button>
      </div>
    </div>
  );
};

export default SettingsPage;
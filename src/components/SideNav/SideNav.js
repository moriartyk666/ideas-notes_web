import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideNav.css';
import homeIcon from '../../assets/icons/home.svg';
import savedIcon from '../../assets/icons/saved.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import plusIcon from '../../assets/icons/plus.svg';
import profileIcon from '../../assets/icons/profile.svg';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="side-nav">
      <div className="nav-top">
        {isOpen && (
          <>
            <div className="nav-item" onClick={() => navigate('/home')}>
              <img src={homeIcon} alt="" />
              <span>Главная</span>
            </div>
            <div className="nav-item" onClick={() => navigate('/saved')}>
              <img src={savedIcon} alt="" />
              <span>Сохранённое</span>
            </div>
            <div className="nav-item" onClick={() => navigate('/settings')}>
              <img src={settingsIcon} alt="" />
              <span>Настройки</span>
            </div>
            <div className="nav-item" onClick={() => navigate('/create')}>
              <img src={plusIcon} alt="" />
              <span>Создать</span>
            </div>
            <div className="nav-item" onClick={() => navigate('/profile')}>
              <img src={profileIcon} alt="" />
              <span>Профиль</span>
            </div>
          </>
        )}
      </div>

      <div className="nav-bottom">
        <div className="nav-item more-btn" onClick={toggleMenu}>
          <div className="burger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>Ещё</span>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
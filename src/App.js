import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import NotePage from './pages/NotePage';
import SavedPage from './pages/SavedPage';
import CreateNotePage from './pages/CreateNotePage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  const [theme, setTheme] = useState('standard');

  return (
    <Router>
      <div className={`app-container theme-${theme}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
          
          <Route path="/home" element={<><SideNav /><HomePage /></>} />
          <Route path="/profile" element={<><SideNav /><ProfilePage /></>} />
          <Route path="/saved" element={<><SideNav /><SavedPage /></>} />
          <Route path="/create" element={<><SideNav /><CreateNotePage /></>} />
          <Route path="/settings" element={<><SideNav /><SettingsPage setTheme={setTheme} /></>} />
          <Route path="/note/:id" element={<><SideNav /><NotePage /></>} />

          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
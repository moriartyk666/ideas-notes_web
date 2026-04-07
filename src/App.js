import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
          
          <Route path="/home" element={
            <>
              <SideNav />
              <HomePage />
            </>
          } />

          <Route path="/profile" element={
            <>
              <SideNav />
              <ProfilePage />
            </>
          } />

          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
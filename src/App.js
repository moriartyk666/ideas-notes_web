import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Страница авторизации (без сайдбара) */}
          <Route path="/auth" element={<div>Тут будет AuthPage</div>} />
          
          {/* Остальные страницы (с сайдбаром) */}
          <Route path="*" element={
            <>
              <SideNav />
              <HomePage />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
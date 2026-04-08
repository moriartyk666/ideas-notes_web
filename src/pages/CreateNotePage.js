import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNote } from '../api';
import './CreateNotePage.css';

const CreateNotePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handlePublish = async (e) => {
    e.preventDefault();
    // Теперь проверяем токен, чтобы убедиться, что пользователь вошел
    const token = localStorage.getItem('access');

    if (!token) {
      alert("Ошибка авторизации. Попробуйте перезайти в аккаунт.");
      navigate('/auth');
      return;
    }

    try {
      // Отправляем только title и text. Автор определится на бэкенде автоматически!
      await createNote({
        title: title,
        text: text
      });
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert("Ошибка публикации. Возможно, сессия устарела.");
    }
  };

  return (
    <div className="create-note-page">
      <div className="create-note-box">
        <input 
          type="text" 
          placeholder="Название идеи" 
          className="create-note-input-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          placeholder="Текст идеи..." 
          className="create-note-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="publish-btn" onClick={handlePublish}>
          Опубликовать
        </button>
      </div>
    </div>  
  );
};

export default CreateNotePage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateNotePage.css';

const CreateNotePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title || !text) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    navigate('/home');
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
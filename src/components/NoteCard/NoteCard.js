import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toggleLike, toggleBookmark } from '../../api';
import './NoteCard.css';
import likeIcon from '../../assets/icons/like.svg';
import commentIcon from '../../assets/icons/comment.svg';
import bookmarkIcon from '../../assets/icons/saved.svg';

const NoteCard = ({ id, title, author, initialIsLiked, initialIsSaved }) => {
  const navigate = useNavigate();
  
  // Создаем внутреннее состояние, но синхронизируем его с пропсами из базы
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  // Важный момент: если пропсы изменились (например, при загрузке страницы), 
  // обновляем состояние иконок
  useEffect(() => {
    setIsLiked(initialIsLiked);
    setIsSaved(initialIsSaved);
  }, [initialIsLiked, initialIsSaved]);

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      await toggleLike(id);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Ошибка при лайке:", err);
    }
  };

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    try {
      await toggleBookmark(id);
      setIsSaved(!isSaved);
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
    }
  };

  return (
    <div className="note-card">
      <div className="note-clickable-area" onClick={() => navigate(`/note/${id}`)}>
        <div className="note-content">
          <h3>Идея: {title}</h3>
          <p className="author">автор {author}</p>
        </div>
      </div>
      
      <div className="note-footer">
        <div className="left-icons">
          <button 
            className={`icon-btn ${isLiked ? 'active-like' : ''}`} 
            onClick={handleLikeClick}
          >
            <img src={likeIcon} alt="Like" />
          </button>
          <button 
            className="icon-btn" 
            onClick={(e) => { e.stopPropagation(); navigate(`/note/${id}`); }}
          >
            <img src={commentIcon} alt="Comments" />
          </button>
        </div>
        
        <button 
          className={`icon-btn ${isSaved ? 'active-save' : ''}`} 
          onClick={handleSaveClick}
        >
          <img src={bookmarkIcon} alt="Save" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
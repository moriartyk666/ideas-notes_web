import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { toggleLike, toggleBookmark } from '../api'; // Импорт базового api для загрузки данных
import './NotePage.css';
import likeIcon from '../assets/icons/like.svg';
import commentIcon from '../assets/icons/comment.svg';
import bookmarkIcon from '../assets/icons/saved.svg';

const NotePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [note, setNote] = useState(null); // Данные идеи
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showLikers, setShowLikers] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Загружаем данные идеи при открытии страницы
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`notes/${id}/`);
        const data = response.data;
        setNote(data);
        setIsLiked(data.is_liked || false);
        setIsSaved(data.is_saved || false);
        setLikesCount(data.likes_count || 0);
      } catch (err) {
        console.error("Ошибка загрузки идеи", err);
      }
    };
    fetchNote();
  }, [id]);

  const handleToggleLike = async () => {
    try {
      await toggleLike(id);
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (err) {
      alert("Ошибка. Вы авторизованы?");
    }
  };

  const handleToggleSave = async () => {
    try {
      await toggleBookmark(id);
      setIsSaved(!isSaved);
    } catch (err) {
      alert("Ошибка сохранения");
    }
  };

  // Пока данные загружаются, показываем пустой экран
  if (!note) return <div className="note-detail-page">Загрузка...</div>;

  return (
    <div className="note-detail-page">
      <div className="note-detail-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ← Назад
        </button>
      </div>
      
      <div className="note-detail-box">
        <h1 className="detail-title">{note.title}</h1>
        
        <p className="detail-text">
          {note.text}
        </p>
        
        <div className="detail-info">
          <p className="detail-author">автор {note.author_name}</p>
          <p className="detail-date">{new Date(note.created_at).toLocaleString('ru-RU')}</p>
        </div>

        <div className="detail-footer">
          <div className="interaction-btns">
            <div className="like-section">
              <button 
                className={`icon-btn ${isLiked ? 'active-like' : ''}`} 
                onClick={handleToggleLike}
              >
                <img src={likeIcon} alt="" />
              </button>
              <span className="likes-counter" onClick={() => setShowLikers(!showLikers)}>
                {likesCount}
              </span>
            </div>

            <button className="icon-btn" onClick={() => setShowComments(!showComments)}>
              <img src={commentIcon} alt="" />
            </button>
          </div>
          
          <button 
            className={`icon-btn ${isSaved ? 'active-save' : ''}`} 
            onClick={handleToggleSave}
          >
            <img src={bookmarkIcon} alt="" />
          </button>
        </div>

        {showLikers && (
          <div className="likers-list">
            <h4>Понравилось:</h4>
            <p>Функция загрузки пользователей в разработке</p>
          </div>
        )}

        {showComments && (
          <div className="comments-section">
            <h3>Комментарии</h3>
            {/* Это пока демо-комментарии из твоего верстака, бэкенд для них подключим позже */}
            <div className="comment-item">
              <b>Иван:</b> Отличная задумка!
            </div>
            <div className="comment-input-block">
              <input type="text" placeholder="Написать комментарий..." />
              <button className="send-comment-btn">Отправить</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotePage;
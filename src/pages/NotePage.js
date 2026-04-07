import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './NotePage.css';
import likeIcon from '../assets/icons/like.svg';
import commentIcon from '../assets/icons/comment.svg';
import bookmarkIcon from '../assets/icons/saved.svg';

const NotePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(10);
  const [showLikers, setShowLikers] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="note-detail-page">
      <div className="note-detail-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ← Назад
        </button>
      </div>
      
      <div className="note-detail-box">
        <h1 className="detail-title">Название идеи {id}</h1>
        
        <p className="detail-text">
          Это расширенный режим вашей идеи. Здесь пользователь может прочитать полный текст, 
          который автор решил опубликовать. Мы настроили дизайн так, чтобы всё было 
          крупно и удобно для чтения.
        </p>
        
        <div className="detail-info">
          <p className="detail-author">автор {id}</p>
          <p className="detail-date">07.04.2026 12:00</p>
        </div>

        <div className="detail-footer">
          <div className="interaction-btns">
            <div className="like-section">
              <button 
                className={`icon-btn ${isLiked ? 'active-like' : ''}`} 
                onClick={toggleLike}
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
            onClick={() => setIsSaved(!isSaved)}
          >
            <img src={bookmarkIcon} alt="" />
          </button>
        </div>

        {showLikers && (
          <div className="likers-list">
            <h4>Понравилось:</h4>
            <p>Пользователь 1, Пользователь 2, Абдурахим</p>
          </div>
        )}

        {showComments && (
          <div className="comments-section">
            <h3>Комментарии</h3>
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
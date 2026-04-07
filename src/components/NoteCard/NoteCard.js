import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NoteCard.css';
import likeIcon from '../../assets/icons/like.svg';
import commentIcon from '../../assets/icons/comment.svg';
import bookmarkIcon from '../../assets/icons/saved.svg';

const NoteCard = ({ id, title, author }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
            onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          >
            <img src={likeIcon} alt="" />
          </button>
          <button 
            className="icon-btn" 
            onClick={(e) => { e.stopPropagation(); navigate(`/note/${id}`); }}
          >
            <img src={commentIcon} alt="" />
          </button>
        </div>
        
        <button 
          className={`icon-btn ${isSaved ? 'active-save' : ''}`} 
          onClick={(e) => { e.stopPropagation(); setIsSaved(!isSaved); }}
        >
          <img src={bookmarkIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
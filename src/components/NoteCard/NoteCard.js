import React from 'react';
import './NoteCard.css';
import likeIcon from '../../assets/icons/like.svg';
import commentIcon from '../../assets/icons/comment.svg';
import bookmarkIcon from '../../assets/icons/saved.svg';

const NoteCard = ({ title, author }) => {
  return (
    <div className="note-card">
      <div className="note-content">
        <h3>Идея: {title}</h3>
        <p className="author">автор {author}</p>
      </div>
      <div className="note-footer">
        <button className="icon-btn">
          <img src={likeIcon} alt="" />
        </button>
        <button className="icon-btn">
          <img src={commentIcon} alt="" />
        </button>
        <button className="icon-btn">
          <img src={bookmarkIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
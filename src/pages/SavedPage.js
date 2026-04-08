import React, { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard/NoteCard';
import { getSavedNotes } from '../api';
import './ProfilePage.css'; 

const SavedPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await getSavedNotes();
        // Сервер может вернуть массив напрямую или объект с полем results
        const data = response.data.results || response.data;
        if (Array.isArray(data)) setNotes(data);
      } catch (error) {
        console.error("Ошибка загрузки сохраненных:", error);
      }
    };
    fetchSaved();
  }, []);

  return (
    <div className="profile-page">
      <h1>Сохранённые идеи</h1>
      <div className="notes-container">
        {notes.length > 0 ? (
          notes.map(note => (
            <NoteCard 
              key={note.id} id={note.id} title={note.title} author={note.author_name}
              initialIsLiked={note.is_liked} initialIsSaved={note.is_saved} initialLikesCount={note.likes_count}
            />
          ))
        ) : (
          <p style={{fontStyle: 'italic', marginTop: '20px'}}>У вас пока нет сохраненных идей.</p>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
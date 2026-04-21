import React, { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard/NoteCard';
import { getNotes, deleteNote } from '../api';
import './ProfilePage.css';

const ProfilePage = () => {
  const [notes, setNotes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  
  // Берем данные текущего пользователя из памяти
  const currentUsername = localStorage.getItem('username') || 'Пользователь';
  const currentUserId = localStorage.getItem('user_id');

  useEffect(() => {
    fetchMyNotes();
  }, []);

  const fetchMyNotes = async () => {
    try {
      const response = await getNotes();
      const data = response.data.results || response.data;
      
      if (Array.isArray(data)) {
        // Фильтруем идеи текущего пользователя
        const myNotes = data.filter(note => String(note.author) === String(currentUserId));
        setNotes(myNotes);
      }
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error);
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteSelected = async () => {
    if (!window.confirm(`Удалить выбранные идеи (${selectedIds.length})?`)) return;

    try {
      for (let id of selectedIds) {
        await deleteNote(id);
      }
      setNotes(notes.filter(note => !selectedIds.includes(note.id)));
      setSelectedIds([]);
      setIsSelectionMode(false);
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Произошла ошибка при удалении заметок из базы.");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Мои идеи ({currentUsername})</h1>
        <div className="profile-actions">
          {!isSelectionMode ? (
            <button className="profile-btn" onClick={() => setIsSelectionMode(true)}>Выбрать</button>
          ) : (
            <>
              <button className="profile-btn delete-btn" onClick={deleteSelected}>Удалить ({selectedIds.length})</button>
              <button className="profile-btn" onClick={() => {setIsSelectionMode(false); setSelectedIds([]);}}>Отмена</button>
            </>
          )}
        </div>
      </div>

      <div className="notes-container">
        {notes.length > 0 ? (
          notes.map(note => (
            <div key={note.id} className="note-selection-wrapper">
              {isSelectionMode && (
                <div className="checkbox-container">
                  <input 
                    type="checkbox" 
                    className="custom-checkbox" 
                    checked={selectedIds.includes(note.id)}
                    onChange={() => toggleSelect(note.id)}
                  />
                </div>
              )}
              <NoteCard 
                id={note.id} 
                title={note.title} 
                author={note.author_name}
                // Теперь статусы будут подхватываться и в профиле
                initialIsLiked={note.is_liked}
                initialIsSaved={note.is_saved}
                initialLikesCount={note.likes_count}
              />
            </div>
          ))
        ) : (
          <p style={{fontSize: '20px', fontStyle: 'italic'}}>У вас пока нет созданных идей.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
import React, { useState } from 'react';
import NoteCard from '../components/NoteCard/NoteCard';
import './ProfilePage.css';

const ProfilePage = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Моя идея 1', author: 'Я' },
    { id: 2, title: 'Моя идея 2', author: 'Я' },
    { id: 3, title: 'Моя идея 3', author: 'Я' }
  ]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteSelected = () => {
    setNotes(notes.filter(note => !selectedIds.includes(note.id)));
    setSelectedIds([]);
    setIsSelectionMode(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Мои идеи</h1>
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
        {notes.map(note => (
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
            <NoteCard id={note.id} title={note.title} author={note.author} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
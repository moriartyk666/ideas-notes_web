import React from 'react';
import NoteCard from '../components/NoteCard/NoteCard';
import './ProfilePage.css'; // Используем тот же фон и отступы

const SavedPage = () => {
  return (
    <div className="profile-page">
      <h1>Сохранённые идеи</h1>
      <div className="notes-container">
        <NoteCard id="1" title="Сохраненная идея 1" author="1" />
      </div>
    </div>
  );
};

export default SavedPage;
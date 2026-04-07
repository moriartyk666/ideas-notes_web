import React from 'react';
import NoteCard from '../components/NoteCard/NoteCard';
import './HomePage.css';

const HomePage = () => {
  const notes = [
    { id: 1, title: 'Название 1', author: '1' },
    { id: 2, title: 'Название 2', author: '2' },
    { id: 3, title: 'Название 3', author: '3' },
  ];

  return (
    <div className="home-page">
      <h1>Лента идей</h1>
      <div className="notes-container">
        {notes.map(note => (
          <NoteCard key={note.id} title={note.title} author={note.author} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
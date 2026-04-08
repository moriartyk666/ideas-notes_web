import React, { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard/NoteCard';
import { getNotes } from '../api';
import './HomePage.css';

const HomePage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getNotes();
        // Защита: если с бэкенда пришел не массив, ставим пустой массив
        if (Array.isArray(response.data)) {
          setNotes(response.data);
        } else {
          setNotes([]);
        }
      } catch (error) {
        console.error("Ошибка API:", error);
        setNotes([]);
      }
    };
    loadData();
  }, []);

  return (
    <div className="home-page">
      <h1>Лента идей</h1>
      <div className="notes-container">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map(note => (
            <NoteCard 
              key={note.id} 
              id={note.id} 
              title={note.title} 
              author={note.author_name} 
            />
          ))
        ) : (
          <p style={{marginTop: '20px', fontStyle: 'italic'}}>Пока идей нет. Станьте первым!</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
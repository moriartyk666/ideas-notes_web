import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
});

// Добавляем токен авторизации ко всем запросам автоматически
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getNotes = () => api.get('notes/');
export const createNote = (data) => api.post('notes/', data);
export const deleteNote = (id) => api.delete(`notes/${id}/`);

export const toggleLike = (id) => api.post(`notes/${id}/toggle_like/`);
export const toggleBookmark = (id) => api.post(`notes/${id}/toggle_bookmark/`);
export const getSavedNotes = () => api.get('notes/saved/');

export const loginUser = (username, password) => 
  axios.post('http://127.0.0.1:8000/api/token/', { username, password });
export const registerUser = (userData) => 
  api.post('users/register/', userData);

export default api;
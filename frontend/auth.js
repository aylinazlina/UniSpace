// src/utils/auth.js
import axios from 'axios';

export const getAccessToken = () => localStorage.getItem('access');
export const getRefreshToken = () => localStorage.getItem('refresh');

export const refreshAccessToken = async () => {
  const refresh = getRefreshToken();

  if (!refresh) {
    console.warn('No refresh token found.');
    return null;
  }

  try {
    const res = await axios.post('/api/token/refresh/', { refresh });
    const newAccess = res.data.access;
    localStorage.setItem('access', newAccess);
    return newAccess;
  } catch (err) {
    console.error('Failed to refresh token:', err.response?.data || err.message);
    // Optionally redirect to login or logout
    return null;
  }
};

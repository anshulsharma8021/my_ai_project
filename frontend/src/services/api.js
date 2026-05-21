import axios from 'axios';

// Determine the API base URL based on environment
const getBaseURL = () => {
  // If running on localhost frontend, use localhost backend
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  }
  // Otherwise use the IP address
  return 'http://192.168.0.100:8000';
};

const API = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (data) => {
  return API.post('/auth/login', data);
};

export const registerUser = async (data) => {
  return API.post('/auth/register', data);
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  return API.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendMessage = async (message, conversation_id, language = 'english') => {
  const token = localStorage.getItem('token');

  return API.post(
    '/chat/',
    {
      message,
      conversation_id,
      language,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getConversations = async () => {
  const token = localStorage.getItem('token');
  return API.get('/chat/conversations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFile = async (file) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', file);

  return API.post('/chat/upload', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateLanguagePreference = async (language) => {
  const token = localStorage.getItem('token');
  return API.put(
    '/auth/language',
    { language },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
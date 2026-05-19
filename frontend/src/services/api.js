import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.0.100:8000',
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

export const sendMessage = async (message, conversation_id) => {

  const token = localStorage.getItem('token');

  return API.post(
    '/chat/',
    {
      message,
      conversation_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
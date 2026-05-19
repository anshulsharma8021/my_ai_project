import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ChatDashboard from './pages/ChatDashboard';
import { globalStyles } from './styles/globalStyles';

function PrivateRoute({ children }) {

  const token = localStorage.getItem('token');

  return token
    ? children
    : <Navigate to="/login" />;
}

function PublicRoute({ children }) {

  const token = localStorage.getItem('token');

  return !token
    ? children
    : <Navigate to="/chat" />;
}

function App() {
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = globalStyles;
    document.head.appendChild(styleSheet);

    return () => {
      styleSheet.remove();
    };
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            <PublicRoute><Login /></PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute><Register /></PublicRoute>
          } />
          <Route path="/chat" element={
            <PrivateRoute><ChatDashboard /></PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
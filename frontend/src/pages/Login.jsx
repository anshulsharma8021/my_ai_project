// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

  e.preventDefault();

  setError('');

  setLoading(true);

  try {

    const res = await loginUser({
      email,
      password,
    });

    console.log("LOGIN RESPONSE:", res.data);

    if (res.data.access_token) {

      login(res.data.access_token, res.data.user);

      navigate('/chat');

    } else {

      setError('Token not received');

    }

  } catch (err) {

    console.log(err);

    setError(
      err.response?.data?.detail ||
      'Login failed'
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.icon}>🔐</div>
            <h2 style={styles.title}>Welcome Back</h2>
            <p style={styles.subtitle}>Sign in to continue to ChatBotX</p>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                style={styles.input}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button 
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {})
              }} 
              type="submit"
              disabled={loading}
            >
              {loading ? '⏳ Signing in...' : '🚀 Sign In'}
            </button>
          </form>

          <div style={styles.divider}>
            <span>or</span>
          </div>

          <p style={styles.footerText}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.link}>
              Create one now
            </Link>
          </p>
        </div>

        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>✨ Demo Credentials</h3>
          <p style={styles.infoText}>Email: demo@example.com</p>
          <p style={styles.infoText}>Password: demo123</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem',
    padding: '2rem',
    minHeight: 'calc(100vh - 70px)',
    '@media (maxWidth: 768px)': {
      gap: '1rem',
      flexDirection: 'column',
    },
  },
  card: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '15px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
    animation: 'slideInLeft 0.6s ease-out',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#888',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '0.95rem',
    transition: 'all 0.3s',
    outline: 'none',
    '&:focus': {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    },
    '&:disabled': {
      backgroundColor: '#f5f5f5',
      cursor: 'not-allowed',
    },
  },
  button: {
    padding: '0.85rem',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginTop: '0.5rem',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  divider: {
    textAlign: 'center',
    margin: '1.5rem 0',
    position: 'relative',
    color: '#999',
    fontSize: '0.85rem',
  },
  footerText: {
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#666',
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '15px',
    padding: '1.5rem',
    color: 'white',
    maxWidth: '300px',
    '@media (maxWidth: 768px)': {
      maxWidth: '100%',
    },
  },
  infoTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  infoText: {
    fontSize: '0.85rem',
    marginBottom: '0.5rem',
  },
};
      

  


const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' },
  card: { background: 'white', padding: '40px', borderRadius: '12px', width: '360px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' },
  title: { textAlign: 'center', marginBottom: '24px', color: '#1a1a1a' },
  input: { width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' },
  error: { color: 'red', textAlign: 'center', marginBottom: '12px' },
  link: { textAlign: 'center', marginTop: '16px', fontSize: '14px' },
};
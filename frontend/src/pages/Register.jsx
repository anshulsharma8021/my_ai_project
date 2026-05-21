// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('❌ Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('❌ Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({ email, password, name });
      login(res.data.access_token, res.data.user);
      navigate('/chat');
    } catch (err) {
      setError('❌ Registration failed. Email may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>🎉 Join ChatBotX Today</h3>
          <ul style={styles.infoList}>
            <li>✨ Instant AI responses</li>
            <li>🔒 Secure & encrypted</li>
            <li>📱 Works on all devices</li>
            <li>⚡ Lightning fast</li>
            <li>♾️ Unlimited conversations</li>
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.icon}>🚀</div>
            <h2 style={styles.title}>Create Account</h2>
            <p style={styles.subtitle}>Start chatting with AI in seconds</p>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

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
              <span style={styles.hint}>At least 6 characters</span>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password</label>
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? '⏳ Creating account...' : '✨ Create Account'}
            </button>
          </form>

          <div style={styles.divider}>
            <span>or</span>
          </div>

          <p style={styles.footerText}>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>
              Sign in here
            </Link>
          </p>
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
  hint: {
    fontSize: '0.75rem',
    color: '#999',
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
    padding: '2rem',
    color: 'white',
    maxWidth: '350px',
    '@media (maxWidth: 768px)': {
      maxWidth: '100%',
    },
  },
  infoTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  },
  infoList: {
    listStyle: 'none',
    padding: 0,
    fontSize: '0.95rem',
    lineHeight: '2',
  },
};
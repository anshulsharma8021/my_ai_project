import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await loginUser({ email, password });
      login(res.data.access_token);
      setEmail('');
      setPassword('');
      onClose();
      navigate('/chat');
    } catch (err) {
      setError('❌ Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>
        
        <div style={styles.header}>
          <div style={styles.icon}>🔐</div>
          <h2 style={styles.title}>Sign In</h2>
          <p style={styles.subtitle}>Enter your credentials to access ChatBotX</p>
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

        <div style={styles.footer}>
          <p style={styles.footerText}>Demo: demo@example.com / demo123</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '450px',
    padding: '2.5rem',
    position: 'relative',
    animation: 'slideInLeft 0.3s ease-out',
  },
  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#999',
    transition: 'color 0.3s',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  icon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.9rem',
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
  footer: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '0.8rem',
    color: '#666',
    margin: 0,
  },
};

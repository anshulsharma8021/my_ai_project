import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar({ onSignIn }) {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = location.pathname === '/';

  const handleSignIn = () => {
    if (isHomePage && onSignIn) {
      onSignIn();
    } else {
      navigate('/login');
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🤖</span>
          <span style={styles.logoText}>ChatBotX</span>
        </Link>

        {/* Desktop Menu */}
        <div style={styles.desktopMenu}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <a href="#features" style={styles.navLink}>Features</a>
          <a href="#about" style={styles.navLink}>About</a>
          
          <div style={styles.authButtons}>
            {token ? (
              <>
                <Link to="/chat" style={styles.chatButton}>
                  Open Chat
                </Link>
                <button onClick={handleLogout} style={styles.logoutButton}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={handleSignIn} style={styles.loginButton}>
                  Sign In
                </button>
                <Link to="/register" style={styles.signupButton}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          style={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <a href="#features" style={styles.mobileLink}>Features</a>
          <a href="#about" style={styles.mobileLink}>About</a>
          
          {token ? (
            <>
              <Link to="/chat" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                Open Chat
              </Link>
              <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleSignIn} 
                style={styles.mobileLink}
              >
                Sign In
              </button>
              <Link to="/register" style={styles.mobileSignupLink} onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: 'white',
  },
  logoIcon: {
    fontSize: '1.8rem',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  desktopMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    '@media (maxWidth: 768px)': {
      display: 'none',
    },
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'opacity 0.3s',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  authButtons: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginLeft: '1rem',
    borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
    paddingLeft: '1rem',
  },
  loginButton: {
    padding: '0.5rem 1.2rem',
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '25px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '0.95rem',
    fontWeight: '600',
    font: 'inherit',
  },
  signupButton: {
    padding: '0.5rem 1.2rem',
    backgroundColor: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '25px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '0.95rem',
    fontWeight: '600',
  },
  chatButton: {
    padding: '0.5rem 1.2rem',
    backgroundColor: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '25px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '0.95rem',
    fontWeight: '600',
  },
  logoutButton: {
    padding: '0.5rem 1.2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '2px solid white',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '0.95rem',
    fontWeight: '600',
  },
  mobileMenuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
    '@media (maxWidth: 768px)': {
      display: 'block',
    },
  },
  mobileMenu: {
    display: 'none',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem 2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
    '@media (maxWidth: 768px)': {
      display: 'flex',
    },
  },
  mobileLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 0',
    fontSize: '0.95rem',
  },
  mobileSignupLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.75rem 1rem',
    fontSize: '0.95rem',
    backgroundColor: 'white',
    color: '#667eea',
    borderRadius: '25px',
    textAlign: 'center',
  },
  mobileLogoutBtn: {
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '2px solid white',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
};

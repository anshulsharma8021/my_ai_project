import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import LoginModal from '../components/LoginModal';

export default function Home() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleGetStarted = () => {
    if (token) {
      navigate('/chat');
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar onSignIn={() => setLoginModalOpen(true)} />
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>
              Welcome to <span style={styles.highlight}>ChatBotX</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Your AI-powered conversation companion designed to help, inspire, and engage
            </p>
            <p style={styles.heroDescription}>
              Experience the power of advanced AI technology with natural conversations, 
              instant responses, and personalized interactions.
            </p>
            <button onClick={handleGetStarted} style={styles.ctaButton}>
              {token ? '💬 Open Chat Now' : '🚀 Get Started'}
            </button>
          </div>
          <div style={styles.heroImage}>
            <div style={styles.animatedBot}>
              <span style={styles.botEmoji}>🤖</span>
              <div style={styles.botPulse}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.features}>
        <h2 style={styles.sectionTitle}>Why Choose ChatBotX?</h2>
        
        <div style={styles.featuresGrid}>
          {[
            {
              icon: '⚡',
              title: 'Lightning Fast',
              description: 'Get instant responses to your questions with our advanced AI'
            },
            {
              icon: '🔒',
              title: 'Secure & Private',
              description: 'Your conversations are encrypted and stored securely'
            },
            {
              icon: '🧠',
              title: 'AI Powered',
              description: 'Powered by cutting-edge machine learning models'
            },
            {
              icon: '📱',
              title: 'Mobile Friendly',
              description: 'Chat seamlessly on any device, anytime, anywhere'
            },
            {
              icon: '🎯',
              title: 'Smart Suggestions',
              description: 'Get intelligent suggestions tailored to your needs'
            },
            {
              icon: '♾️',
              title: 'Unlimited Chats',
              description: 'Have as many conversations as you want'
            }
          ].map((feature, idx) => (
            <div key={idx} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        
        <div style={styles.stepsContainer}>
          {[
            {
              number: '1',
              title: 'Create Account',
              description: 'Sign up with your email in seconds'
            },
            {
              number: '2',
              title: 'Start Chatting',
              description: 'Begin a conversation with our AI'
            },
            {
              number: '3',
              title: 'Get Answers',
              description: 'Receive intelligent responses instantly'
            },
            {
              number: '4',
              title: 'Save History',
              description: 'Access all your past conversations'
            }
          ].map((step, idx) => (
            <div key={idx} style={styles.stepCard}>
              <div style={styles.stepNumber}>{step.number}</div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Chat?</h2>
          <p style={styles.ctaText}>
            Join thousands of users already experiencing the power of ChatBotX
          </p>
          <button onClick={handleGetStarted} style={styles.ctaButtonLarge}>
            {token ? '💬 Open Chat' : '🚀 Start For Free'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>ChatBotX</h4>
            <p style={styles.footerText}>
              Advanced AI conversation platform for everyone
            </p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Quick Links</h4>
            <ul style={styles.footerList}>
              <li><a href="/" style={styles.footerLink}>Home</a></li>
              <li><a href="#features" style={styles.footerLink}>Features</a></li>
              <li><a href="#about" style={styles.footerLink}>About</a></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Legal</h4>
            <ul style={styles.footerList}>
              <li><a href="#" style={styles.footerLink}>Privacy</a></li>
              <li><a href="#" style={styles.footerLink}>Terms</a></li>
              <li><a href="#" style={styles.footerLink}>Contact</a></li>
            </ul>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>© 2024 ChatBotX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  hero: {
    padding: '4rem 2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderBottom: '1px solid #e0e0e0',
  },
  heroContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    alignItems: 'center',
    '@media (maxWidth: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  heroText: {
    animation: 'slideInLeft 0.6s ease-out',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '1rem',
    lineHeight: '1.2',
    '@media (maxWidth: 768px)': {
      fontSize: '2.5rem',
    },
  },
  highlight: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    color: '#555',
    marginBottom: '1rem',
    fontWeight: '500',
  },
  heroDescription: {
    fontSize: '1rem',
    color: '#888',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  ctaButton: {
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
    },
  },
  heroImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (maxWidth: 768px)': {
      height: '300px',
    },
  },
  animatedBot: {
    position: 'relative',
    width: '200px',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botEmoji: {
    fontSize: '5rem',
    animation: 'float 3s ease-in-out infinite',
  },
  botPulse: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: '2px solid rgba(102, 126, 234, 0.3)',
    borderRadius: '50%',
    animation: 'pulse 2s ease-in-out infinite',
  },
  features: {
    padding: '4rem 2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-5px)',
    },
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
  },
  featureDescription: {
    fontSize: '0.95rem',
    color: '#888',
    lineHeight: '1.5',
  },
  howItWorks: {
    padding: '4rem 2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '20px',
    marginTop: '2rem',
  },
  stepsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  stepCard: {
    textAlign: 'center',
  },
  stepNumber: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: '0 auto 1rem',
  },
  stepTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
  },
  stepDescription: {
    color: '#888',
    lineHeight: '1.5',
  },
  ctaSection: {
    padding: '4rem 2rem',
    margin: '2rem 0',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textAlign: 'center',
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1rem',
  },
  ctaText: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '2rem',
  },
  ctaButtonLarge: {
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    backgroundColor: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
  footer: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '3rem 2rem 1rem',
    marginTop: '2rem',
  },
  footerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  footerSection: {
    marginBottom: '1rem',
  },
  footerTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  footerText: {
    color: '#aaa',
    lineHeight: '1.6',
  },
  footerList: {
    listStyle: 'none',
    padding: 0,
  },
  footerLink: {
    color: '#aaa',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.5rem',
    transition: 'color 0.3s',
    '&:hover': {
      color: 'white',
    },
  },
  footerBottom: {
    borderTop: '1px solid #444',
    paddingTop: '1rem',
    textAlign: 'center',
    color: '#aaa',
  },
};

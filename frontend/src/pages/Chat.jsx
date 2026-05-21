// src/pages/Chat.jsx
import { useState, useEffect, useRef } from 'react';
import { sendMessage, uploadFile } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [convId, setConvId] = useState(null);
  const [language, setLanguage] = useState('english');
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const { logout, user, updateLanguage } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === 'hindi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setInput((prev) => prev + transcript + ' ');
          } else {
            interimTranscript += transcript;
          }
        }
      };
    }
  }, [language]);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    const savedConvId = localStorage.getItem('currentConvId');
    const savedLanguage = localStorage.getItem('chatLanguage') || 'english';
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    if (savedConvId) {
      setConvId(savedConvId);
    }
    if (user?.language_preference) {
      setLanguage(user.language_preference);
    } else {
      setLanguage(savedLanguage);
    }
  }, [user]);

  // Save chat to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (convId) {
      localStorage.setItem('currentConvId', convId);
    }
  }, [convId]);

  useEffect(() => {
    localStorage.setItem('chatLanguage', language);
  }, [language]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    let greeting = 'Hello';
    
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';

    const username = user?.name || 'there';
    return language === 'hindi' ? `नमस्ते ${username}! 👋` : `${greeting} ${username}! 👋`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await sendMessage(input, convId, language);
      setConvId(res.data.conversation_id);
      setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch (error) {
      const errorMsg = language === 'hindi' ? 'Error aaya, dobara try karo.' : 'Error occurred, please try again.';
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = async (newLanguage) => {
    setLanguage(newLanguage);
    if (updateLanguage) {
      await updateLanguage(newLanguage);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadProgress(0);
    try {
      const res = await uploadFile(file);
      setUploadProgress(100);
      
      const message = language === 'hindi' 
        ? `📎 File uploaded: ${file.name}`
        : `📎 File uploaded: ${file.name}`;
      
      setMessages((prev) => [...prev, { role: 'user', content: message }]);
      
      setTimeout(() => setUploadProgress(null), 2000);
    } catch (error) {
      console.error('File upload failed:', error);
      const errorMsg = language === 'hindi' ? 'File upload failed' : 'File upload failed';
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMsg }]);
    }
    setShowFileMenu(false);
  };

  const handleMicrophone = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setConvId(null);
    localStorage.removeItem('chatMessages');
    localStorage.removeItem('currentConvId');
  };

  const handleSelectConversation = (selectedConvId) => {
    setConvId(selectedConvId);
    // In a real app, you would fetch messages for this conversation
    // For now, we'll just switch the convId
  };

  const handleLogout = () => {
    localStorage.removeItem('chatMessages');
    localStorage.removeItem('currentConvId');
    localStorage.removeItem('chatLanguage');
    logout();
    navigate('/login');
  };

  const greetingMessage = messages.length === 0 ? getGreeting() : null;

  return (
    <div style={styles.page}>
      <Sidebar 
        currentConvId={convId} 
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        user={user}
      />
      
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h2 style={styles.headerTitle}>MyAI Chat</h2>
            {user && <p style={styles.userInfo}>{user.name || user.email}</p>}
          </div>
          
          <div style={styles.headerRight}>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              style={styles.languageSelect}
            >
              <option value="english">English</option>
              <option value="hindi">हिंदी</option>
            </select>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        </div>

        <div style={styles.messagesContainer}>
          {messages.length === 0 && greetingMessage && (
            <div style={styles.greeting}>
              <p style={styles.greetingText}>{greetingMessage}</p>
              <p style={styles.greetingSubtext}>
                {language === 'hindi' ? 'मुझसे कुछ भी पूछो!' : 'Ask me anything!'}
              </p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div key={i} style={{
              ...styles.message,
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              background: msg.role === 'user' ? '#6c63ff' : '#f0f0f0',
              color: msg.role === 'user' ? 'white' : '#1a1a1a',
            }}>
              {msg.content}
            </div>
          ))}
          
          {loading && (
            <div style={{ ...styles.message, alignSelf: 'flex-start', background: '#f0f0f0' }}>
              <span style={styles.typing}>
                {language === 'hindi' ? 'सोच रहा हूं...' : 'Thinking...'}
              </span>
            </div>
          )}
          
          {uploadProgress !== null && (
            <div style={styles.uploadProgress}>
              <div style={{...styles.progressBar, width: `${uploadProgress}%`}}></div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputArea}>
          <div style={styles.inputRow}>
            <button
              style={{...styles.iconBtn, opacity: showFileMenu ? 0.8 : 1}}
              onClick={() => setShowFileMenu(!showFileMenu)}
              title="Upload files"
            >
              +
            </button>

            {showFileMenu && (
              <div style={styles.fileMenu}>
                <button style={styles.fileOption} onClick={() => fileInputRef.current?.click()}>
                  📷 Upload Photo
                </button>
                <button style={styles.fileOption} onClick={() => fileInputRef.current?.click()}>
                  📄 Upload File
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              accept="image/*,.pdf,.doc,.docx,.txt"
            />

            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={language === 'hindi' ? 'संदेश लिखो...' : 'Type message...'}
            />

            <button
              style={{...styles.iconBtn, background: isListening ? '#ff6b6b' : '#6c63ff'}}
              onClick={handleMicrophone}
              title="Voice input"
            >
              🎤
            </button>

            <button
              onClick={handleSend}
              style={styles.sendBtn}
              disabled={loading}
            >
              {language === 'hindi' ? 'भेजो' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', height: '100vh', background: '#f0f2f5' },
  container: { display: 'flex', flexDirection: 'column', flex: 1, background: '#f0f2f5' },
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '16px 24px', 
    background: '#6c63ff', 
    color: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
  headerTitle: { margin: 0, fontSize: '24px' },
  userInfo: { margin: 0, fontSize: '12px', opacity: 0.9 },
  headerRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  languageSelect: { 
    padding: '6px 10px', 
    borderRadius: '6px', 
    border: 'none', 
    background: 'rgba(255,255,255,0.2)', 
    color: 'white',
    cursor: 'pointer',
    fontSize: '13px',
  },
  logoutBtn: { background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer' },
  messagesContainer: { 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '12px', 
    padding: '24px', 
    overflowY: 'auto',
    alignItems: 'flex-start',
  },
  greeting: { 
    width: '100%', 
    textAlign: 'center', 
    marginTop: '60px',
    padding: '20px',
  },
  greetingText: { fontSize: '28px', fontWeight: 'bold', color: '#6c63ff', margin: '0 0 8px 0' },
  greetingSubtext: { fontSize: '16px', color: '#999', margin: 0 },
  message: { maxWidth: '70%', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.5', wordWrap: 'break-word' },
  typing: { fontSize: '14px' },
  uploadProgress: { width: '200px', height: '4px', background: '#e0e0e0', borderRadius: '2px', overflow: 'hidden' },
  progressBar: { height: '100%', background: '#6c63ff', transition: 'width 0.3s' },
  inputArea: { padding: '16px 24px', background: 'white', borderTop: '1px solid #eee' },
  inputRow: { display: 'flex', gap: '8px', alignItems: 'center', position: 'relative' },
  input: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' },
  iconBtn: { padding: '10px 14px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', transition: 'all 0.2s' },
  sendBtn: { padding: '12px 24px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
  fileMenu: { 
    position: 'absolute', 
    bottom: '50px', 
    left: '8px', 
    background: 'white', 
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
  fileOption: { 
    display: 'block', 
    width: '100%', 
    padding: '12px 16px', 
    border: 'none', 
    background: 'transparent', 
    cursor: 'pointer',
    fontSize: '13px',
    textAlign: 'left',
    transition: 'background 0.2s',
  },
};
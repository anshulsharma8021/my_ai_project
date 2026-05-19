import { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ChatDashboard() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [convId, setConvId] = useState(null);
  const messagesEndRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await sendMessage({
        message: input,
        conversation_id: convId,
      });
      setConvId(res.data.conversation_id);
      setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: '❌ Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setConvId(null);
    setInput('');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.mainContent}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <button onClick={handleNewChat} style={styles.newChatBtn}>
            ➕ New Chat
          </button>
          <div style={styles.historySection}>
            <h3 style={styles.historyTitle}>Chat History</h3>
            <p style={styles.historyEmpty}>No history yet</p>
          </div>
        </div>

        {/* Chat Area */}
        <div style={styles.chatArea}>
          {/* Messages Container */}
          <div style={styles.messagesContainer}>
            {messages.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>🤖</div>
                <h2 style={styles.emptyTitle}>Welcome to ChatBotX!</h2>
                <p style={styles.emptyText}>
                  Start a conversation by typing your message below
                </p>
                <div style={styles.suggestedPrompts}>
                  {[
                    'How can I learn programming?',
                    'Tell me a fun fact',
                    'What is AI?'
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(prompt)}
                      style={styles.promptButton}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={styles.messagesList}>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={msg.role === 'user' ? styles.userMessageWrapper : styles.assistantMessageWrapper}
                  >
                    <div
                      style={msg.role === 'user' ? styles.userMessage : styles.assistantMessage}
                    >
                      {msg.role === 'assistant' && <span style={styles.messageIcon}>🤖</span>}
                      <p style={styles.messageText}>{msg.content}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={styles.assistantMessageWrapper}>
                    <div style={styles.assistantMessage}>
                      <span style={styles.messageIcon}>🤖</span>
                      <p style={styles.loadingText}>
                        <span style={styles.dot}></span>
                        <span style={styles.dot}></span>
                        <span style={styles.dot}></span>
                      </p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div style={styles.inputArea}>
            <div style={styles.inputWrapper}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (Shift+Enter for new line)"
                style={styles.input}
                disabled={loading}
                rows="1"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                style={{
                  ...styles.sendButton,
                  ...(loading || !input.trim() ? styles.sendButtonDisabled : {})
                }}
              >
                {loading ? '⏳' : '📤'}
              </button>
            </div>
            <p style={styles.disclaimer}>
              💡 ChatBotX can make mistakes. Please verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    flex: 1,
    overflow: 'hidden',
    '@media (maxWidth: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  sidebar: {
    backgroundColor: 'white',
    borderRight: '1px solid #e0e0e0',
    padding: '1rem',
    overflowY: 'auto',
    '@media (maxWidth: 768px)': {
      display: 'none',
    },
  },
  newChatBtn: {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    marginBottom: '1rem',
    transition: 'all 0.3s',
  },
  historySection: {
    marginTop: '2rem',
  },
  historyTitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#666',
    marginBottom: '1rem',
    textTransform: 'uppercase',
  },
  historyEmpty: {
    fontSize: '0.85rem',
    color: '#999',
    textAlign: 'center',
    padding: '1rem',
  },
  chatArea: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
  },
  messagesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
    gap: '1rem',
  },
  emptyIcon: {
    fontSize: '4rem',
    animation: 'float 3s ease-in-out infinite',
  },
  emptyTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  emptyText: {
    fontSize: '1rem',
    color: '#888',
    marginBottom: '1rem',
  },
  suggestedPrompts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
    width: '100%',
    maxWidth: '600px',
  },
  promptButton: {
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
    },
  },
  userMessageWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
  },
  assistantMessageWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '1rem',
  },
  userMessage: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '0.75rem 1.25rem',
    borderRadius: '18px 18px 4px 18px',
    maxWidth: '70%',
    display: 'flex',
    alignItems: 'flex-end',
    gap: '0.5rem',
    '@media (maxWidth: 768px)': {
      maxWidth: '85%',
    },
  },
  assistantMessage: {
    backgroundColor: '#f0f0f0',
    color: '#1a1a1a',
    padding: '0.75rem 1.25rem',
    borderRadius: '18px 18px 18px 4px',
    maxWidth: '70%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    '@media (maxWidth: 768px)': {
      maxWidth: '85%',
    },
  },
  messageIcon: {
    fontSize: '1.25rem',
    flexShrink: 0,
    marginTop: '0.25rem',
  },
  messageText: {
    margin: 0,
    fontSize: '0.95rem',
    lineHeight: '1.5',
    wordBreak: 'break-word',
  },
  loadingText: {
    margin: 0,
    fontSize: '1rem',
    display: 'flex',
    gap: '0.3rem',
  },
  dot: {
    animation: 'bounce 1.4s infinite',
  },
  inputArea: {
    padding: '1.5rem',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: 'white',
  },
  inputWrapper: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '25px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    resize: 'none',
    outline: 'none',
    maxHeight: '120px',
    transition: 'border-color 0.3s',
    '&:focus': {
      borderColor: '#667eea',
    },
    '&:disabled': {
      backgroundColor: '#f5f5f5',
    },
  },
  sendButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'all 0.3s',
    fontWeight: '600',
  },
  sendButtonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
  disclaimer: {
    fontSize: '0.8rem',
    color: '#999',
    margin: 0,
  },
};

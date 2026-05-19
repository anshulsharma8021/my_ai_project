// src/pages/Chat.jsx
import { useState } from 'react';
import { sendMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [convId, setConvId] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

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
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error aaya, dobara try karo.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>MyAI Chat</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>

      <div style={styles.messages}>
        {messages.length === 0 && (
          <p style={styles.placeholder}>Kuch bhi poochho... main yahan hoon!</p>
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
            Soch raha hoon...
          </div>
        )}
      </div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Message likho..."
        />
        <button onClick={handleSend} style={styles.sendBtn} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', height: '100vh', background: '#f0f2f5' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: '#6c63ff', color: 'white' },
  headerTitle: { margin: 0 },
  logoutBtn: { background: 'transparent', border: '1px solid white', color: 'white', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer' },
  messages: { flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', overflowY: 'auto' },
  message: { maxWidth: '70%', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.5' },
  placeholder: { textAlign: 'center', color: '#999', marginTop: '40px' },
  inputArea: { display: 'flex', gap: '12px', padding: '16px 24px', background: 'white', borderTop: '1px solid #eee' },
  input: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' },
  sendBtn: { padding: '12px 24px', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
};
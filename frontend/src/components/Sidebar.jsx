import { useState, useEffect } from 'react';
import { getConversations } from '../services/api';
import '../styles/sidebar.css';

export default function Sidebar({ currentConvId, onSelectConversation, onNewChat, user }) {
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredConversations, setFilteredConversations] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await getConversations();
      setConversations(res.data);
      setFilteredConversations(res.data);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    const filtered = conversations.filter(conv =>
      conv.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredConversations(filtered);
  };

  const handleNewChat = () => {
    setSearchTerm('');
    onNewChat();
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h3 style={styles.title}>MyAI</h3>
      </div>

      <button style={styles.newChatBtn} onClick={handleNewChat}>
        + New Chat
      </button>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.recentChatsContainer}>
        <h4 style={styles.recentTitle}>Recent Chats</h4>
        {filteredConversations.length === 0 ? (
          <p style={styles.noChats}>No chats yet. Start a new one!</p>
        ) : (
          filteredConversations.map((conv) => (
            <div
              key={conv.id}
              style={{
                ...styles.chatItem,
                background: currentConvId === conv.id ? '#6c63ff' : 'transparent',
                color: currentConvId === conv.id ? 'white' : '#333',
              }}
              onClick={() => onSelectConversation(conv.id)}
            >
              <span style={styles.chatTitle}>{conv.title}</span>
              <span style={styles.chatDate}>
                {new Date(conv.created_at).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '250px',
    background: '#f8f9fa',
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    overflowY: 'auto',
  },
  header: {
    padding: '16px',
    borderBottom: '1px solid #e0e0e0',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    color: '#6c63ff',
  },
  newChatBtn: {
    margin: '12px',
    padding: '10px',
    background: '#6c63ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'background 0.3s',
  },
  searchContainer: {
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
  },
  searchInput: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px',
    boxSizing: 'border-box',
  },
  recentChatsContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px 0',
  },
  recentTitle: {
    margin: '12px',
    fontSize: '12px',
    color: '#666',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  chatItem: {
    padding: '12px 16px',
    cursor: 'pointer',
    borderLeft: '3px solid transparent',
    transition: 'all 0.2s',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
  },
  chatTitle: {
    flex: 1,
    fontSize: '13px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  chatDate: {
    fontSize: '11px',
    opacity: 0.7,
  },
  noChats: {
    padding: '12px 16px',
    fontSize: '13px',
    color: '#999',
    textAlign: 'center',
  },
};

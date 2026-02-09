import { useState } from 'react';
import type { Match } from '../types';

interface ChatScreenProps {
    user: Match | null;
    onBack: () => void;
}

const ChatScreen = ({ user, onBack }: ChatScreenProps) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);

    const sendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { id: Date.now(), text: message, sent: true }]);
            setMessage('');
        }
    };

    if (!user) return null;

    return (
        <div className="chat-screen">
            <div className="chat-header">
                <button className="btn-icon" onClick={onBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="chat-header-info">
                    <img src={user.user.photo} alt={user.user.name} />
                    <div>
                        <h3>{user.user.name}</h3>
                        <span className="online-status">Online</span>
                    </div>
                </div>
                <div style={{ width: '44px' }}></div>
            </div>
            <div className="chat-messages">
                {messages.length === 0 ? (
                    <div className="chat-empty">
                        <p>Say hi to {user.user.name}! 👋</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className={`message ${msg.sent ? 'sent' : 'received'}`}>
                            <div className="message-bubble">{msg.text}</div>
                        </div>
                    ))
                )}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                />
                <button className="btn-send" onClick={sendMessage}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatScreen;

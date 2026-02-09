import type { Match } from '../types';

interface ChatListScreenProps {
    matches: Match[];
    onChatClick: (match: Match) => void;
}

const ChatListScreen = ({ matches, onChatClick }: ChatListScreenProps) => {
    return (
        <div className="chat-list-screen">
            <div className="screen-header">
                <h2>Messages</h2>
            </div>
            <div className="chat-list-content">
                {matches.length === 0 ? (
                    <div className="no-chats">
                        <div className="no-chats-icon">💬</div>
                        <h3>No conversations yet</h3>
                        <p>Start chatting with your matches!</p>
                    </div>
                ) : (
                    <div className="chat-list">
                        {matches.map((match) => (
                            <div key={match.id} className="chat-item" onClick={() => onChatClick(match)}>
                                <img src={match.user.photo} alt={match.user.name} className="chat-avatar" />
                                <div className="chat-item-info">
                                    <h4>{match.user.name}</h4>
                                    <p>Start a conversation...</p>
                                </div>
                                <div className="chat-time">Now</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatListScreen;

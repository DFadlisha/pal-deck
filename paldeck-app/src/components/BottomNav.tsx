import './BottomNav.css';

interface BottomNavProps {
    currentScreen: string;
    onNavigate: (screen: any) => void;
    matchCount: number;
    unreadCount: number;
}

const BottomNav = ({ currentScreen, onNavigate, matchCount, unreadCount }: BottomNavProps) => {
    return (
        <nav className="bottom-nav">
            <button
                className={`nav-item ${currentScreen === 'swipe' ? 'active' : ''}`}
                onClick={() => onNavigate('swipe')}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                <span>Discover</span>
            </button>
            <button
                className={`nav-item ${currentScreen === 'matches' ? 'active' : ''}`}
                onClick={() => onNavigate('matches')}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>Matches</span>
                {matchCount > 0 && <span className="badge">{matchCount}</span>}
            </button>
            <button
                className={`nav-item ${currentScreen === 'chat-list' ? 'active' : ''}`}
                onClick={() => onNavigate('chat-list')}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Chats</span>
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </button>
            <button
                className={`nav-item ${currentScreen === 'profile' ? 'active' : ''}`}
                onClick={() => onNavigate('profile')}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Profile</span>
            </button>
        </nav>
    );
};

export default BottomNav;

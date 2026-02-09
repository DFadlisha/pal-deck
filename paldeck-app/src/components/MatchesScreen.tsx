import type { Match } from '../types';
import './MatchesScreen.css';

interface MatchesScreenProps {
    matches: Match[];
    onChatClick: (match: Match) => void;
}

const MatchesScreen = ({ matches, onChatClick }: MatchesScreenProps) => {
    return (
        <div className="matches-screen">
            <div className="screen-header">
                <h2>Your Matches</h2>
            </div>
            <div className="matches-content">
                {matches.length === 0 ? (
                    <div className="no-matches">
                        <div className="no-matches-icon">💫</div>
                        <h3>No matches yet</h3>
                        <p>Start swiping to find your new friends!</p>
                    </div>
                ) : (
                    <div className="matches-grid">
                        {matches.map((match) => (
                            <div key={match.id} className="match-card" onClick={() => onChatClick(match)}>
                                <div className="match-photo" style={{ backgroundImage: `url(${match.user.photo})` }}></div>
                                <div className="match-info">
                                    <h4>{match.user.name}</h4>
                                    <p>{match.user.age} • {match.user.location.split(',')[0]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchesScreen;

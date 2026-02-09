/** Main swipe interface optimized for native mobile touch gestures */
import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { Match, SwipeCard } from '../types.ts';
import { PalDeckLogoSimple } from './Logo.tsx';
import './SwipeScreen.css';

interface SwipeScreenProps {
    onMatch: (match: Match) => void;
}

// Mock data for demo
const mockUsers: SwipeCard[] = [
    {
        id: '1',
        name: 'Alex Chen',
        age: 24,
        location: 'Tokyo, Japan',
        bio: 'Love anime, gaming, and exploring new cultures! Looking for friends to chat about life and share experiences.',
        interests: ['Gaming', 'Anime', 'Travel', 'Photography', 'Music'],
        photo: 'https://i.pravatar.cc/400?img=12',
        distance: 8520
    },
    {
        id: '2',
        name: 'Maria Santos',
        age: 22,
        location: 'São Paulo, Brazil',
        bio: 'Artist and coffee enthusiast ☕ Always up for deep conversations and making new friends around the world!',
        interests: ['Art', 'Coffee', 'Music', 'Books', 'Hiking'],
        photo: 'https://i.pravatar.cc/400?img=45',
        distance: 15230
    },
    {
        id: '3',
        name: 'James Wilson',
        age: 26,
        location: 'London, UK',
        bio: 'Tech geek and fitness enthusiast. Love discussing startups, coding, and staying active. Let\'s connect!',
        interests: ['Technology', 'Fitness', 'Startups', 'Coding', 'Running'],
        photo: 'https://i.pravatar.cc/400?img=33',
        distance: 6840
    },
    {
        id: '4',
        name: 'Yuki Tanaka',
        age: 23,
        location: 'Seoul, South Korea',
        bio: 'K-pop fan and language learner 🎵 Want to practice English and make friends who love Korean culture!',
        interests: ['K-pop', 'Languages', 'Dancing', 'Food', 'Fashion'],
        photo: 'https://i.pravatar.cc/400?img=47',
        distance: 1200
    },
    {
        id: '5',
        name: 'Emma Rodriguez',
        age: 25,
        location: 'Barcelona, Spain',
        bio: 'Foodie and travel blogger. Always looking for new adventures and friends to share stories with!',
        interests: ['Travel', 'Food', 'Blogging', 'Photography', 'Wine'],
        photo: 'https://i.pravatar.cc/400?img=48',
        distance: 9500
    }
];

const SwipeScreen = ({ onMatch }: SwipeScreenProps) => {
    const [cards, setCards] = useState<SwipeCard[]>(mockUsers);
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentCard = cards[currentIndex];

    const handleSwipe = (direction: 'left' | 'right') => {
        if (direction === 'right' && currentCard) {
            // Simulate match (50% chance for demo)
            if (Math.random() > 0.5) {
                const match: Match = {
                    id: Date.now().toString(),
                    user: currentCard,
                    matchedAt: new Date()
                };
                setTimeout(() => onMatch(match), 300);
            }
        }

        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            if (currentIndex >= cards.length - 2) {
                // Load more cards (in real app, fetch from API)
                setCards(prev => [...prev, ...mockUsers]);
            }
        }, 300);
    };

    if (!currentCard) {
        return (
            <div className="swipe-screen">
                <div className="main-header">
                    <div className="logo-small">
                        <PalDeckLogoSimple size={40} />
                    </div>
                    <h1>PalDeck</h1>
                    <div style={{ width: '44px' }}></div>
                </div>
                <div className="no-more-cards">
                    <div className="no-cards-icon">🎉</div>
                    <h2>You're all caught up!</h2>
                    <p>Check back later for more people to connect with</p>
                </div>
            </div>
        );
    }

    return (
        <div className="swipe-screen">
            <div className="main-header">
                <div className="logo-small">
                    <PalDeckLogoSimple size={40} />
                </div>
                <h1>PalDeck</h1>
                <div style={{ width: '44px' }}></div>
            </div>

            <div className="swipe-container">
                <div className="cards-stack">
                    {cards.slice(currentIndex, currentIndex + 3).map((card, index) => (
                        <SwipeableCard
                            key={card.id}
                            card={card}
                            isTop={index === 0}
                            onSwipe={handleSwipe}
                            style={{
                                zIndex: 3 - index,
                                scale: 1 - index * 0.05,
                                y: index * 10
                            }}
                        />
                    ))}
                </div>

                <div className="swipe-actions">
                    <motion.button
                        className="action-btn action-pass"
                        onClick={() => handleSwipe('left')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </motion.button>

                    <motion.button
                        className="action-btn action-like"
                        onClick={() => handleSwipe('right')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

interface SwipeableCardProps {
    card: SwipeCard;
    isTop: boolean;
    onSwipe: (direction: 'left' | 'right') => void;
    style: any;
}

const SwipeableCard = ({ card, isTop, onSwipe, style }: SwipeableCardProps) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (_: any, info: any) => {
        if (Math.abs(info.offset.x) > 100) {
            onSwipe(info.offset.x > 0 ? 'right' : 'left');
        }
    };

    return (
        <motion.div
            className="swipe-card"
            style={{
                x: isTop ? x : 0,
                rotate: isTop ? rotate : 0,
                opacity: isTop ? opacity : 1,
                ...style
            }}
            drag={isTop ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: 'grabbing' }}
        >
            <div className="card-image" style={{ backgroundImage: `url(${card.photo})` }}>
                <div className="card-gradient"></div>
            </div>
            <div className="card-info">
                <div className="card-header">
                    <h2>{card.name}, {card.age}</h2>
                    <span className="distance">📍 {(card.distance! / 1000).toFixed(0)}km away</span>
                </div>
                <p className="location">{card.location}</p>
                <p className="bio">{card.bio}</p>
                <div className="interests">
                    {card.interests.slice(0, 5).map((interest, idx) => (
                        <span key={idx} className="interest-tag">{interest}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default SwipeScreen;

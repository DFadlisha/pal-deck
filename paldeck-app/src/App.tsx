import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen.tsx';
import OnboardingScreen from './components/OnboardingScreen.tsx';
import ProfileSetup from './components/ProfileSetup.tsx';
import SwipeScreen from './components/SwipeScreen.tsx';
import MatchesScreen from './components/MatchesScreen.tsx';
import ChatListScreen from './components/ChatListScreen.tsx';
import ChatScreen from './components/ChatScreen.tsx';
import ProfileScreen from './components/ProfileScreen.tsx';
import BottomNav from './components/BottomNav.tsx';
import MatchModal from './components/MatchModal.tsx';
import type { UserProfile, Match } from './types.ts';
import './App.css';

type Screen = 'splash' | 'onboarding' | 'profile-setup' | 'swipe' | 'matches' | 'chat-list' | 'chat' | 'profile';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [currentChatUser, setCurrentChatUser] = useState<Match | null>(null);

  useEffect(() => {
    // Simulate splash screen loading
    const timer = setTimeout(() => {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
        setCurrentScreen('swipe');
      } else {
        setCurrentScreen('onboarding');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleProfileSave = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setCurrentScreen('swipe');
  };

  const handleMatch = (match: Match) => {
    setMatches(prev => [...prev, match]);
    setCurrentMatch(match);
    setShowMatchModal(true);
  };

  const handleOpenChat = (match: Match) => {
    setCurrentChatUser(match);
    setCurrentScreen('chat');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen onGetStarted={() => setCurrentScreen('profile-setup')} />;
      case 'profile-setup':
        return (
          <ProfileSetup
            onSave={handleProfileSave}
            onBack={() => setCurrentScreen('onboarding')}
            existingProfile={userProfile}
          />
        );
      case 'swipe':
        return <SwipeScreen onMatch={handleMatch} />;
      case 'matches':
        return <MatchesScreen matches={matches} onChatClick={handleOpenChat} />;
      case 'chat-list':
        return <ChatListScreen matches={matches} onChatClick={handleOpenChat} />;
      case 'chat':
        return (
          <ChatScreen
            user={currentChatUser}
            onBack={() => setCurrentScreen('chat-list')}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            profile={userProfile}
            onEdit={() => setCurrentScreen('profile-setup')}
          />
        );
      default:
        return <SplashScreen />;
    }
  };

  const showBottomNav = ['swipe', 'matches', 'chat-list', 'profile'].includes(currentScreen);

  return (
    <div className="app">
      <div style={{ color: 'red', fontSize: '50px', position: 'fixed', top: 0, left: 0, zIndex: 9999, background: 'yellow' }}>
        HELLO WORLD
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="screen-container"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {showBottomNav && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          matchCount={matches.length}
          unreadCount={2}
        />
      )}

      <MatchModal
        isOpen={showMatchModal}
        match={currentMatch}
        onClose={() => setShowMatchModal(false)}
        onSendMessage={() => {
          setShowMatchModal(false);
          if (currentMatch) {
            handleOpenChat(currentMatch);
          }
        }}
      />
    </div>
  );
}

export default App;

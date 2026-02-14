import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Path, Circle } from 'react-native-svg';

import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import SwipeScreen from './src/screens/SwipeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import ChatScreen from './src/screens/ChatScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import VoiceChatScreen from './src/screens/VoiceChatScreen';
import MatchModal from './src/components/MatchModal';
import IncomingCallModal from './src/components/IncomingCallModal';
import { AuthProvider } from './src/contexts/AuthContext';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from './src/theme';
import type { UserProfile, Match } from './src/types';

const Tab = createBottomTabNavigator();

// Custom dark theme for navigation
const DarkNavTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.bgPrimary,
    card: Colors.bgTertiary,
    text: Colors.textPrimary,
    border: Colors.borderSolid,
    notification: Colors.danger,
  },
};

type AppScreen = 'splash' | 'onboarding' | 'profile-setup' | 'main' | 'chat' | 'voice-chat';

// Icon components for tab bar
const DiscoverIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Svg>
);

const MatchesIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Svg>
);

const ChatsIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Svg>
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx={12} cy={7} r={4} />
  </Svg>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [currentChatUser, setCurrentChatUser] = useState<Match | null>(null);
  const [voiceCallUser, setVoiceCallUser] = useState<Match | null>(null);
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [incomingCaller, setIncomingCaller] = useState<Match | null>(null);

  const handleSplashFinish = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
        setCurrentScreen('main');
      } else {
        setCurrentScreen('onboarding');
      }
    } catch {
      setCurrentScreen('onboarding');
    }
  };

  const handleProfileSave = async (profile: UserProfile) => {
    setUserProfile(profile);
    await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    setCurrentScreen('main');
  };

  const handleMatch = (match: Match) => {
    setMatches((prev) => [...prev, match]);
    setCurrentMatch(match);
    setShowMatchModal(true);
  };

  const handleOpenChat = (match: Match) => {
    setCurrentChatUser(match);
    setCurrentScreen('chat');
  };

  const handleStartVoiceCall = (match: Match) => {
    setVoiceCallUser(match);
    setCurrentScreen('voice-chat');
  };

  const handleEndVoiceCall = () => {
    setVoiceCallUser(null);
    // Go back to the previous screen (chat or main)
    if (currentChatUser) {
      setCurrentScreen('chat');
    } else {
      setCurrentScreen('main');
    }
  };

  // Simulate incoming call after matching (for demo)
  const handleSimulateIncomingCall = (match: Match) => {
    // Simulate a delay for incoming call
    setTimeout(() => {
      setIncomingCaller(match);
      setShowIncomingCall(true);
    }, 8000); // 8 seconds after match
  };

  const handleAcceptIncomingCall = () => {
    setShowIncomingCall(false);
    if (incomingCaller) {
      setVoiceCallUser(incomingCaller);
      setCurrentScreen('voice-chat');
    }
  };

  const handleDeclineIncomingCall = () => {
    setShowIncomingCall(false);
    setIncomingCaller(null);
  };

  // Render pre-main screens
  if (currentScreen === 'splash') {
    return (
      <>
        <StatusBar style="light" />
        <SplashScreen onFinish={handleSplashFinish} />
      </>
    );
  }

  if (currentScreen === 'onboarding') {
    return (
      <>
        <StatusBar style="light" />
        <OnboardingScreen onGetStarted={() => setCurrentScreen('profile-setup')} />
      </>
    );
  }

  if (currentScreen === 'profile-setup') {
    return (
      <>
        <StatusBar style="light" />
        <ProfileSetupScreen
          onSave={handleProfileSave}
          onBack={() => setCurrentScreen('onboarding')}
          existingProfile={userProfile}
        />
      </>
    );
  }

  if (currentScreen === 'voice-chat') {
    return (
      <>
        <StatusBar style="light" />
        <VoiceChatScreen
          match={voiceCallUser}
          onEnd={handleEndVoiceCall}
        />
      </>
    );
  }

  if (currentScreen === 'chat') {
    return (
      <>
        <StatusBar style="light" />
        <ChatScreen
          user={currentChatUser}
          onBack={() => setCurrentScreen('main')}
          onVoiceCall={handleStartVoiceCall}
        />
        <IncomingCallModal
          isVisible={showIncomingCall}
          caller={incomingCaller}
          onAccept={handleAcceptIncomingCall}
          onDecline={handleDeclineIncomingCall}
        />
      </>
    );
  }

  // Main app with bottom tabs
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={DarkNavTheme}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: Colors.bgTertiary,
              borderTopColor: Colors.borderSolid,
              borderTopWidth: 1,
              height: 80,
              paddingTop: 8,
              paddingBottom: 20,
            },
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textTertiary,
            tabBarLabelStyle: {
              fontSize: FontSize.sm,
              fontWeight: FontWeight.semibold,
            },
          }}
        >
          <Tab.Screen
            name="Discover"
            options={{
              tabBarIcon: ({ color, size }) => <DiscoverIcon color={color} size={size} />,
            }}
          >
            {() => <SwipeScreen onMatch={(match) => {
              handleMatch(match);
              handleSimulateIncomingCall(match);
            }} />}
          </Tab.Screen>

          <Tab.Screen
            name="Matches"
            options={{
              tabBarIcon: ({ color, size }) => <MatchesIcon color={color} size={size} />,
              tabBarBadge: matches.length > 0 ? matches.length : undefined,
            }}
          >
            {() => <MatchesScreen matches={matches} onChatClick={handleOpenChat} />}
          </Tab.Screen>

          <Tab.Screen
            name="Chats"
            options={{
              tabBarIcon: ({ color, size }) => <ChatsIcon color={color} size={size} />,
            }}
          >
            {() => <ChatListScreen matches={matches} onChatClick={handleOpenChat} />}
          </Tab.Screen>

          <Tab.Screen
            name="Profile"
            options={{
              tabBarIcon: ({ color, size }) => <ProfileIcon color={color} size={size} />,
            }}
          >
            {() => (
              <ProfileScreen
                profile={userProfile}
                onEdit={() => setCurrentScreen('profile-setup')}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>

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
        onVoiceCall={() => {
          setShowMatchModal(false);
          if (currentMatch) {
            handleStartVoiceCall(currentMatch);
          }
        }}
      />

      <IncomingCallModal
        isVisible={showIncomingCall}
        caller={incomingCaller}
        onAccept={handleAcceptIncomingCall}
        onDecline={handleDeclineIncomingCall}
      />
    </AuthProvider>
  );
}

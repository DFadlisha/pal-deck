# PalDeck - Complete Setup Guide 🚀

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Supabase Setup](#supabase-setup)
5. [Running Locally](#running-locally)
6. [Mobile App (Capacitor)](#mobile-app-capacitor)
7. [Deployment](#deployment)
8. [Features](#features)

---

## Project Overview

**PalDeck** is a modern friend-finding mobile application built with:
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Mobile**: Capacitor (iOS & Android)
- **Animations**: Framer Motion
- **Deployment**: Native iOS and Android via Capacitor

---

## Prerequisites

- Node.js 18+ and npm
- Git
- Supabase account (free tier works)
- For mobile: Android Studio (Android) or Xcode (iOS)

---

## Installation

```bash
# Clone the repository
cd paldeck-app

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

---

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for database to provision

### 2. Run Database Schema

1. Open Supabase Dashboard → SQL Editor
2. Copy contents from `supabase/schema.sql`
3. Run the SQL script
4. Verify tables are created in Table Editor

### 3. Get API Credentials

1. Go to Project Settings → API
2. Copy `Project URL` and `anon public` key
3. Add to `.env` file:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Configure Authentication

1. Go to Authentication → Providers
2. Enable Email provider
3. (Optional) Enable Google, Facebook, etc.
4. Configure email templates in Email Templates

### 5. Enable Realtime

1. Go to Database → Replication
2. Enable replication for `messages` table
3. This enables real-time chat

---

## Running Locally

```bash
# Development server
npm run dev

# Open browser to http://localhost:5173
```

### First Time Setup Flow:
1. App loads with splash screen
2. Onboarding screen appears
3. Create account (email + password)
4. Set up profile (name, age, location, bio, interests)
5. Start swiping!

---

---

## 📱 Mobile App (Capacitor)

PalDeck is designed as a native mobile application. Web builds are used solely for development and as the foundation for native bundles.

---

## Features

### ✅ Implemented

- **Authentication**: Email/password signup and login
- **Profile Management**: Create and edit profiles
- **Swipe Interface**: Drag-to-swipe cards with animations
- **Matching System**: Mutual likes create matches
- **Real-time Chat**: WebSocket-based messaging
- **Filters**: Age range, distance, interests
- **Notifications**: Browser and in-app notifications
- **Mobile Ready**: Capacitor for iOS/Android
- **Responsive Design**: Mobile-first approach

### 🎯 Core Functionality

1. **Swipe Cards**
   - Drag left to pass
   - Drag right to like
   - Buttons for quick actions
   - Smooth animations

2. **Matching**
   - Mutual likes create instant match
   - Match celebration modal
   - View all matches

3. **Chat**
   - Real-time messaging
   - Read receipts
   - Online status
   - Message history

4. **Filters**
   - Age range slider
   - Maximum distance
   - Interest matching
   - Apply/reset filters

5. **Notifications**
   - New match alerts
   - New message alerts
   - Browser notifications
   - In-app notification center

---

## Project Structure

```
paldeck-app/
├── src/
│   ├── components/          # React components
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── ProfileSetup.tsx
│   │   ├── SwipeScreen.tsx
│   │   ├── MatchesScreen.tsx
│   │   ├── ChatListScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── BottomNav.tsx
│   │   ├── MatchModal.tsx
│   │   └── FiltersModal.tsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx
│   ├── services/            # Business logic
│   │   ├── supabaseService.ts
│   │   └── notificationService.ts
│   ├── lib/                 # Libraries
│   │   └── supabase.ts
│   ├── types.ts             # TypeScript types
│   ├── App.tsx              # Main app
│   └── main.tsx             # Entry point
├── supabase/
│   └── schema.sql           # Database schema
├── capacitor.config.ts      # Capacitor config
├── .env.example             # Environment template
└── README.md                # This file
```

---

## Database Schema

### Tables

1. **profiles** - User profiles
2. **swipes** - Swipe history
3. **matches** - Matched users
4. **messages** - Chat messages

### Security

- Row Level Security (RLS) enabled
- Users can only access their own data
- Secure real-time subscriptions

---

## Troubleshooting

### Supabase Connection Issues

```bash
# Check environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Restart dev server
npm run dev
```

### Mobile Build Issues

```bash
# Clean and rebuild
npm run build
npx cap sync

# Clear cache
rm -rf node_modules
npm install
```

### Real-time Not Working

1. Check Supabase Replication settings
2. Verify `messages` table is replicated
3. Check browser console for errors

---

## Next Steps

### Recommended Enhancements

1. **Photo Upload**
   - Integrate Supabase Storage
   - Image compression
   - Multiple photos per profile

2. **Location Services**
   - Geolocation API
   - Distance calculation
   - Location-based filtering

3. **Push Notifications**
   - Firebase Cloud Messaging
   - Background notifications
   - Notification preferences

4. **Advanced Features**
   - Video chat
   - Voice messages
   - Group chats
   - Events/meetups

5. **Analytics**
   - User engagement tracking
   - Match rate analytics
   - A/B testing

---

## Support

For issues or questions:
1. Check Supabase documentation
2. Review Capacitor docs
3. Check browser console for errors

---

## License

MIT License - Free to use and modify

---

Built with ❤️ using React, TypeScript, Supabase, and Capacitor

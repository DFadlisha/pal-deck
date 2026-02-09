# PalDeck - Complete Setup Guide 🚀

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [PocketBase Setup](#pocketbase-setup)
5. [Running Locally](#running-locally)
6. [Mobile App (Capacitor)](#mobile-app-capacitor)
7. [Features](#features)

---

## Project Overview

**PalDeck** is a modern friend-finding mobile application built with:
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: PocketBase (SQLite + Auth + Realtime)
- **Mobile**: Capacitor (iOS & Android)
- **Animations**: Framer Motion
- **Deployment**: Native iOS and Android via Capacitor

---

## Prerequisites

- Node.js 18+ and npm
- Git
- PocketBase (Single binary executable)
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

## PocketBase Setup

### 1. Download PocketBase

1. Go to [pocketbase.io](https://pocketbase.io/docs/)
2. Download the binary for your OS.
3. Extract it to a folder (e.g., `pocketbase/`).

### 2. Start PocketBase

```bash
# In your pocketbase folder
./pocketbase serve
```

### 3. Create Collections

Open the Admin UI at `http://127.0.0.1:8090/_/` and create an admin account.

Create the following collections:

1. **profiles**
   - `user_id`: Relation (users)
   - `name`: Text
   - `age`: Number
   - `location`: Text
   - `bio`: Text
   - `interests`: JSON (Array of strings)
   - `photos`: JSON (Array of strings)

2. **swipes**
   - `swiper`: Relation (profiles)
   - `swiped`: Relation (profiles)
   - `direction`: Select (left, right)

3. **matches**
   - `user1`: Relation (profiles)
   - `user2`: Relation (profiles)
   - `status`: Select (pending, matched, rejected)

4. **messages**
   - `match`: Relation (matches)
   - `sender`: Relation (profiles)
   - `text`: Text
   - `read`: Bool

### 4. API Credentials

Add to your `.env` file:

```env
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

---

## Running Locally

```bash
# Start Vite development server
npm run dev

# Open browser to http://localhost:5173
```

---

## 📱 Mobile App (Capacitor)

PalDeck is designed as a native mobile application. Web builds are used solely for development and as the foundation for native bundles.

---

## Features

### ✅ Implemented

- **Authentication**: Email/password signup and login via PocketBase Auth
- **Profile Management**: CRUD operations for user profiles
- **Swipe Interface**: Native touch-optimized swipe cards
- **Matching System**: Real-time match detection
- **Real-time Chat**: Native PocketBase subscriptions for instant messaging
- **Mobile Ready**: Capacitor integration for iOS/Android

---

## Project Structure

```
paldeck-app/
├── src/
│   ├── components/          # React components
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx
│   ├── services/            # Business logic
│   │   └── pocketbaseService.ts
│   ├── lib/                 # Libraries
│   │   └── pocketbase.ts
│   ├── types.ts             # TypeScript types
│   ├── App.tsx              # Main app
│   └── main.tsx             # Entry point
├── capacitor.config.ts      # Capacitor config
├── .env.example             # Environment template
└── README.md                # This file
```

---

## Troubleshooting

### PocketBase Connection Issues

```bash
# Check if PocketBase is running
curl http://127.0.0.1:8090/api/health

# Restart dev server
npm run dev
```

---

## License

MIT License - Free to use and modify

---

Built with ❤️ using React, TypeScript, PocketBase, and Capacitor

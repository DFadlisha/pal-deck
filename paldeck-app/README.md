# PalDeck - Find Friends Worldwide 🌍

A modern **mobile application** designed for making friends worldwide through an intuitive swipe-based interface. Built for iOS and Android.

## 📱 Mobile Experience
✨ **Swipe-to-Friend**: Swipe right to connect, left to pass.
💬 **Real-time Messaging**: Instant chat with mutual matches.
🎯 **Interest Matching**: Connect with people who share your passions.
📱 **Native Feel**: Optimized for mobile gestures and touch interactions.
🎨 **Aesthetic Design**: Cool pastel dark mode for a premium feel.

## 🛠 Tech Stack
- **Frontend**: React 19 + TypeScript
- **Mobile Foundation**: [Capacitor](https://capacitorjs.com/) (iOS & Android)
- **Backend/Database**: [Supabase](https://supabase.com/) (Postgres + Auth + Real-time)
- **Animations**: Framer Motion
- **Gestures**: @use-gesture/react

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18+
- **Android Development**: Android Studio + SDK
- **iOS Development**: Xcode (macOS only)

### Initial Setup
```bash
# Install dependencies
npm install

# Initialize environment
cp .env.example .env
# Add your Supabase URL and Anon Key to .env
```

### Mobile Development Workflow
```bash
# 1. Build the web assets
npm run build

# 2. Sync to mobile platforms
npx cap sync

# 3. Open in native IDEs
npx cap open android
npx cap open ios
```

## 📁 Project Structure
```
paldeck-app/
├── android/              # Native Android project
├── ios/                  # Native iOS project
├── src/
│   ├── components/       # Mobile UI components
│   ├── services/         # Supabase & Notification logic
│   └── contexts/         # Authentication state
├── supabase/             # Database schema & migrations
└── capacitor.config.ts   # Mobile app configuration
```

## 🔐 Backend (Supabase)
Detailed instructions for setting up your database schema and authentication can be found in `SETUP.md`.

## 📱 Release Process
To generate a production build for the App Store or Google Play:
1. Run `npm run build`
2. Run `npx cap sync`
3. Use Android Studio (Build > Generate Signed APK) or Xcode (Product > Archive) to create your release packages.

---
Built exclusively for mobile using React, Supabase, and Capacitor.

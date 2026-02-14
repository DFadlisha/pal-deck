# PalDeck - React Native (Expo) 📱

Friend discovery app built with React Native + Expo, migrated from the Vite+Capacitor web app.

## ✅ Features

- 🎨 **Beautiful pastel dark mode** UI matching original design
- 👆 **Native swipe gestures** using PanResponder
- 💬 **Real-time chat** with PocketBase
- 🔐 **Auth system** with persistent login
- 📱 **Bottom tab navigation** (Discover, Matches, Chats, Profile)
- 🎯 **Interest matching** and profile setup
- 💙 **Match modal** with spring animations

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start Expo dev server
npx expo start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios
```

## 📁 Project Structure

```
paldeck-rn/
├── App.tsx                      # Main entry: navigation + screen routing
├── src/
│   ├── theme.ts                 # Design system (colors, spacing, shadows)
│   ├── types.ts                 # TypeScript interfaces
│   ├── components/
│   │   ├── Logo.tsx             # SVG logo components
│   │   └── MatchModal.tsx       # Match celebration modal
│   ├── contexts/
│   │   └── AuthContext.tsx      # Global auth state
│   ├── lib/
│   │   └── pocketbase.ts       # PocketBase client + AsyncStorage auth
│   ├── screens/
│   │   ├── SplashScreen.tsx     # Animated splash
│   │   ├── OnboardingScreen.tsx # Feature showcase + get started
│   │   ├── ProfileSetupScreen.tsx # Profile form with interests
│   │   ├── SwipeScreen.tsx      # Core swipe card interface
│   │   ├── MatchesScreen.tsx    # Grid of matched users
│   │   ├── ChatListScreen.tsx   # Conversation list
│   │   ├── ChatScreen.tsx       # Individual chat
│   │   └── ProfileScreen.tsx    # User profile view
│   └── services/
│       └── pocketbaseService.ts # All API services
├── app.json                     # Expo configuration
└── package.json
```

## 🔧 PocketBase Setup

1. Download PocketBase from [pocketbase.io](https://pocketbase.io)
2. Run `./pocketbase serve`
3. The app connects to `http://10.0.2.2:8090` (Android emulator → localhost)
4. For physical device, update the URL in `src/lib/pocketbase.ts`

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo` | React Native framework |
| `@react-navigation/native` | Navigation system |
| `@react-navigation/bottom-tabs` | Bottom tab bar |
| `react-native-gesture-handler` | Touch gestures |
| `react-native-reanimated` | Smooth animations |
| `react-native-svg` | SVG rendering |
| `react-native-screens` | Native screen containers |
| `pocketbase` | Backend SDK |
| `@react-native-async-storage/async-storage` | Local data persistence |
| `expo-linear-gradient` | Gradient backgrounds |

## 🔄 Migration Notes (from Vite+Capacitor)

| Web Version | React Native Version |
|-------------|---------------------|
| CSS files | StyleSheet.create() |
| framer-motion | Animated API + PanResponder |
| localStorage | AsyncStorage |
| react-dom | react-native components |
| HTML div/button/input | View, TouchableOpacity, TextInput |
| CSS gradients | expo-linear-gradient |
| SVG in JSX | react-native-svg |
| import.meta.env | app.json extras |

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.paldeck.app',
  appName: 'PalDeck',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    cleartext: true,
  }
};

export default config;

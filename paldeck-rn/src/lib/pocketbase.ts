import PocketBase from 'pocketbase';
import AsyncStorage from '@react-native-async-storage/async-storage';

// PocketBase instance
const pbUrl = 'http://10.0.2.2:8090'; // Android emulator -> localhost

export const pb = new PocketBase(pbUrl);

// Use AsyncStorage for auth persistence on React Native
pb.authStore.onChange(async () => {
    try {
        if (pb.authStore.isValid) {
            await AsyncStorage.setItem('pb_auth', JSON.stringify({
                token: pb.authStore.token,
                record: pb.authStore.record,
            }));
        } else {
            await AsyncStorage.removeItem('pb_auth');
        }
    } catch (e) {
        console.error('Failed to persist auth:', e);
    }
});

// Restore auth from AsyncStorage on app start
export const restoreAuth = async () => {
    try {
        const stored = await AsyncStorage.getItem('pb_auth');
        if (stored) {
            const { token, record } = JSON.parse(stored);
            pb.authStore.save(token, record);
        }
    } catch (e) {
        console.error('Failed to restore auth:', e);
    }
};

// Collection Names
export const Collections = {
    Profiles: 'profiles',
    Matches: 'matches',
    Messages: 'messages',
    Swipes: 'swipes',
};

export interface ProfileRecord {
    id: string;
    user_id: string;
    name: string;
    age: number;
    location: string;
    bio: string;
    interests: string[];
    photos: string[];
    created: string;
    updated: string;
}

export interface MatchRecord {
    id: string;
    user1: string;
    user2: string;
    status: 'pending' | 'matched' | 'rejected';
    created: string;
    updated: string;
}

export interface MessageRecord {
    id: string;
    match: string;
    sender: string;
    text: string;
    read: boolean;
    created: string;
}

export interface SwipeRecord {
    id: string;
    swiper: string;
    swiped: string;
    direction: 'left' | 'right';
    created: string;
}

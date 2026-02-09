import PocketBase from 'pocketbase';

// PocketBase instance - default local address
const pbUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

export const pb = new PocketBase(pbUrl);

// Collection Names
export const Collections = {
    Profiles: 'profiles',
    Matches: 'matches',
    Messages: 'messages',
    Swipes: 'swipes'
};

// Types for PocketBase Record Models
export interface ProfileRecord {
    id: string;
    user_id: string; // Foreign key to Auth record
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
    user1: string; // ID of profile 1
    user2: string; // ID of profile 2
    status: 'pending' | 'matched' | 'rejected';
    created: string;
    updated: string;
}

export interface MessageRecord {
    id: string;
    match: string; // ID of match
    sender: string; // ID of profile
    text: string;
    read: boolean;
    created: string;
}

export interface SwipeRecord {
    id: string;
    swiper: string; // ID of profile
    swiped: string; // ID of profile
    direction: 'left' | 'right';
    created: string;
}

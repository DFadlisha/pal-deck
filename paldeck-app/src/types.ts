export interface UserProfile {
    id: string;
    name: string;
    age: number;
    location: string;
    bio: string;
    interests: string[];
    photo?: string;
    photos?: string[];
}

export interface Match {
    id: string;
    user: UserProfile;
    matchedAt: Date;
    lastMessage?: ChatMessage;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    text: string;
    timestamp: Date;
    read: boolean;
}

export interface SwipeCard extends UserProfile {
    distance?: number;
}

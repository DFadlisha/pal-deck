import { pb, Collections } from '../lib/pocketbase';
import type { UserProfile } from '../types';

export const authService = {
    async signUp(email: string, password: string) {
        try {
            const data = await pb.collection('users').create({
                email,
                password,
                passwordConfirm: password,
            });
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error };
        }
    },

    async signIn(email: string, password: string) {
        try {
            const data = await pb.collection('users').authWithPassword(email, password);
            return { data: data.record, error: null };
        } catch (error: any) {
            return { data: null, error };
        }
    },

    async signOut() {
        pb.authStore.clear();
        return { error: null };
    },

    async getCurrentUser() {
        return pb.authStore.record;
    },

    onAuthStateChange(callback: (user: any) => void) {
        return pb.authStore.onChange((_token, record) => {
            callback(record);
        }, true);
    },
};

export const profileService = {
    async createProfile(profile: Omit<UserProfile, 'id'>) {
        try {
            const user = await authService.getCurrentUser();
            if (!user) throw new Error('Not authenticated');

            const data = await pb.collection(Collections.Profiles).create({
                user_id: user.id,
                name: profile.name,
                age: profile.age,
                location: profile.location,
                bio: profile.bio,
                interests: profile.interests,
                photos: profile.photos || [],
            });

            return { data, error: null };
        } catch (error: any) {
            return { data: null, error };
        }
    },

    async getProfile(userId: string) {
        try {
            const data = await pb.collection(Collections.Profiles).getFirstListItem(`user_id="${userId}"`);
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error };
        }
    },

    async updateProfile(userId: string, updates: Partial<UserProfile>) {
        try {
            const profile = await this.getProfile(userId);
            if (!profile.data) throw new Error('Profile not found');

            const data = await pb.collection(Collections.Profiles).update(profile.data.id, updates);
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error };
        }
    },

    async getPotentialMatches(userId: string, limit = 10) {
        try {
            const data = await pb.collection(Collections.Profiles).getList(1, limit, {
                filter: `user_id != "${userId}"`,
            });
            return { data: data.items, error: null };
        } catch (error: any) {
            return { data: null, error };
        }
    },
};

export const swipeService = {
    async recordSwipe(swiperId: string, swipedId: string, direction: 'left' | 'right') {
        try {
            const data = await pb.collection(Collections.Swipes).create({
                swiper: swiperId,
                swiped: swipedId,
                direction,
            });

            if (direction === 'right') {
                const match = await this.checkForMatch(swiperId, swipedId);
                return { data, error: null, match: match.data };
            }

            return { data, error: null, match: null };
        } catch (error: any) {
            return { data: null, error, match: null };
        }
    },

    async checkForMatch(userId1: string, userId2: string) {
        try {
            const reverseSwipe = await pb.collection(Collections.Swipes).getFirstListItem(
                `swiper="${userId2}" && swiped="${userId1}" && direction="right"`
            );

            if (reverseSwipe) {
                const match = await pb.collection(Collections.Matches).create({
                    user1: userId1,
                    user2: userId2,
                    status: 'matched',
                });
                return { data: match, error: null };
            }
            return { data: null, error: null };
        } catch (error: any) {
            return { data: null, error };
        }
    },
};

export const matchService = {
    async getMatches(userId: string) {
        try {
            const data = await pb.collection(Collections.Matches).getFullList({
                filter: `(user1="${userId}" || user2="${userId}") && status="matched"`,
                expand: 'user1,user2',
            });
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error };
        }
    },
};

export const messageService = {
    async sendMessage(matchId: string, senderId: string, text: string) {
        try {
            const data = await pb.collection(Collections.Messages).create({
                match: matchId,
                sender: senderId,
                text,
                read: false,
            });
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error };
        }
    },

    async getMessages(matchId: string) {
        try {
            const data = await pb.collection(Collections.Messages).getFullList({
                filter: `match="${matchId}"`,
                sort: 'created',
            });
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error };
        }
    },

    async markAsRead(matchId: string, userId: string) {
        try {
            const unread = await pb.collection(Collections.Messages).getFullList({
                filter: `match="${matchId}" && sender!="${userId}" && read=false`,
            });

            for (const msg of unread) {
                await pb.collection(Collections.Messages).update(msg.id, { read: true });
            }
            return { error: null };
        } catch (error: any) {
            return { error };
        }
    },

    subscribeToMessages(matchId: string, callback: (message: any) => void) {
        pb.collection(Collections.Messages).subscribe('*', (e) => {
            if (e.action === 'create' && e.record.match === matchId) {
                callback(e.record);
            }
        });
        return () => pb.collection(Collections.Messages).unsubscribe(matchId);
    },
};

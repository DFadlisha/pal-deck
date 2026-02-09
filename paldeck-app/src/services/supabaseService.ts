import { supabase } from '../lib/supabase';
import type { UserProfile } from '../types';

export const authService = {
    // Sign up new user
    async signUp(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        return { data, error };
    },

    // Sign in user
    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    // Sign out
    async signOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    // Get current user
    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },

    // Listen to auth changes
    onAuthStateChange(callback: (user: any) => void) {
        return supabase.auth.onAuthStateChange((_event, session) => {
            callback(session?.user ?? null);
        });
    },
};

export const profileService = {
    // Create profile
    async createProfile(profile: Omit<UserProfile, 'id'>) {
        const user = await authService.getCurrentUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await supabase
            .from('profiles')
            .insert({
                user_id: user.id,
                name: profile.name,
                age: profile.age,
                location: profile.location,
                bio: profile.bio,
                interests: profile.interests,
                photos: profile.photos || [],
            })
            .select()
            .single();

        return { data, error };
    },

    // Get profile by user ID
    async getProfile(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId)
            .single();

        return { data, error };
    },

    // Update profile
    async updateProfile(userId: string, updates: Partial<UserProfile>) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('user_id', userId)
            .select()
            .single();

        return { data, error };
    },

    // Get potential matches (users not yet swiped)
    async getPotentialMatches(userId: string, limit = 10) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .neq('user_id', userId)
            .limit(limit);

        return { data, error };
    },
};

export const swipeService = {
    // Record a swipe
    async recordSwipe(swiperId: string, swipedId: string, direction: 'left' | 'right') {
        const { data, error } = await supabase
            .from('swipes')
            .insert({
                swiper_id: swiperId,
                swiped_id: swipedId,
                direction,
            })
            .select()
            .single();

        // Check for match if swipe was right
        if (direction === 'right' && !error) {
            const match = await swipeService.checkForMatch(swiperId, swipedId);
            return { data, error, match };
        }

        return { data, error, match: null };
    },

    // Check if there's a mutual match
    async checkForMatch(userId1: string, userId2: string) {
        const { data, error } = await supabase
            .from('swipes')
            .select('*')
            .eq('swiper_id', userId2)
            .eq('swiped_id', userId1)
            .eq('direction', 'right')
            .single();

        if (data && !error) {
            // Create match
            const { data: matchData, error: matchError } = await supabase
                .from('matches')
                .insert({
                    user_id_1: userId1,
                    user_id_2: userId2,
                    status: 'matched',
                })
                .select()
                .single();

            return { data: matchData, error: matchError };
        }

        return { data: null, error };
    },
};

export const matchService = {
    // Get all matches for a user
    async getMatches(userId: string) {
        const { data, error } = await supabase
            .from('matches')
            .select(`
        *,
        profile1:profiles!matches_user_id_1_fkey(*),
        profile2:profiles!matches_user_id_2_fkey(*)
      `)
            .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`)
            .eq('status', 'matched');

        return { data, error };
    },
};

export const messageService = {
    // Send a message
    async sendMessage(matchId: string, senderId: string, text: string) {
        const { data, error } = await supabase
            .from('messages')
            .insert({
                match_id: matchId,
                sender_id: senderId,
                text,
                read: false,
            })
            .select()
            .single();

        return { data, error };
    },

    // Get messages for a match
    async getMessages(matchId: string) {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('match_id', matchId)
            .order('created_at', { ascending: true });

        return { data, error };
    },

    // Mark messages as read
    async markAsRead(matchId: string, userId: string) {
        const { error } = await supabase
            .from('messages')
            .update({ read: true })
            .eq('match_id', matchId)
            .neq('sender_id', userId);

        return { error };
    },

    // Subscribe to new messages
    subscribeToMessages(matchId: string, callback: (message: any) => void) {
        return supabase
            .channel(`messages:${matchId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `match_id=eq.${matchId}`,
                },
                (payload) => {
                    callback(payload.new);
                }
            )
            .subscribe();
    },
};

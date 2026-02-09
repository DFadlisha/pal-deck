import { createClient } from '@supabase/supabase-js';

// Environment variables - these should be in .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    user_id: string;
                    name: string;
                    age: number;
                    location: string;
                    bio: string;
                    interests: string[];
                    photos: string[];
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
            };
            matches: {
                Row: {
                    id: string;
                    user_id_1: string;
                    user_id_2: string;
                    matched_at: string;
                    status: 'pending' | 'matched' | 'rejected';
                };
                Insert: Omit<Database['public']['Tables']['matches']['Row'], 'id' | 'matched_at'>;
                Update: Partial<Database['public']['Tables']['matches']['Insert']>;
            };
            messages: {
                Row: {
                    id: string;
                    match_id: string;
                    sender_id: string;
                    text: string;
                    read: boolean;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>;
                Update: Partial<Database['public']['Tables']['messages']['Insert']>;
            };
            swipes: {
                Row: {
                    id: string;
                    swiper_id: string;
                    swiped_id: string;
                    direction: 'left' | 'right';
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['swipes']['Row'], 'id' | 'created_at'>;
                Update: Partial<Database['public']['Tables']['swipes']['Insert']>;
            };
        };
    };
}

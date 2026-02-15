import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../theme';
import type { UserProfile } from '../types';

interface ProfileSetupProps {
    onSave: (profile: UserProfile) => void;
    onBack: () => void;
    existingProfile: UserProfile | null;
}

const interestsList = [
    'Gaming', 'Music', 'Art', 'Travel', 'Photography', 'Fitness',
    'Cooking', 'Reading', 'Movies', 'Sports', 'Technology', 'Fashion',
    'Dancing', 'Hiking', 'Yoga', 'Coffee', 'Anime', 'K-pop',
    'Languages', 'Food', 'Blogging', 'Wine', 'Startups', 'Coding',
];

const ProfileSetupScreen = ({ onSave, onBack, existingProfile }: ProfileSetupProps) => {
    const [name, setName] = useState(existingProfile?.name || '');
    const [age, setAge] = useState(existingProfile?.age?.toString() || '18');
    const [location, setLocation] = useState(existingProfile?.location || '');
    const [bio, setBio] = useState(existingProfile?.bio || '');
    const [selectedInterests, setSelectedInterests] = useState<string[]>(
        existingProfile?.interests || []
    );

    const toggleInterest = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSubmit = () => {
        const ageNum = Number(age);
        if (name && age && location && bio && selectedInterests.length >= 3) {
            if (ageNum < 18) {
                Alert.alert('Restriction', 'You must be at least 18 years old to use PalDeck.');
                return;
            }
            const profile: UserProfile = {
                id: existingProfile?.id || Date.now().toString(),
                name,
                age: ageNum,
                location,
                bio,
                interests: selectedInterests,
                photo: `https://i.pravatar.cc/400?img=${Math.floor(Math.random() * 70)}`,
            };
            onSave(profile);
        } else {
            Alert.alert('Incomplete', 'Please fill all fields and select at least 3 interests.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {existingProfile ? 'Edit Profile' : 'Create Your Profile'}
                </Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Name */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                        placeholderTextColor={Colors.textTertiary}
                        maxLength={50}
                    />
                </View>

                {/* Age */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={styles.input}
                        value={age}
                        onChangeText={setAge}
                        placeholder="18"
                        placeholderTextColor={Colors.textTertiary}
                        keyboardType="numeric"
                        maxLength={3}
                    />
                </View>

                {/* Location */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        style={styles.input}
                        value={location}
                        onChangeText={setLocation}
                        placeholder="City, Country"
                        placeholderTextColor={Colors.textTertiary}
                    />
                </View>

                {/* Bio */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Bio</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={bio}
                        onChangeText={setBio}
                        placeholder="Tell us about yourself..."
                        placeholderTextColor={Colors.textTertiary}
                        multiline
                        numberOfLines={4}
                        maxLength={300}
                        textAlignVertical="top"
                    />
                    <Text style={styles.charCount}>{bio.length}/300</Text>
                </View>

                {/* Interests */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Interests (Select at least 3)</Text>
                    <View style={styles.interestsGrid}>
                        {interestsList.map((interest) => (
                            <TouchableOpacity
                                key={interest}
                                style={[
                                    styles.interestChip,
                                    selectedInterests.includes(interest) && styles.interestChipSelected,
                                ]}
                                onPress={() => toggleInterest(interest)}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.interestText,
                                        selectedInterests.includes(interest) && styles.interestTextSelected,
                                    ]}
                                >
                                    {interest}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Submit */}
                <TouchableOpacity activeOpacity={0.85} onPress={handleSubmit} style={styles.submitWrap}>
                    <LinearGradient
                        colors={[Colors.primaryGradientStart, Colors.primaryGradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.submitBtn}
                    >
                        <Text style={styles.submitText}>
                            {existingProfile ? 'Update Profile' : 'Continue'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgPrimary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.md,
        paddingTop: 50,
        paddingBottom: Spacing.sm,
        backgroundColor: Colors.bgSecondary,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderSolid,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.bgCardSolid,
        borderWidth: 1,
        borderColor: Colors.borderSolid,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backText: {
        color: Colors.textPrimary,
        fontSize: 20,
    },
    headerTitle: {
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.md,
        paddingBottom: 100,
    },
    formGroup: {
        marginBottom: Spacing.md,
    },
    label: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
    },
    input: {
        backgroundColor: Colors.bgCardSolid,
        borderWidth: 1,
        borderColor: Colors.borderSolid,
        borderRadius: BorderRadius.md,
        padding: Spacing.sm,
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
    },
    textArea: {
        minHeight: 100,
    },
    charCount: {
        color: Colors.textTertiary,
        fontSize: FontSize.sm,
        textAlign: 'right',
        marginTop: 4,
    },
    interestsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    interestChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.bgCardSolid,
        borderWidth: 1,
        borderColor: Colors.borderSolid,
    },
    interestChipSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    interestText: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        fontWeight: FontWeight.medium,
    },
    interestTextSelected: {
        color: Colors.white,
        fontWeight: FontWeight.bold,
    },
    submitWrap: {
        marginTop: Spacing.lg,
    },
    submitBtn: {
        paddingVertical: 16,
        borderRadius: BorderRadius.full,
        alignItems: 'center',
        ...Shadows.md,
    },
    submitText: {
        color: Colors.white,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
});

export default ProfileSetupScreen;

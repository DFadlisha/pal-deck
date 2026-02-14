import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../theme';
import type { UserProfile } from '../types';

interface ProfileScreenProps {
    profile: UserProfile | null;
    onEdit: () => void;
}

const ProfileScreen = ({ profile, onEdit }: ProfileScreenProps) => {
    if (!profile) return null;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <View style={styles.profileHeader}>
                <View style={styles.photoContainer}>
                    <Image source={{ uri: profile.photo }} style={styles.photo} />
                    <View style={styles.onlineDot} />
                </View>
                <Text style={styles.name}>{profile.name}, {profile.age}</Text>
                <Text style={styles.location}>📍 {profile.location}</Text>

                <TouchableOpacity style={styles.editBtn} onPress={onEdit} activeOpacity={0.7}>
                    <Text style={styles.editBtnText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <View style={styles.sectionCard}>
                    <Text style={styles.bioText}>{profile.bio}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Interests</Text>
                <View style={styles.interestsContainer}>
                    {profile.interests.map((interest, idx) => (
                        <View key={idx} style={styles.interestTag}>
                            <Text style={styles.interestText}>{interest}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgPrimary,
    },
    content: {
        paddingBottom: 100,
    },
    header: {
        paddingHorizontal: Spacing.md,
        paddingTop: 50,
        paddingBottom: Spacing.sm,
        backgroundColor: Colors.bgSecondary,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderSolid,
    },
    headerTitle: {
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: Spacing.lg,
    },
    photoContainer: {
        position: 'relative',
        marginBottom: Spacing.md,
    },
    photo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: Colors.primary,
    },
    onlineDot: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.success,
        borderWidth: 3,
        borderColor: Colors.bgPrimary,
    },
    name: {
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.extrabold,
        color: Colors.textPrimary,
    },
    location: {
        fontSize: FontSize.lg,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    editBtn: {
        marginTop: Spacing.md,
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.bgCardSolid,
        borderWidth: 1,
        borderColor: Colors.borderSolid,
    },
    editBtnText: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.semibold,
    },
    section: {
        paddingHorizontal: Spacing.md,
        marginTop: Spacing.md,
    },
    sectionTitle: {
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    sectionCard: {
        backgroundColor: Colors.bgCardSolid,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.borderSolid,
    },
    bioText: {
        fontSize: FontSize.lg,
        color: Colors.textSecondary,
        lineHeight: 24,
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    interestTag: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: BorderRadius.full,
    },
    interestText: {
        fontSize: FontSize.md,
        color: Colors.white,
        fontWeight: FontWeight.semibold,
    },
});

export default ProfileScreen;

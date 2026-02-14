import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../theme';
import type { Match } from '../types';

interface MatchesScreenProps {
    matches: Match[];
    onChatClick: (match: Match) => void;
}

const MatchesScreen = ({ matches, onChatClick }: MatchesScreenProps) => {
    if (matches.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Matches</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>💫</Text>
                    <Text style={styles.emptyTitle}>No matches yet</Text>
                    <Text style={styles.emptyText}>Start swiping to find your new friends!</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Your Matches</Text>
            </View>
            <FlatList
                data={matches}
                numColumns={2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.grid}
                columnWrapperStyle={styles.gridRow}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.matchCard}
                        onPress={() => onChatClick(item)}
                        activeOpacity={0.8}
                    >
                        <Image source={{ uri: item.user.photo }} style={styles.matchPhoto} />
                        <View style={styles.matchInfo}>
                            <Text style={styles.matchName} numberOfLines={1}>{item.user.name}</Text>
                            <Text style={styles.matchMeta} numberOfLines={1}>
                                {item.user.age} • {item.user.location.split(',')[0]}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgPrimary,
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
    grid: {
        padding: Spacing.sm,
    },
    gridRow: {
        gap: Spacing.sm,
    },
    matchCard: {
        flex: 1,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        backgroundColor: Colors.bgCardSolid,
        borderWidth: 1,
        borderColor: Colors.borderSolid,
        marginBottom: Spacing.sm,
        ...Shadows.sm,
    },
    matchPhoto: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    matchInfo: {
        padding: Spacing.sm,
    },
    matchName: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
    },
    matchMeta: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    emptyIcon: {
        fontSize: 60,
        marginBottom: Spacing.md,
    },
    emptyTitle: {
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    emptyText: {
        fontSize: FontSize.lg,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
});

export default MatchesScreen;

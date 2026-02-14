import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../theme';
import type { Match } from '../types';

interface ChatListScreenProps {
    matches: Match[];
    onChatClick: (match: Match) => void;
}

const ChatListScreen = ({ matches, onChatClick }: ChatListScreenProps) => {
    if (matches.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Messages</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>💬</Text>
                    <Text style={styles.emptyTitle}>No conversations yet</Text>
                    <Text style={styles.emptyText}>Start chatting with your matches!</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Messages</Text>
            </View>
            <FlatList
                data={matches}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.chatItem}
                        onPress={() => onChatClick(item)}
                        activeOpacity={0.7}
                    >
                        <Image
                            source={{ uri: item.user.photo }}
                            style={styles.avatar}
                        />
                        <View style={styles.chatInfo}>
                            <Text style={styles.chatName}>{item.user.name}</Text>
                            <Text style={styles.chatPreview}>Start a conversation...</Text>
                        </View>
                        <Text style={styles.chatTime}>Now</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    list: {
        padding: Spacing.sm,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.xs,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: Spacing.sm,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    chatInfo: {
        flex: 1,
    },
    chatName: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
    },
    chatPreview: {
        fontSize: FontSize.md,
        color: Colors.textTertiary,
        marginTop: 2,
    },
    chatTime: {
        fontSize: FontSize.sm,
        color: Colors.textTertiary,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.borderSolid,
        marginLeft: 72,
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

export default ChatListScreen;

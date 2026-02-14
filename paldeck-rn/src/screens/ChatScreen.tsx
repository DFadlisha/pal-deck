import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../theme';
import type { Match } from '../types';

interface ChatScreenProps {
    user: Match | null;
    onBack: () => void;
    onVoiceCall?: (match: Match) => void;
}

interface Message {
    id: string;
    text: string;
    sent: boolean;
}

const PhoneCallIcon = ({ color, size }: { color: string; size: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Svg>
);

const ChatScreen = ({ user, onBack, onVoiceCall }: ChatScreenProps) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const flatListRef = useRef<FlatList>(null);

    const sendMessage = () => {
        if (message.trim()) {
            const newMsg = { id: Date.now().toString(), text: message.trim(), sent: true };
            setMessages((prev) => [...prev, newMsg]);
            setMessage('');
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    if (!user) return null;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={0}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <Image source={{ uri: user.user.photo }} style={styles.headerAvatar} />
                    <View>
                        <Text style={styles.headerName}>{user.user.name}</Text>
                        <Text style={styles.onlineStatus}>Online</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.voiceCallBtn}
                    onPress={() => onVoiceCall?.(user)}
                    activeOpacity={0.7}
                >
                    <PhoneCallIcon color={Colors.success} size={20} />
                </TouchableOpacity>
            </View>

            {/* Messages */}
            {messages.length === 0 ? (
                <View style={styles.emptyChat}>
                    <Text style={styles.emptyChatText}>Say hi to {user.user.name}! 👋</Text>
                </View>
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.messagesList}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                styles.messageBubbleWrap,
                                item.sent ? styles.sentWrap : styles.receivedWrap,
                            ]}
                        >
                            <View
                                style={[
                                    styles.messageBubble,
                                    item.sent ? styles.sentBubble : styles.receivedBubble,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.messageText,
                                        item.sent ? styles.sentText : styles.receivedText,
                                    ]}
                                >
                                    {item.text}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            )}

            {/* Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message..."
                    placeholderTextColor={Colors.textTertiary}
                    onSubmitEditing={sendMessage}
                    returnKeyType="send"
                />
                <TouchableOpacity style={styles.sendBtn} onPress={sendMessage} activeOpacity={0.7}>
                    <Text style={styles.sendIcon}>➤</Text>
                </TouchableOpacity>
            </View>
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
        paddingHorizontal: Spacing.sm,
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
    voiceCallBtn: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.full,
        backgroundColor: 'rgba(168, 230, 207, 0.12)',
        borderWidth: 1,
        borderColor: 'rgba(168, 230, 207, 0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    headerName: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
    },
    onlineStatus: {
        fontSize: FontSize.xs,
        color: Colors.success,
        fontWeight: FontWeight.medium,
    },
    emptyChat: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyChatText: {
        fontSize: FontSize.lg,
        color: Colors.textSecondary,
    },
    messagesList: {
        padding: Spacing.sm,
        paddingBottom: Spacing.md,
    },
    messageBubbleWrap: {
        marginBottom: 8,
    },
    sentWrap: {
        alignItems: 'flex-end',
    },
    receivedWrap: {
        alignItems: 'flex-start',
    },
    messageBubble: {
        maxWidth: '75%',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    sentBubble: {
        backgroundColor: Colors.primary,
        borderBottomRightRadius: 4,
    },
    receivedBubble: {
        backgroundColor: Colors.bgCardSolid,
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: FontSize.lg,
        lineHeight: 22,
    },
    sentText: {
        color: Colors.white,
    },
    receivedText: {
        color: Colors.textPrimary,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.sm,
        backgroundColor: Colors.bgSecondary,
        borderTopWidth: 1,
        borderTopColor: Colors.borderSolid,
        gap: 10,
    },
    input: {
        flex: 1,
        backgroundColor: Colors.bgCardSolid,
        borderRadius: BorderRadius.full,
        paddingHorizontal: 20,
        paddingVertical: 12,
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        borderWidth: 1,
        borderColor: Colors.borderSolid,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.sm,
    },
    sendIcon: {
        fontSize: 20,
        color: Colors.white,
    },
});

export default ChatScreen;

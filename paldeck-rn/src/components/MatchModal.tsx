import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../theme';
import type { Match } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PhoneCallIcon = ({ color, size }: { color: string; size: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Svg>
);

interface MatchModalProps {
    isOpen: boolean;
    match: Match | null;
    onClose: () => void;
    onSendMessage: () => void;
    onVoiceCall?: () => void;
}

const MatchModal = ({ isOpen, match, onClose, onSendMessage, onVoiceCall }: MatchModalProps) => {
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const heartScale = useRef(new Animated.Value(0)).current;
    const titleY = useRef(new Animated.Value(-20)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isOpen) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 60,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            Animated.sequence([
                Animated.delay(200),
                Animated.parallel([
                    Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                    Animated.timing(titleY, { toValue: 0, duration: 400, useNativeDriver: true }),
                ]),
            ]).start();

            Animated.sequence([
                Animated.delay(300),
                Animated.spring(heartScale, {
                    toValue: 1,
                    tension: 60,
                    friction: 5,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            scaleAnim.setValue(0.8);
            opacityAnim.setValue(0);
            heartScale.setValue(0);
            titleY.setValue(-20);
            titleOpacity.setValue(0);
        }
    }, [isOpen]);

    if (!match) return null;

    return (
        <Modal transparent visible={isOpen} animationType="none" onRequestClose={onClose}>
            <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
                <TouchableOpacity style={styles.overlayTouch} onPress={onClose} activeOpacity={1} />
                <Animated.View
                    style={[
                        styles.modal,
                        {
                            transform: [{ scale: scaleAnim }],
                            opacity: opacityAnim,
                        },
                    ]}
                >
                    <Animated.Text
                        style={[
                            styles.title,
                            { opacity: titleOpacity, transform: [{ translateY: titleY }] },
                        ]}
                    >
                        New Pal Found! 🎉
                    </Animated.Text>

                    <View style={styles.avatarsRow}>
                        <Image source={{ uri: match.user.photo }} style={styles.matchAvatar} />
                        <Animated.View style={[styles.heartBadge, { transform: [{ scale: heartScale }] }]}>
                            <Text style={styles.heartEmoji}>🤝</Text>
                        </Animated.View>
                        <View style={styles.youAvatar}>
                            <Text style={styles.youText}>You</Text>
                        </View>
                    </View>

                    <Text style={styles.subtitle}>
                        You and {match.user.name} want to be friends!
                    </Text>

                    <View style={styles.actions}>
                        <TouchableOpacity activeOpacity={0.85} onPress={onSendMessage}>
                            <LinearGradient
                                colors={[Colors.primaryGradientStart, Colors.primaryGradientEnd]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.primaryBtn}
                            >
                                <Text style={styles.primaryBtnText}>Send Message</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.85} onPress={onVoiceCall}>
                            <LinearGradient
                                colors={[Colors.successGradientStart, '#5cb85c']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.primaryBtn}
                            >
                                <View style={styles.voiceCallRow}>
                                    <PhoneCallIcon color={Colors.white} size={18} />
                                    <Text style={styles.primaryBtnText}>Voice Call</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.secondaryBtn} onPress={onClose} activeOpacity={0.7}>
                            <Text style={styles.secondaryBtnText}>Keep Swiping</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayTouch: {
        ...StyleSheet.absoluteFillObject,
    },
    modal: {
        backgroundColor: Colors.bgSecondary,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        width: SCREEN_WIDTH - 60,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.borderSolid,
        ...Shadows.lg,
    },
    title: {
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.extrabold,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    avatarsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: Spacing.md,
    },
    matchAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: Colors.primary,
    },
    heartBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.bgTertiary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heartEmoji: {
        fontSize: 24,
    },
    youAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.bgCardSolid,
        borderWidth: 3,
        borderColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    youText: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: Colors.textSecondary,
    },
    subtitle: {
        fontSize: FontSize.lg,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.lg,
    },
    actions: {
        width: '100%',
        gap: Spacing.sm,
    },
    primaryBtn: {
        paddingVertical: 14,
        borderRadius: BorderRadius.full,
        alignItems: 'center',
        ...Shadows.md,
    },
    primaryBtnText: {
        color: Colors.white,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    voiceCallRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    secondaryBtn: {
        paddingVertical: 14,
        borderRadius: BorderRadius.full,
        alignItems: 'center',
        backgroundColor: Colors.bgCardSolid,
        borderWidth: 1,
        borderColor: Colors.borderSolid,
    },
    secondaryBtnText: {
        color: Colors.textPrimary,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.semibold,
    },
});

export default MatchModal;

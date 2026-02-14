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
import Svg, { Path, Line } from 'react-native-svg';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../theme';
import type { Match } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface IncomingCallModalProps {
    isVisible: boolean;
    caller: Match | null;
    onAccept: () => void;
    onDecline: () => void;
}

const PhoneIcon = ({ color, size }: { color: string; size: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Svg>
);

const PhoneOffIcon = ({ color, size }: { color: string; size: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
        <Line x1={23} y1={1} x2={1} y2={23} />
    </Svg>
);

const IncomingCallModal = ({ isVisible, caller, onAccept, onDecline }: IncomingCallModalProps) => {
    const slideAnim = useRef(new Animated.Value(-100)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const avatarScale = useRef(new Animated.Value(0.8)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isVisible) {
            // Slide in
            Animated.parallel([
                Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
                Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
                Animated.spring(avatarScale, { toValue: 1, tension: 60, friction: 7, useNativeDriver: true }),
            ]).start();

            // Pulse avatar
            const pulse = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.08, duration: 800, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
                ])
            );
            pulse.start();

            // Phone shake animation
            const shake = Animated.loop(
                Animated.sequence([
                    Animated.timing(shakeAnim, { toValue: 8, duration: 80, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: -8, duration: 80, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: 6, duration: 80, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: -6, duration: 80, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
                    Animated.delay(2000),
                ])
            );
            shake.start();

            return () => {
                pulse.stop();
                shake.stop();
            };
        } else {
            slideAnim.setValue(-100);
            opacityAnim.setValue(0);
            avatarScale.setValue(0.8);
        }
    }, [isVisible]);

    if (!caller) return null;

    return (
        <Modal transparent visible={isVisible} animationType="none" onRequestClose={onDecline}>
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            opacity: opacityAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <LinearGradient
                        colors={['#2d1f4e', '#1a1230']}
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        {/* Caller info */}
                        <View style={styles.callerInfo}>
                            <Animated.View style={[styles.avatarWrap, { transform: [{ scale: pulseAnim }] }]}>
                                <Image source={{ uri: caller.user.photo }} style={styles.avatar} />
                            </Animated.View>
                            <Text style={styles.callerName}>{caller.user.name}</Text>
                            <View style={styles.callingRow}>
                                <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                                    <Text style={styles.phoneEmoji}>📞</Text>
                                </Animated.View>
                                <Text style={styles.callingText}>Incoming Voice Call...</Text>
                            </View>
                        </View>

                        {/* Action buttons */}
                        <View style={styles.actions}>
                            {/* Decline */}
                            <TouchableOpacity style={styles.actionBtn} onPress={onDecline} activeOpacity={0.8}>
                                <LinearGradient
                                    colors={['#ff4444', '#cc0000']}
                                    style={styles.actionCircle}
                                >
                                    <PhoneOffIcon color={Colors.white} size={26} />
                                </LinearGradient>
                                <Text style={styles.actionLabel}>Decline</Text>
                            </TouchableOpacity>

                            {/* Accept */}
                            <TouchableOpacity style={styles.actionBtn} onPress={onAccept} activeOpacity={0.8}>
                                <LinearGradient
                                    colors={[Colors.successGradientStart, '#5cb85c']}
                                    style={styles.actionCircle}
                                >
                                    <PhoneIcon color={Colors.white} size={26} />
                                </LinearGradient>
                                <Text style={[styles.actionLabel, { color: Colors.success }]}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: SCREEN_WIDTH - 40,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        ...Shadows.lg,
    },
    gradient: {
        padding: Spacing.lg,
        alignItems: 'center',
    },
    callerInfo: {
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    avatarWrap: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: Colors.primary,
        overflow: 'hidden',
        marginBottom: Spacing.sm,
        ...Shadows.glow,
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    callerName: {
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    callingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    phoneEmoji: {
        fontSize: 18,
    },
    callingText: {
        fontSize: FontSize.md,
        color: Colors.peach,
        fontWeight: FontWeight.medium,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 60,
    },
    actionBtn: {
        alignItems: 'center',
        gap: 8,
    },
    actionCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.md,
    },
    actionLabel: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        fontWeight: FontWeight.semibold,
    },
});

export default IncomingCallModal;

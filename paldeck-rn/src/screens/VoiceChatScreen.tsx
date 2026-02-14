import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line, Polygon, Rect } from 'react-native-svg';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../theme';
import type { Match } from '../types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type CallState = 'ringing' | 'connected' | 'ended';

interface VoiceChatScreenProps {
    match: Match | null;
    onEnd: () => void;
    isIncoming?: boolean;
}

// Icon Components
const MicIcon = ({ color, size, muted }: { color: string; size: number; muted?: boolean }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <Path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <Line x1={12} y1={19} x2={12} y2={23} />
        <Line x1={8} y1={23} x2={16} y2={23} />
        {muted && <Line x1={1} y1={1} x2={23} y2={23} stroke={Colors.danger} strokeWidth={2.5} />}
    </Svg>
);

const HeadphoneIcon = ({ color, size, deafened }: { color: string; size: number; deafened?: boolean }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <Path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        {deafened && <Line x1={1} y1={1} x2={23} y2={23} stroke={Colors.danger} strokeWidth={2.5} />}
    </Svg>
);

const SpeakerIcon = ({ color, size }: { color: string; size: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <Path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </Svg>
);

const PhoneOffIcon = ({ color, size }: { color: string; size: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
        <Line x1={23} y1={1} x2={1} y2={23} />
    </Svg>
);

const ScreenShareIcon = ({ color, size, active }: { color: string; size: number; active?: boolean }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Rect x={2} y={3} width={20} height={14} rx={2} ry={2} />
        <Line x1={8} y1={21} x2={16} y2={21} />
        <Line x1={12} y1={17} x2={12} y2={21} />
        {active && <Path d="M9 10l3-3 3 3M12 7v6" stroke={Colors.success} strokeWidth={2.5} />}
        {!active && <Path d="M8 10h8M8 13h5" />}
    </Svg>
);

const VoiceChatScreen = ({ match, onEnd, isIncoming = false }: VoiceChatScreenProps) => {
    const [callState, setCallState] = useState<CallState>(isIncoming ? 'ringing' : 'ringing');
    const [isMuted, setIsMuted] = useState(false);
    const [isDeafened, setIsDeafened] = useState(false);
    const [isSpeaker, setIsSpeaker] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [peerSpeaking, setPeerSpeaking] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [peerStreaming, setPeerStreaming] = useState(false);
    const streamPulse = useRef(new Animated.Value(0.6)).current;
    const streamBarAnims = useRef(
        Array.from({ length: 12 }, () => new Animated.Value(Math.random()))
    ).current;

    // Animations
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const pulse2Anim = useRef(new Animated.Value(1)).current;
    const pulse3Anim = useRef(new Animated.Value(1)).current;
    const ringOpacity = useRef(new Animated.Value(0)).current;
    const ring2Opacity = useRef(new Animated.Value(0)).current;
    const ring3Opacity = useRef(new Animated.Value(0)).current;
    const waveAnims = useRef([
        new Animated.Value(0.3),
        new Animated.Value(0.3),
        new Animated.Value(0.3),
        new Animated.Value(0.3),
        new Animated.Value(0.3),
    ]).current;
    const slideUpAnim = useRef(new Animated.Value(30)).current;
    const fadeInAnim = useRef(new Animated.Value(0)).current;
    const connectedScale = useRef(new Animated.Value(0.9)).current;
    const speakingGlow = useRef(new Animated.Value(0)).current;

    // Ringing pulse animation
    useEffect(() => {
        if (callState === 'ringing') {
            const createPulse = (anim: Animated.Value, opacityAnim: Animated.Value, delay: number) => {
                return Animated.loop(
                    Animated.sequence([
                        Animated.delay(delay),
                        Animated.parallel([
                            Animated.timing(anim, { toValue: 2.2, duration: 1800, useNativeDriver: true }),
                            Animated.timing(opacityAnim, {
                                toValue: 1,
                                duration: 200,
                                useNativeDriver: true,
                            }),
                        ]),
                        Animated.timing(opacityAnim, { toValue: 0, duration: 1600, useNativeDriver: true }),
                        Animated.timing(anim, { toValue: 1, duration: 0, useNativeDriver: true }),
                    ])
                );
            };

            const p1 = createPulse(pulseAnim, ringOpacity, 0);
            const p2 = createPulse(pulse2Anim, ring2Opacity, 600);
            const p3 = createPulse(pulse3Anim, ring3Opacity, 1200);
            p1.start();
            p2.start();
            p3.start();

            // Auto-connect after 3 seconds (simulated)
            const timer = setTimeout(() => {
                setCallState('connected');
                p1.stop();
                p2.stop();
                p3.stop();
                ringOpacity.setValue(0);
                ring2Opacity.setValue(0);
                ring3Opacity.setValue(0);
                pulseAnim.setValue(1);
                pulse2Anim.setValue(1);
                pulse3Anim.setValue(1);
            }, 3000);

            return () => {
                clearTimeout(timer);
                p1.stop();
                p2.stop();
                p3.stop();
            };
        }
    }, [callState]);

    // Connected state animations
    useEffect(() => {
        if (callState === 'connected') {
            Animated.parallel([
                Animated.timing(fadeInAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.timing(slideUpAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
                Animated.spring(connectedScale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
            ]).start();
        }
    }, [callState]);

    // Speaking indicator animation
    useEffect(() => {
        if (callState === 'connected') {
            // Simulate peer speaking randomly
            const interval = setInterval(() => {
                setPeerSpeaking(Math.random() > 0.4);
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [callState]);

    // Speaking glow animation
    useEffect(() => {
        if (peerSpeaking) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(speakingGlow, { toValue: 1, duration: 400, useNativeDriver: true }),
                    Animated.timing(speakingGlow, { toValue: 0.3, duration: 400, useNativeDriver: true }),
                ])
            ).start();
        } else {
            speakingGlow.setValue(0);
        }
    }, [peerSpeaking]);

    // Sound wave animation
    useEffect(() => {
        if (callState === 'connected') {
            const animations = waveAnims.map((anim, i) =>
                Animated.loop(
                    Animated.sequence([
                        Animated.delay(i * 120),
                        Animated.timing(anim, {
                            toValue: 0.8 + Math.random() * 0.2,
                            duration: 300 + Math.random() * 200,
                            useNativeDriver: true,
                        }),
                        Animated.timing(anim, {
                            toValue: 0.2 + Math.random() * 0.2,
                            duration: 300 + Math.random() * 200,
                            useNativeDriver: true,
                        }),
                    ])
                )
            );
            animations.forEach((a) => a.start());
            return () => animations.forEach((a) => a.stop());
        }
    }, [callState]);

    // Call duration timer
    useEffect(() => {
        if (callState === 'connected') {
            const interval = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [callState]);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEndCall = () => {
        setCallState('ended');
        setTimeout(onEnd, 500);
    };

    const handleToggleScreenShare = () => {
        setIsScreenSharing(!isScreenSharing);
    };

    // Simulate peer starting stream after 6 seconds
    useEffect(() => {
        if (callState === 'connected') {
            const timer = setTimeout(() => setPeerStreaming(true), 6000);
            return () => clearTimeout(timer);
        }
    }, [callState]);

    // Stream bar animation
    useEffect(() => {
        if (peerStreaming || isScreenSharing) {
            const anims = streamBarAnims.map((anim, i) =>
                Animated.loop(
                    Animated.sequence([
                        Animated.delay(i * 80),
                        Animated.timing(anim, { toValue: 0.3 + Math.random() * 0.7, duration: 400, useNativeDriver: true }),
                        Animated.timing(anim, { toValue: 0.1 + Math.random() * 0.3, duration: 400, useNativeDriver: true }),
                    ])
                )
            );
            anims.forEach(a => a.start());
            return () => anims.forEach(a => a.stop());
        }
    }, [peerStreaming, isScreenSharing]);

    // Stream pulse glow
    useEffect(() => {
        if (peerStreaming || isScreenSharing) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(streamPulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
                    Animated.timing(streamPulse, { toValue: 0.6, duration: 1200, useNativeDriver: true }),
                ])
            ).start();
        } else {
            streamPulse.setValue(0.6);
        }
    }, [peerStreaming, isScreenSharing]);

    if (!match) return null;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Background gradient */}
            <LinearGradient
                colors={['#1a1230', '#2d1f4e', '#1a1230']}
                style={styles.bgGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            {/* Decorative circles */}
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerPill}>
                    <View style={[styles.statusDot, callState === 'connected' ? styles.statusConnected : styles.statusRinging]} />
                    <Text style={styles.headerStatus}>
                        {callState === 'ringing' ? 'Calling...' : callState === 'connected' ? 'Voice Connected' : 'Call Ended'}
                    </Text>
                </View>
            </View>

            {/* Main content */}
            <View style={styles.mainContent}>
                {/* Stream Viewer Panel */}
                {callState === 'connected' && peerStreaming && (
                    <Animated.View style={[styles.streamPanel, { opacity: fadeInAnim }]}>
                        <LinearGradient
                            colors={['#0d0b14', '#1a1230', '#15102a']}
                            style={styles.streamGradient}
                        >
                            {/* Stream header */}
                            <View style={styles.streamHeader}>
                                <View style={styles.streamLiveBadge}>
                                    <View style={styles.liveDot} />
                                    <Text style={styles.liveText}>LIVE</Text>
                                </View>
                                <Text style={styles.streamTitle}>{match.user.name}'s Screen</Text>
                                <View style={styles.viewerBadge}>
                                    <Text style={styles.viewerText}>👁 2</Text>
                                </View>
                            </View>

                            {/* Simulated stream content */}
                            <View style={styles.streamContent}>
                                <View style={styles.streamBarsRow}>
                                    {streamBarAnims.map((anim, i) => (
                                        <Animated.View
                                            key={i}
                                            style={[
                                                styles.streamBar,
                                                {
                                                    transform: [{ scaleY: anim }],
                                                    backgroundColor: i % 3 === 0 ? Colors.primary
                                                        : i % 3 === 1 ? Colors.secondary : Colors.accent,
                                                    width: (SCREEN_WIDTH - 100) / 14,
                                                },
                                            ]}
                                        />
                                    ))}
                                </View>
                                <Animated.View style={[styles.streamOverlay, { opacity: streamPulse }]}>
                                    <ScreenShareIcon color={Colors.primary} size={36} active />
                                    <Text style={styles.streamOverlayText}>Screen is being shared</Text>
                                </Animated.View>
                            </View>

                            {/* Stream footer */}
                            <View style={styles.streamFooter}>
                                <Image source={{ uri: match.user.photo }} style={styles.streamAvatar} />
                                <View>
                                    <Text style={styles.streamUserName}>{match.user.name}</Text>
                                    <Text style={styles.streamDuration}>{formatDuration(callDuration)}</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </Animated.View>
                )}

                {/* Your stream indicator */}
                {callState === 'connected' && isScreenSharing && !peerStreaming && (
                    <Animated.View style={[styles.yourStreamBanner, { opacity: fadeInAnim }]}>
                        <LinearGradient
                            colors={['rgba(168,230,207,0.15)', 'rgba(168,230,207,0.05)']}
                            style={styles.yourStreamGradient}
                        >
                            <View style={styles.streamLiveBadge}>
                                <View style={styles.liveDot} />
                                <Text style={styles.liveText}>LIVE</Text>
                            </View>
                            <Text style={styles.yourStreamText}>You are sharing your screen</Text>
                            <TouchableOpacity
                                style={styles.stopShareBtn}
                                onPress={handleToggleScreenShare}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.stopShareText}>Stop</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </Animated.View>
                )}

                {/* User avatar with rings */}
                <View style={[styles.avatarSection, (peerStreaming && callState === 'connected') && { marginTop: 10 }]}>
                    {/* Pulse rings (ringing state) */}
                    {callState === 'ringing' && (
                        <>
                            <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulseAnim }], opacity: ringOpacity }]} />
                            <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulse2Anim }], opacity: ring2Opacity }]} />
                            <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulse3Anim }], opacity: ring3Opacity }]} />
                        </>
                    )}

                    {/* Speaking glow ring (connected state) */}
                    {callState === 'connected' && peerSpeaking && (
                        <Animated.View style={[styles.speakingRing, { opacity: speakingGlow }]} />
                    )}

                    <View style={[
                        styles.avatarContainer,
                        callState === 'connected' && peerSpeaking && styles.avatarSpeaking,
                        (peerStreaming && callState === 'connected') && { width: 80, height: 80, borderRadius: 40 },
                    ]}>
                        <Image source={{ uri: match.user.photo }} style={styles.avatar} />
                    </View>

                    <Text style={[styles.userName, peerStreaming && callState === 'connected' && { fontSize: FontSize.xl }]}>
                        {match.user.name}
                    </Text>
                    <Text style={styles.userMeta}>
                        {match.user.age} • {match.user.location?.split(',')[0]}
                    </Text>

                    {callState === 'ringing' && (
                        <Text style={styles.ringingText}>Ringing...</Text>
                    )}

                    {callState === 'connected' && (
                        <Animated.View style={[styles.connectedInfo, {
                            opacity: fadeInAnim,
                            transform: [{ translateY: slideUpAnim }, { scale: connectedScale }],
                        }]}>
                            <Text style={styles.durationText}>{formatDuration(callDuration)}</Text>

                            {/* Sound wave visualizer */}
                            {!peerStreaming && (
                                <View style={styles.waveContainer}>
                                    {waveAnims.map((anim, i) => (
                                        <Animated.View
                                            key={i}
                                            style={[
                                                styles.waveBar,
                                                {
                                                    transform: [{ scaleY: anim }],
                                                    backgroundColor: i % 2 === 0 ? Colors.primary : Colors.secondary,
                                                },
                                            ]}
                                        />
                                    ))}
                                </View>
                            )}
                        </Animated.View>
                    )}
                </View>
            </View>

            {/* Controls */}
            <View style={styles.controlsSection}>
                {callState === 'connected' && (
                    <Animated.View style={[styles.controlsRow, { opacity: fadeInAnim }]}>
                        {/* Mute */}
                        <TouchableOpacity
                            style={[styles.controlBtn, isMuted && styles.controlBtnActive]}
                            onPress={() => setIsMuted(!isMuted)}
                            activeOpacity={0.7}
                        >
                            <MicIcon color={isMuted ? Colors.danger : Colors.textPrimary} size={22} muted={isMuted} />
                            <Text style={[styles.controlLabel, isMuted && styles.controlLabelActive]}>
                                {isMuted ? 'Unmute' : 'Mute'}
                            </Text>
                        </TouchableOpacity>

                        {/* Deafen */}
                        <TouchableOpacity
                            style={[styles.controlBtn, isDeafened && styles.controlBtnActive]}
                            onPress={() => setIsDeafened(!isDeafened)}
                            activeOpacity={0.7}
                        >
                            <HeadphoneIcon color={isDeafened ? Colors.danger : Colors.textPrimary} size={22} deafened={isDeafened} />
                            <Text style={[styles.controlLabel, isDeafened && styles.controlLabelActive]}>
                                {isDeafened ? 'Undeafen' : 'Deafen'}
                            </Text>
                        </TouchableOpacity>

                        {/* Screen Share */}
                        <TouchableOpacity
                            style={[styles.controlBtn]}
                            onPress={handleToggleScreenShare}
                            activeOpacity={0.7}
                        >
                            <ScreenShareIcon
                                color={isScreenSharing ? Colors.success : Colors.textPrimary}
                                size={22}
                                active={isScreenSharing}
                            />
                            <Text style={[styles.controlLabel, isScreenSharing && { color: Colors.success }]}>
                                {isScreenSharing ? 'Stop' : 'Share'}
                            </Text>
                        </TouchableOpacity>

                        {/* Speaker */}
                        <TouchableOpacity
                            style={[styles.controlBtn, isSpeaker && styles.controlBtnActive]}
                            onPress={() => setIsSpeaker(!isSpeaker)}
                            activeOpacity={0.7}
                        >
                            <SpeakerIcon color={isSpeaker ? Colors.primary : Colors.textPrimary} size={22} />
                            <Text style={[styles.controlLabel, isSpeaker && { color: Colors.primary }]}>
                                Speaker
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {/* End Call Button */}
                <TouchableOpacity
                    style={styles.endCallBtn}
                    onPress={handleEndCall}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#ff4444', '#cc0000']}
                        style={styles.endCallGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <PhoneOffIcon color={Colors.white} size={28} />
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.endCallLabel}>End Call</Text>
            </View>
        </View>
    );
};

const AVATAR_SIZE = 140;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgPrimary,
    },
    bgGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    decorCircle1: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(184, 164, 232, 0.04)',
        top: -50,
        right: -80,
    },
    decorCircle2: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(212, 165, 216, 0.04)',
        bottom: 100,
        left: -80,
    },
    header: {
        paddingTop: 60,
        paddingBottom: Spacing.sm,
        alignItems: 'center',
    },
    headerPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: BorderRadius.full,
        gap: 8,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusConnected: {
        backgroundColor: Colors.success,
    },
    statusRinging: {
        backgroundColor: Colors.peach,
    },
    headerStatus: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.semibold,
        color: Colors.textPrimary,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarSection: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pulseRing: {
        position: 'absolute',
        width: AVATAR_SIZE + 40,
        height: AVATAR_SIZE + 40,
        borderRadius: (AVATAR_SIZE + 40) / 2,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    speakingRing: {
        position: 'absolute',
        width: AVATAR_SIZE + 20,
        height: AVATAR_SIZE + 20,
        borderRadius: (AVATAR_SIZE + 20) / 2,
        borderWidth: 3,
        borderColor: Colors.success,
        backgroundColor: 'rgba(168, 230, 207, 0.05)',
    },
    avatarContainer: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderWidth: 4,
        borderColor: Colors.primary,
        overflow: 'hidden',
        ...Shadows.glow,
    },
    avatarSpeaking: {
        borderColor: Colors.success,
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    userName: {
        marginTop: Spacing.md,
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
    },
    userMeta: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    ringingText: {
        marginTop: Spacing.sm,
        fontSize: FontSize.lg,
        color: Colors.peach,
        fontWeight: FontWeight.medium,
    },
    connectedInfo: {
        alignItems: 'center',
        marginTop: Spacing.sm,
    },
    durationText: {
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
        color: Colors.success,
        fontVariant: ['tabular-nums'],
    },
    waveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        height: 40,
        marginTop: Spacing.sm,
    },
    waveBar: {
        width: 4,
        height: 30,
        borderRadius: 2,
        backgroundColor: Colors.primary,
    },
    controlsSection: {
        paddingBottom: 50,
        alignItems: 'center',
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.lg,
        marginBottom: Spacing.lg,
    },
    controlBtn: {
        width: 70,
        alignItems: 'center',
        gap: 8,
    },
    controlBtnActive: {
        opacity: 1,
    },
    controlLabel: {
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
        fontWeight: FontWeight.medium,
    },
    controlLabelActive: {
        color: Colors.danger,
    },
    endCallBtn: {
        marginBottom: 8,
    },
    endCallGradient: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.md,
    },
    endCallLabel: {
        fontSize: FontSize.sm,
        color: Colors.textTertiary,
        fontWeight: FontWeight.medium,
    },
    // Stream styles
    streamPanel: {
        width: SCREEN_WIDTH - 32,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(184, 164, 232, 0.2)',
        ...Shadows.lg,
    },
    streamGradient: {
        padding: 0,
    },
    streamHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.06)',
    },
    streamLiveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,68,68,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
        gap: 5,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ff4444',
    },
    liveText: {
        fontSize: FontSize.xs,
        fontWeight: FontWeight.bold,
        color: '#ff4444',
    },
    streamTitle: {
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semibold,
        color: Colors.textPrimary,
        flex: 1,
        textAlign: 'center',
    },
    viewerBadge: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
    },
    viewerText: {
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
    },
    streamContent: {
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    streamBarsRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 3,
        height: 80,
        position: 'absolute',
        bottom: 30,
    },
    streamBar: {
        height: 70,
        borderRadius: 3,
        opacity: 0.7,
    },
    streamOverlay: {
        alignItems: 'center',
        gap: 8,
    },
    streamOverlayText: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        fontWeight: FontWeight.medium,
    },
    streamFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.06)',
    },
    streamAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    streamUserName: {
        fontSize: FontSize.sm,
        fontWeight: FontWeight.semibold,
        color: Colors.textPrimary,
    },
    streamDuration: {
        fontSize: FontSize.xs,
        color: Colors.textTertiary,
    },
    yourStreamBanner: {
        width: SCREEN_WIDTH - 32,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        marginBottom: Spacing.sm,
    },
    yourStreamGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
        gap: 10,
    },
    yourStreamText: {
        flex: 1,
        fontSize: FontSize.sm,
        color: Colors.success,
        fontWeight: FontWeight.medium,
    },
    stopShareBtn: {
        backgroundColor: 'rgba(255,68,68,0.2)',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: 'rgba(255,68,68,0.3)',
    },
    stopShareText: {
        fontSize: FontSize.sm,
        fontWeight: FontWeight.bold,
        color: '#ff4444',
    },
});

export default VoiceChatScreen;

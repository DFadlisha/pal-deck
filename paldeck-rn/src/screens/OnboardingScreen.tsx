import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PalDeckLogoPastel } from '../components/Logo';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../theme';

interface OnboardingScreenProps {
    onGetStarted: () => void;
}

const features = [
    { icon: '🌍', title: 'Global Community', desc: 'Meet people from all around the world' },
    { icon: '💬', title: 'Instant Chat', desc: 'Start conversations with your matches' },
    { icon: '🎯', title: 'Interest Matching', desc: 'Find friends with similar hobbies' },
];

const OnboardingScreen = ({ onGetStarted }: OnboardingScreenProps) => {
    const logoScale = useRef(new Animated.Value(0)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleY = useRef(new Animated.Value(20)).current;
    const descOpacity = useRef(new Animated.Value(0)).current;
    const featuresOpacity = useRef(new Animated.Value(0)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;
    const buttonY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.spring(logoScale, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
        }).start();

        Animated.sequence([
            Animated.delay(200),
            Animated.parallel([
                Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.timing(titleY, { toValue: 0, duration: 500, useNativeDriver: true }),
            ]),
        ]).start();

        Animated.sequence([
            Animated.delay(300),
            Animated.timing(descOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        ]).start();

        Animated.sequence([
            Animated.delay(400),
            Animated.timing(featuresOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        ]).start();

        Animated.sequence([
            Animated.delay(600),
            Animated.parallel([
                Animated.timing(buttonOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.timing(buttonY, { toValue: 0, duration: 500, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Animated.View style={[styles.logoWrap, { transform: [{ scale: logoScale }] }]}>
                <PalDeckLogoPastel size={100} />
            </Animated.View>

            <Animated.Text
                style={[styles.title, { opacity: titleOpacity, transform: [{ translateY: titleY }] }]}
            >
                Welcome to PalDeck
            </Animated.Text>

            <Animated.Text style={[styles.description, { opacity: descOpacity }]}>
                Connect with amazing people worldwide. Swipe to find friends who share your interests and passions.
            </Animated.Text>

            <Animated.View style={[styles.features, { opacity: featuresOpacity }]}>
                {features.map((f, idx) => (
                    <View key={idx} style={styles.featureItem}>
                        <Text style={styles.featureIcon}>{f.icon}</Text>
                        <Text style={styles.featureTitle}>{f.title}</Text>
                        <Text style={styles.featureDesc}>{f.desc}</Text>
                    </View>
                ))}
            </Animated.View>

            <Animated.View style={{ opacity: buttonOpacity, transform: [{ translateY: buttonY }] }}>
                <TouchableOpacity activeOpacity={0.85} onPress={onGetStarted}>
                    <LinearGradient
                        colors={[Colors.primaryGradientStart, Colors.primaryGradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgPrimary,
    },
    contentContainer: {
        padding: Spacing.md,
        paddingTop: Spacing.xl + 20,
        alignItems: 'center',
    },
    logoWrap: {
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: 30,
        fontWeight: FontWeight.extrabold,
        color: Colors.primary,
        textAlign: 'center',
        letterSpacing: -1,
    },
    description: {
        fontSize: FontSize.xl,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 26,
        marginTop: Spacing.md,
        maxWidth: 320,
    },
    features: {
        width: '100%',
        marginTop: Spacing.xl,
        gap: Spacing.md,
    },
    featureItem: {
        backgroundColor: Colors.bgCardSolid,
        borderWidth: 1,
        borderColor: Colors.borderSolid,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        alignItems: 'center',
        ...Shadows.sm,
    },
    featureIcon: {
        fontSize: 40,
        marginBottom: Spacing.xs,
    },
    featureTitle: {
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    featureDesc: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: BorderRadius.full,
        marginTop: Spacing.xl,
        width: 280,
        alignItems: 'center',
        ...Shadows.md,
    },
    buttonText: {
        color: Colors.white,
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
    },
});

export default OnboardingScreen;

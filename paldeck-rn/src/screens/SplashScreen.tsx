import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PalDeckLogoPastel } from '../components/Logo';
import { Colors, FontSize, FontWeight, Spacing } from '../theme';

interface SplashScreenProps {
    onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
    const logoScale = useRef(new Animated.Value(0)).current;
    const logoRotate = useRef(new Animated.Value(-1)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleY = useRef(new Animated.Value(20)).current;
    const taglineOpacity = useRef(new Animated.Value(0)).current;
    const loaderOpacity = useRef(new Animated.Value(0)).current;
    const loaderX = useRef(new Animated.Value(-50)).current;
    const floatY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Logo spring animation
        Animated.spring(logoScale, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
        }).start();

        Animated.spring(logoRotate, {
            toValue: 0,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
        }).start();

        // Title fade in
        Animated.sequence([
            Animated.delay(300),
            Animated.parallel([
                Animated.timing(titleOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.timing(titleY, { toValue: 0, duration: 600, useNativeDriver: true }),
            ]),
        ]).start();

        // Tagline fade in
        Animated.sequence([
            Animated.delay(500),
            Animated.timing(taglineOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        ]).start();

        // Loader
        Animated.sequence([
            Animated.delay(700),
            Animated.timing(loaderOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        ]).start();

        // Loader bar animation
        Animated.loop(
            Animated.timing(loaderX, {
                toValue: 100,
                duration: 1500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            })
        ).start();

        // Float animation for logo
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatY, {
                    toValue: -15,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(floatY, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Auto navigate after 2.5s
        const timer = setTimeout(onFinish, 2500);
        return () => clearTimeout(timer);
    }, []);

    const spin = logoRotate.interpolate({
        inputRange: [-1, 0],
        outputRange: ['-180deg', '0deg'],
    });

    return (
        <LinearGradient
            colors={[Colors.primaryGradientStart, Colors.primaryGradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.content}>
                <Animated.View
                    style={[
                        styles.logoContainer,
                        {
                            transform: [
                                { scale: logoScale },
                                { rotate: spin },
                                { translateY: floatY },
                            ],
                        },
                    ]}
                >
                    <PalDeckLogoPastel size={120} />
                </Animated.View>

                <Animated.Text
                    style={[
                        styles.title,
                        { opacity: titleOpacity, transform: [{ translateY: titleY }] },
                    ]}
                >
                    PalDeck
                </Animated.Text>

                <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
                    Find friends worldwide
                </Animated.Text>

                <Animated.View style={[styles.loader, { opacity: loaderOpacity }]}>
                    <Animated.View
                        style={[
                            styles.loaderBar,
                            { transform: [{ translateX: loaderX }] },
                        ]}
                    />
                </Animated.View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: Spacing.md,
    },
    title: {
        fontSize: FontSize.hero,
        fontWeight: FontWeight.extrabold,
        color: Colors.white,
        letterSpacing: -1,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 12,
    },
    tagline: {
        fontSize: FontSize.xl,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: FontWeight.medium,
        marginTop: Spacing.xs,
    },
    loader: {
        width: 50,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 999,
        marginTop: Spacing.lg,
        overflow: 'hidden',
    },
    loaderBar: {
        width: 25,
        height: 4,
        backgroundColor: Colors.white,
        borderRadius: 999,
    },
});

export default SplashScreen;

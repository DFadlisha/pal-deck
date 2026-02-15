import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity,
    Animated, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { PalDeckLogoPastel } from '../components/Logo';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../theme';

interface LoginScreenProps {
    onLogin: (email: string, password: string) => Promise<void>;
    onGoogleLogin: () => Promise<void>;
    onGoToRegister: () => void;
    onSkip?: () => void;
}

const GoogleIcon = ({ size }: { size: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </Svg>
);

const LoginScreen = ({ onLogin, onGoogleLogin, onGoToRegister, onSkip }: LoginScreenProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const logoScale = useRef(new Animated.Value(0)).current;
    const formOpacity = useRef(new Animated.Value(0)).current;
    const formY = useRef(new Animated.Value(30)).current;
    const btnOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(logoScale, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }).start();
        Animated.sequence([
            Animated.delay(200),
            Animated.parallel([
                Animated.timing(formOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.timing(formY, { toValue: 0, duration: 500, useNativeDriver: true }),
            ]),
        ]).start();
        Animated.sequence([
            Animated.delay(400),
            Animated.timing(btnOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        ]).start();
    }, []);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            await onLogin(email.trim(), password);
        } catch (e: any) {
            Alert.alert('Login Failed', e?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        try {
            await onGoogleLogin();
        } catch (e: any) {
            Alert.alert('Google Sign-In', e?.message || 'Something went wrong');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <LinearGradient colors={['#1a1230', '#251e35', '#1a1625']} style={styles.bg} />
            <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                <Animated.View style={[styles.logoWrap, { transform: [{ scale: logoScale }] }]}>
                    <PalDeckLogoPastel size={80} />
                </Animated.View>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to find your pals on PalDeck</Text>

                <Animated.View style={[styles.form, { opacity: formOpacity, transform: [{ translateY: formY }] }]}>
                    {/* Google Button */}
                    <TouchableOpacity style={styles.googleBtn} onPress={handleGoogle} activeOpacity={0.8} disabled={googleLoading}>
                        {googleLoading ? (
                            <ActivityIndicator color={Colors.textPrimary} />
                        ) : (
                            <>
                                <GoogleIcon size={20} />
                                <Text style={styles.googleText}>Continue with Google</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Email */}
                    <View style={styles.inputWrap}>
                        <Text style={styles.inputLabel}>EMAIL</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="you@example.com"
                            placeholderTextColor={Colors.textTertiary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    {/* Password */}
                    <View style={styles.inputWrap}>
                        <Text style={styles.inputLabel}>PASSWORD</Text>
                        <View style={styles.passwordRow}>
                            <TextInput
                                style={[styles.input, styles.passwordInput]}
                                placeholder="••••••••"
                                placeholderTextColor={Colors.textTertiary}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
                                <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity activeOpacity={0.85} onPress={handleLogin} disabled={loading}>
                        <LinearGradient
                            colors={[Colors.primaryGradientStart, Colors.primaryGradientEnd]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            style={styles.loginBtn}
                        >
                            {loading ? (
                                <ActivityIndicator color={Colors.white} />
                            ) : (
                                <Text style={styles.loginBtnText}>Log In</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[styles.footer, { opacity: btnOpacity }]}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={onGoToRegister}>
                        <Text style={styles.footerLink}>Register</Text>
                    </TouchableOpacity>
                </Animated.View>

                {onSkip && (
                    <TouchableOpacity style={styles.skipBtn} onPress={onSkip}>
                        <Text style={styles.skipText}>Skip for now</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.bgPrimary },
    bg: { ...StyleSheet.absoluteFillObject },
    scroll: { padding: Spacing.md, paddingTop: 80, alignItems: 'center' },
    logoWrap: { marginBottom: Spacing.md },
    title: { fontSize: 28, fontWeight: FontWeight.extrabold, color: Colors.textPrimary, letterSpacing: -0.5 },
    subtitle: { fontSize: FontSize.lg, color: Colors.textSecondary, marginTop: 6, marginBottom: Spacing.lg },
    form: { width: '100%', gap: Spacing.sm },
    googleBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
        backgroundColor: Colors.bgCardSolid, borderWidth: 1, borderColor: Colors.borderSolid,
        borderRadius: BorderRadius.full, paddingVertical: 14, ...Shadows.sm,
    },
    googleText: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
    divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 4 },
    dividerLine: { flex: 1, height: 1, backgroundColor: Colors.borderSolid },
    dividerText: { fontSize: FontSize.sm, color: Colors.textTertiary, fontWeight: FontWeight.medium },
    inputWrap: { gap: 6 },
    inputLabel: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.textTertiary, letterSpacing: 1 },
    input: {
        backgroundColor: Colors.bgCardSolid, borderRadius: BorderRadius.md, paddingHorizontal: 16,
        paddingVertical: 14, color: Colors.textPrimary, fontSize: FontSize.lg,
        borderWidth: 1, borderColor: Colors.borderSolid,
    },
    passwordRow: { position: 'relative' },
    passwordInput: { paddingRight: 50 },
    eyeBtn: { position: 'absolute', right: 14, top: 12 },
    eyeText: { fontSize: 20 },
    loginBtn: {
        paddingVertical: 16, borderRadius: BorderRadius.full, alignItems: 'center',
        marginTop: Spacing.xs, ...Shadows.md,
    },
    loginBtnText: { color: Colors.white, fontSize: FontSize.xl, fontWeight: FontWeight.bold },
    footer: { flexDirection: 'row', marginTop: Spacing.lg, alignItems: 'center' },
    footerText: { fontSize: FontSize.md, color: Colors.textSecondary },
    footerLink: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary },
    skipBtn: { marginTop: Spacing.sm },
    skipText: { fontSize: FontSize.md, color: Colors.textTertiary, fontWeight: FontWeight.medium },
});

export default LoginScreen;

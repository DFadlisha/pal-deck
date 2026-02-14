import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity,
    Animated, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { PalDeckLogoPastel } from '../components/Logo';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../theme';

interface RegisterScreenProps {
    onRegister: (email: string, password: string) => Promise<void>;
    onGoogleRegister: () => Promise<void>;
    onGoToLogin: () => void;
}

const GoogleIcon = ({ size }: { size: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </Svg>
);

const CheckIcon = ({ checked }: { checked: boolean }) => (
    <View style={[rStyles.checkCircle, checked && rStyles.checkCircleActive]}>
        {checked && <Text style={rStyles.checkMark}>✓</Text>}
    </View>
);

const RegisterScreen = ({ onRegister, onGoogleRegister, onGoToLogin }: RegisterScreenProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const logoScale = useRef(new Animated.Value(0)).current;
    const formOpacity = useRef(new Animated.Value(0)).current;
    const formY = useRef(new Animated.Value(30)).current;
    const btnOpacity = useRef(new Animated.Value(0)).current;

    // Password strength
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

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

    const handleRegister = async () => {
        if (!email.trim() || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        if (!hasLength) {
            Alert.alert('Error', 'Password must be at least 8 characters');
            return;
        }
        setLoading(true);
        try {
            await onRegister(email.trim(), password);
        } catch (e: any) {
            Alert.alert('Registration Failed', e?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        try {
            await onGoogleRegister();
        } catch (e: any) {
            Alert.alert('Google Sign-Up', e?.message || 'Something went wrong');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={rStyles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <LinearGradient colors={['#1a1230', '#251e35', '#1a1625']} style={rStyles.bg} />
            <ScrollView contentContainerStyle={rStyles.scroll} keyboardShouldPersistTaps="handled">
                <Animated.View style={[rStyles.logoWrap, { transform: [{ scale: logoScale }] }]}>
                    <PalDeckLogoPastel size={70} />
                </Animated.View>
                <Text style={rStyles.title}>Create Account</Text>
                <Text style={rStyles.subtitle}>Join PalDeck and find your people</Text>

                <Animated.View style={[rStyles.form, { opacity: formOpacity, transform: [{ translateY: formY }] }]}>
                    {/* Google Button */}
                    <TouchableOpacity style={rStyles.googleBtn} onPress={handleGoogle} activeOpacity={0.8} disabled={googleLoading}>
                        {googleLoading ? (
                            <ActivityIndicator color={Colors.textPrimary} />
                        ) : (
                            <>
                                <GoogleIcon size={20} />
                                <Text style={rStyles.googleText}>Sign up with Google</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={rStyles.divider}>
                        <View style={rStyles.dividerLine} />
                        <Text style={rStyles.dividerText}>or sign up with email</Text>
                        <View style={rStyles.dividerLine} />
                    </View>

                    {/* Email */}
                    <View style={rStyles.inputWrap}>
                        <Text style={rStyles.inputLabel}>EMAIL</Text>
                        <TextInput
                            style={rStyles.input}
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
                    <View style={rStyles.inputWrap}>
                        <Text style={rStyles.inputLabel}>PASSWORD</Text>
                        <View style={rStyles.passwordRow}>
                            <TextInput
                                style={[rStyles.input, rStyles.passwordInput]}
                                placeholder="Create a strong password"
                                placeholderTextColor={Colors.textTertiary}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity style={rStyles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
                                <Text style={rStyles.eyeText}>{showPassword ? '🙈' : '👁'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Password strength */}
                    {password.length > 0 && (
                        <View style={rStyles.strengthWrap}>
                            <View style={rStyles.strengthItem}>
                                <CheckIcon checked={hasLength} />
                                <Text style={[rStyles.strengthText, hasLength && rStyles.strengthTextOk]}>8+ characters</Text>
                            </View>
                            <View style={rStyles.strengthItem}>
                                <CheckIcon checked={hasUpper} />
                                <Text style={[rStyles.strengthText, hasUpper && rStyles.strengthTextOk]}>Uppercase letter</Text>
                            </View>
                            <View style={rStyles.strengthItem}>
                                <CheckIcon checked={hasNumber} />
                                <Text style={[rStyles.strengthText, hasNumber && rStyles.strengthTextOk]}>Number</Text>
                            </View>
                        </View>
                    )}

                    {/* Confirm Password */}
                    <View style={rStyles.inputWrap}>
                        <Text style={rStyles.inputLabel}>CONFIRM PASSWORD</Text>
                        <TextInput
                            style={[rStyles.input, confirmPassword && password !== confirmPassword && rStyles.inputError]}
                            placeholder="Re-enter your password"
                            placeholderTextColor={Colors.textTertiary}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        {confirmPassword.length > 0 && password !== confirmPassword && (
                            <Text style={rStyles.errorText}>Passwords do not match</Text>
                        )}
                    </View>

                    {/* Register Button */}
                    <TouchableOpacity activeOpacity={0.85} onPress={handleRegister} disabled={loading}>
                        <LinearGradient
                            colors={[Colors.successGradientStart, '#5cb85c']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            style={rStyles.registerBtn}
                        >
                            {loading ? (
                                <ActivityIndicator color={Colors.white} />
                            ) : (
                                <Text style={rStyles.registerBtnText}>Create Account</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[rStyles.footer, { opacity: btnOpacity }]}>
                    <Text style={rStyles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={onGoToLogin}>
                        <Text style={rStyles.footerLink}>Log In</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Text style={rStyles.terms}>
                    By signing up, you agree to our Terms of Service and Privacy Policy
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const rStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.bgPrimary },
    bg: { ...StyleSheet.absoluteFillObject },
    scroll: { padding: Spacing.md, paddingTop: 60, alignItems: 'center', paddingBottom: 40 },
    logoWrap: { marginBottom: Spacing.sm },
    title: { fontSize: 28, fontWeight: FontWeight.extrabold, color: Colors.textPrimary, letterSpacing: -0.5 },
    subtitle: { fontSize: FontSize.lg, color: Colors.textSecondary, marginTop: 6, marginBottom: Spacing.md },
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
    inputError: { borderColor: Colors.danger },
    errorText: { fontSize: FontSize.xs, color: Colors.danger, marginTop: 2 },
    passwordRow: { position: 'relative' },
    passwordInput: { paddingRight: 50 },
    eyeBtn: { position: 'absolute', right: 14, top: 12 },
    eyeText: { fontSize: 20 },
    strengthWrap: { flexDirection: 'row', gap: 14, flexWrap: 'wrap' },
    strengthItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    strengthText: { fontSize: FontSize.xs, color: Colors.textTertiary },
    strengthTextOk: { color: Colors.success },
    checkCircle: {
        width: 16, height: 16, borderRadius: 8, borderWidth: 1.5,
        borderColor: Colors.textTertiary, alignItems: 'center', justifyContent: 'center',
    },
    checkCircleActive: { borderColor: Colors.success, backgroundColor: Colors.success },
    checkMark: { fontSize: 10, color: Colors.white, fontWeight: FontWeight.bold },
    registerBtn: {
        paddingVertical: 16, borderRadius: BorderRadius.full, alignItems: 'center',
        marginTop: Spacing.xs, ...Shadows.md,
    },
    registerBtnText: { color: Colors.white, fontSize: FontSize.xl, fontWeight: FontWeight.bold },
    footer: { flexDirection: 'row', marginTop: Spacing.lg, alignItems: 'center' },
    footerText: { fontSize: FontSize.md, color: Colors.textSecondary },
    footerLink: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary },
    terms: {
        fontSize: FontSize.xs, color: Colors.textTertiary, textAlign: 'center',
        marginTop: Spacing.sm, maxWidth: 260, lineHeight: 16,
    },
});

export default RegisterScreen;

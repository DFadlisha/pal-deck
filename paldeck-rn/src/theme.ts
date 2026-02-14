export const Colors = {
    // Pastel Solid Colors
    primary: '#b8a4e8',
    primaryDark: '#a594d8',
    secondary: '#d4a5d8',
    accent: '#ffc4e1',
    success: '#a8e6cf',
    mint: '#b8f3e0',
    peach: '#ffd4a3',
    sky: '#c4d7f2',
    lavender: '#d4c5f9',

    // Dark Mode Backgrounds
    bgPrimary: '#1a1625',
    bgSecondary: '#251e35',
    bgTertiary: '#2d2640',
    bgCard: 'rgba(184, 164, 232, 0.08)',
    bgCardSolid: '#2a2340',
    bgCardHover: 'rgba(184, 164, 232, 0.15)',

    // Text Colors
    textPrimary: '#f5f3ff',
    textSecondary: 'rgba(245, 243, 255, 0.75)',
    textTertiary: 'rgba(245, 243, 255, 0.5)',

    // Borders
    border: 'rgba(184, 164, 232, 0.15)',
    borderSolid: '#3a3150',

    // Status
    danger: '#ff6b6b',
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',

    // Gradient stops
    primaryGradientStart: '#b8a4e8',
    primaryGradientEnd: '#d4a5d8',
    secondaryGradientStart: '#ffc4e1',
    secondaryGradientEnd: '#ffb3d9',
    successGradientStart: '#a8e6cf',
    successGradientEnd: '#b8f3e0',
};

export const Spacing = {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
};

export const BorderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
};

export const FontSize = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 32,
    hero: 40,
};

export const FontWeight = {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
};

export const Shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 8,
    },
    glow: {
        shadowColor: '#b8a4e8',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 6,
    },
};

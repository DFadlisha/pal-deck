import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface LogoProps {
    size?: number;
}

export const PalDeckLogoPastel = ({ size = 120 }: LogoProps) => (
    <View style={{ width: size, height: size }}>
        <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
            {/* Person 1 (lavender) */}
            <Circle cx={45} cy={35} r={15} fill="#b8a4e8" />
            <Path
                d="M 30 55 Q 30 50 35 50 L 55 50 Q 60 50 60 55 L 60 85 Q 60 90 55 90 L 35 90 Q 30 90 30 85 Z"
                fill="#b8a4e8"
            />
            {/* Person 2 (light purple) */}
            <Circle cx={75} cy={35} r={15} fill="#d4a5d8" />
            <Path
                d="M 60 55 Q 60 50 65 50 L 85 50 Q 90 50 90 55 L 90 85 Q 90 90 85 90 L 65 90 Q 60 90 60 85 Z"
                fill="#d4a5d8"
            />
            {/* Hugging arms */}
            <Path d="M 55 60 Q 70 55 80 65 L 80 75 Q 70 70 55 75 Z" fill="#d4c5f9" opacity={0.9} />
            <Path d="M 65 60 Q 50 55 40 65 L 40 75 Q 50 70 65 75 Z" fill="#c4b5e8" opacity={0.9} />
            {/* Heart accent */}
            <Path d="M 60 45 L 63 42 Q 65 40 67 42 Q 69 40 71 42 L 74 45 L 67 52 L 60 45 Z" fill="#ffc4e1" opacity={0.9} />
        </Svg>
    </View>
);

export const PalDeckLogoSimple = ({ size = 40 }: LogoProps) => (
    <View style={{ width: size, height: size }}>
        <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
            <Circle cx={45} cy={40} r={12} fill="#b8a4e8" />
            <Circle cx={75} cy={40} r={12} fill="#d4a5d8" />
            <Rect x={35} y={55} width={20} height={35} rx={5} fill="#b8a4e8" />
            <Rect x={65} y={55} width={20} height={35} rx={5} fill="#d4a5d8" />
            <Path d="M 50 65 Q 60 60 70 65 L 70 75 Q 60 70 50 75 Z" fill="#90caf9" />
            <Path d="M 70 65 Q 60 60 50 65 L 50 75 Q 60 70 70 75 Z" fill="#42a5f5" />
        </Svg>
    </View>
);

import React, { useState, useRef, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Animated,
    PanResponder,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PalDeckLogoSimple } from '../components/Logo';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../theme';
import type { Match, SwipeCard } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100;

interface SwipeScreenProps {
    onMatch: (match: Match) => void;
}

const mockUsers: SwipeCard[] = [
    {
        id: '1', name: 'Alex Chen', age: 24, location: 'Tokyo, Japan',
        bio: 'Love anime, gaming, and exploring new cultures! Looking for pals to chat about life and share experiences.',
        interests: ['Gaming', 'Anime', 'Travel', 'Photography', 'Music'],
        photo: 'https://i.pravatar.cc/400?img=12', distance: 8520,
    },
    {
        id: '2', name: 'Maria Santos', age: 22, location: 'São Paulo, Brazil',
        bio: 'Artist and coffee enthusiast ☕ Always up for deep conversations and making new friends around the world!',
        interests: ['Art', 'Coffee', 'Music', 'Books', 'Hiking'],
        photo: 'https://i.pravatar.cc/400?img=45', distance: 15230,
    },
    {
        id: '3', name: 'James Wilson', age: 26, location: 'London, UK',
        bio: "Tech geek and fitness enthusiast. Love discussing startups, coding, and staying active. Let's connect as pals!",
        interests: ['Technology', 'Fitness', 'Startups', 'Coding', 'Running'],
        photo: 'https://i.pravatar.cc/400?img=33', distance: 6840,
    },
    {
        id: '4', name: 'Yuki Tanaka', age: 23, location: 'Seoul, South Korea',
        bio: 'K-pop fan and language learner 🎵 Want to practice English and meet friends who love Korean culture!',
        interests: ['K-pop', 'Languages', 'Dancing', 'Food', 'Fashion'],
        photo: 'https://i.pravatar.cc/400?img=47', distance: 1200,
    },
    {
        id: '5', name: 'Emma Rodriguez', age: 25, location: 'Barcelona, Spain',
        bio: 'Foodie and travel blogger. Always looking for new adventures and buddies to share stories with!',
        interests: ['Travel', 'Food', 'Blogging', 'Photography', 'Wine'],
        photo: 'https://i.pravatar.cc/400?img=48', distance: 9500,
    },
];

const SwipeScreen = ({ onMatch }: SwipeScreenProps) => {
    const [cards, setCards] = useState<SwipeCard[]>(mockUsers);
    const [currentIndex, setCurrentIndex] = useState(0);
    const position = useRef(new Animated.ValueXY()).current;

    const currentCard = cards[currentIndex];

    const handleSwipeComplete = useCallback(
        (direction: 'left' | 'right') => {
            if (direction === 'right' && currentCard) {
                if (Math.random() > 0.5) {
                    const match: Match = {
                        id: Date.now().toString(),
                        user: currentCard,
                        matchedAt: new Date(),
                    };
                    setTimeout(() => onMatch(match), 300);
                }
            }

            setCurrentIndex((prev) => {
                const next = prev + 1;
                if (next >= cards.length - 2) {
                    setCards((c) => [...c, ...mockUsers.map((u, i) => ({ ...u, id: `${u.id}-${Date.now()}-${i}` }))]);
                }
                return next;
            });

            position.setValue({ x: 0, y: 0 });
        },
        [currentCard, cards.length]
    );

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: position.x, dy: position.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx > SWIPE_THRESHOLD) {
                    Animated.timing(position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                        duration: 250,
                        useNativeDriver: true,
                    }).start(() => handleSwipeComplete('right'));
                } else if (gestureState.dx < -SWIPE_THRESHOLD) {
                    Animated.timing(position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                        duration: 250,
                        useNativeDriver: true,
                    }).start(() => handleSwipeComplete('left'));
                } else {
                    Animated.spring(position, {
                        toValue: { x: 0, y: 0 },
                        friction: 5,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-15deg', '0deg', '15deg'],
        extrapolate: 'clamp',
    });

    const likeOpacity = position.x.interpolate({
        inputRange: [0, SWIPE_THRESHOLD],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const nopeOpacity = position.x.interpolate({
        inputRange: [-SWIPE_THRESHOLD, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    if (!currentCard) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <PalDeckLogoSimple size={40} />
                    <Text style={styles.headerTitle}>PalDeck</Text>
                    <View style={{ width: 44 }} />
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>🎉</Text>
                    <Text style={styles.emptyTitle}>You're all caught up!</Text>
                    <Text style={styles.emptyText}>Check back later for more pals to connect with</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <PalDeckLogoSimple size={40} />
                <Text style={styles.headerTitle}>PalDeck</Text>
                <View style={{ width: 44 }} />
            </View>

            <View style={styles.cardsContainer}>
                {/* Background cards */}
                {cards.slice(currentIndex + 1, currentIndex + 3).reverse().map((card, index) => (
                    <View
                        key={card.id}
                        style={[
                            styles.card,
                            styles.backgroundCard,
                            {
                                top: 20 + (1 - index) * 8,
                                transform: [{ scale: 0.95 - (1 - index) * 0.03 }],
                            },
                        ]}
                    >
                        <Image source={{ uri: card.photo }} style={styles.cardImage} />
                    </View>
                ))}

                {/* Top card */}
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[
                        styles.card,
                        {
                            transform: [
                                { translateX: position.x },
                                { translateY: position.y },
                                { rotate },
                            ],
                        },
                    ]}
                >
                    <Image source={{ uri: currentCard.photo }} style={styles.cardImage} />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.85)']}
                        style={styles.cardGradient}
                    />

                    {/* PAL stamp */}
                    <Animated.View style={[styles.stamp, styles.stampLike, { opacity: likeOpacity }]}>
                        <Text style={styles.stampLikeText}>PAL</Text>
                    </Animated.View>

                    {/* SKIP stamp */}
                    <Animated.View style={[styles.stamp, styles.stampNope, { opacity: nopeOpacity }]}>
                        <Text style={styles.stampNopeText}>SKIP</Text>
                    </Animated.View>

                    <View style={styles.cardInfo}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardName}>{currentCard.name}, {currentCard.age}</Text>
                            <Text style={styles.cardDistance}>
                                📍 {(currentCard.distance! / 1000).toFixed(0)}km away
                            </Text>
                        </View>
                        <Text style={styles.cardLocation}>{currentCard.location}</Text>
                        <Text style={styles.cardBio} numberOfLines={2}>{currentCard.bio}</Text>
                        <View style={styles.interestsRow}>
                            {currentCard.interests.slice(0, 4).map((interest, idx) => (
                                <View key={idx} style={styles.interestTag}>
                                    <Text style={styles.interestText}>{interest}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </Animated.View>
            </View>

            {/* Action buttons */}
            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.actionBtn, styles.actionPass]}
                    onPress={() => {
                        Animated.timing(position, {
                            toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
                            duration: 300,
                            useNativeDriver: true,
                        }).start(() => handleSwipeComplete('left'));
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={styles.actionPassIcon}>✕</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionBtn, styles.actionLike]}
                    onPress={() => {
                        Animated.timing(position, {
                            toValue: { x: SCREEN_WIDTH + 100, y: 0 },
                            duration: 300,
                            useNativeDriver: true,
                        }).start(() => handleSwipeComplete('right'));
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={styles.actionLikeIcon}>👋</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        paddingHorizontal: Spacing.md,
        paddingTop: 50,
        paddingBottom: Spacing.sm,
        backgroundColor: Colors.bgSecondary,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderSolid,
    },
    headerTitle: {
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
    },
    cardsContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    card: {
        width: SCREEN_WIDTH - 40,
        height: SCREEN_WIDTH * 1.25,
        borderRadius: BorderRadius.xl,
        position: 'absolute',
        overflow: 'hidden',
        ...Shadows.lg,
    },
    backgroundCard: {
        backgroundColor: Colors.bgCardSolid,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '55%',
    },
    stamp: {
        position: 'absolute',
        top: 50,
        padding: 10,
        borderWidth: 4,
        borderRadius: BorderRadius.md,
        zIndex: 10,
    },
    stampLike: {
        left: 20,
        borderColor: Colors.success,
        transform: [{ rotate: '-20deg' }],
    },
    stampLikeText: {
        fontSize: 32,
        fontWeight: FontWeight.extrabold,
        color: Colors.success,
    },
    stampNope: {
        right: 20,
        borderColor: Colors.danger,
        transform: [{ rotate: '20deg' }],
    },
    stampNopeText: {
        fontSize: 32,
        fontWeight: FontWeight.extrabold,
        color: Colors.danger,
    },
    cardInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: Spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardName: {
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.extrabold,
        color: Colors.white,
    },
    cardDistance: {
        fontSize: FontSize.sm,
        color: 'rgba(255,255,255,0.8)',
    },
    cardLocation: {
        fontSize: FontSize.md,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 2,
    },
    cardBio: {
        fontSize: FontSize.md,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 20,
        marginTop: 6,
    },
    interestsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 10,
    },
    interestTag: {
        backgroundColor: 'rgba(184, 164, 232, 0.3)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: 'rgba(184, 164, 232, 0.5)',
    },
    interestText: {
        fontSize: FontSize.xs,
        color: Colors.white,
        fontWeight: FontWeight.semibold,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40,
        paddingBottom: 30,
        paddingTop: 16,
    },
    actionBtn: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.md,
    },
    actionPass: {
        backgroundColor: Colors.bgTertiary,
        borderWidth: 2,
        borderColor: Colors.danger,
    },
    actionPassIcon: {
        fontSize: 28,
        color: Colors.danger,
        fontWeight: FontWeight.bold,
    },
    actionLike: {
        backgroundColor: Colors.bgTertiary,
        borderWidth: 2,
        borderColor: Colors.success,
    },
    actionLikeIcon: {
        fontSize: 28,
        color: Colors.success,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    emptyIcon: {
        fontSize: 60,
        marginBottom: Spacing.md,
    },
    emptyTitle: {
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    emptyText: {
        fontSize: FontSize.lg,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
});

export default SwipeScreen;

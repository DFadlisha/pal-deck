/** Mobile-first onboarding experience for the PalDeck application */
import { motion } from 'framer-motion';
import { PalDeckLogoPastel } from './Logo.tsx';
import './OnboardingScreen.css';

interface OnboardingScreenProps {
    onGetStarted: () => void;
}

const OnboardingScreen = ({ onGetStarted }: OnboardingScreenProps) => {
    return (
        <div className="onboarding-screen">
            <div className="onboarding-content">
                <motion.div
                    className="onboarding-logo"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                >
                    <PalDeckLogoPastel size={100} />
                </motion.div>

                <motion.h1
                    className="onboarding-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Welcome to PalDeck
                </motion.h1>

                <motion.p
                    className="onboarding-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Connect with amazing people worldwide. Swipe to find friends who share your interests and passions.
                </motion.p>

                <motion.div
                    className="onboarding-features"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="feature-item">
                        <div className="feature-icon">🌍</div>
                        <h3>Global Community</h3>
                        <p>Meet people from all around the world</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">💬</div>
                        <h3>Instant Chat</h3>
                        <p>Start conversations with your matches</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🎯</div>
                        <h3>Interest Matching</h3>
                        <p>Find friends with similar hobbies</p>
                    </div>
                </motion.div>

                <motion.button
                    className="btn-primary btn-large"
                    onClick={onGetStarted}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Get Started
                </motion.button>
            </div>
        </div>
    );
};

export default OnboardingScreen;

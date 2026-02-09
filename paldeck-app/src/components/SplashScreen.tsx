import { motion } from 'framer-motion';
import { PalDeckLogoPastel } from './Logo.tsx';
import './SplashScreen.css';

const SplashScreen = () => {
    return (
        <div className="splash-screen">
            <div className="splash-content">
                <motion.div
                    className="splash-logo"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                >
                    <PalDeckLogoPastel size={120} />
                </motion.div>
                <motion.h1
                    className="splash-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    PalDeck
                </motion.h1>
                <motion.p
                    className="splash-tagline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    Find friends worldwide
                </motion.p>
                <motion.div
                    className="splash-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <div className="loader-bar"></div>
                </motion.div>
            </div>
        </div>
    );
};

export default SplashScreen;

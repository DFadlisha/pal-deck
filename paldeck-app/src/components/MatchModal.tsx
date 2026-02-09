import { motion, AnimatePresence } from 'framer-motion';
import type { Match } from '../types';
import './MatchModal.css';

interface MatchModalProps {
    isOpen: boolean;
    match: Match | null;
    onClose: () => void;
    onSendMessage: () => void;
}

const MatchModal = ({ isOpen, match, onClose, onSendMessage }: MatchModalProps) => {
    if (!match) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="match-modal"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <div className="match-celebration">
                            <motion.h2
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                It's a Match! 🎉
                            </motion.h2>
                            <div className="match-avatars">
                                <img src={match.user.photo} alt={match.user.name} />
                                <motion.div
                                    className="match-heart"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: 'spring' }}
                                >
                                    💙
                                </motion.div>
                                <div className="match-avatar-placeholder">You</div>
                            </div>
                            <p>You and {match.user.name} want to be friends!</p>
                            <div className="match-actions">
                                <button className="btn-primary" onClick={onSendMessage}>Send Message</button>
                                <button className="btn-secondary" onClick={onClose}>Keep Swiping</button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MatchModal;

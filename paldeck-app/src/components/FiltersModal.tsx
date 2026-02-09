import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FiltersModal.css';

interface FiltersModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: Filters) => void;
    currentFilters: Filters;
}

export interface Filters {
    ageRange: [number, number];
    maxDistance: number;
    interests: string[];
    location?: string;
}

const allInterests = [
    'Gaming', 'Music', 'Art', 'Travel', 'Photography', 'Fitness',
    'Cooking', 'Reading', 'Movies', 'Sports', 'Technology', 'Fashion',
    'Dancing', 'Hiking', 'Yoga', 'Coffee', 'Anime', 'K-pop',
    'Languages', 'Food', 'Blogging', 'Wine', 'Startups', 'Coding'
];

const FiltersModal = ({ isOpen, onClose, onApply, currentFilters }: FiltersModalProps) => {
    const [filters, setFilters] = useState<Filters>(currentFilters);

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    const handleReset = () => {
        setFilters({
            ageRange: [18, 100],
            maxDistance: 100,
            interests: [],
        });
    };

    const toggleInterest = (interest: string) => {
        setFilters(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

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
                        className="filters-modal"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <div className="filters-header">
                            <h2>Filters</h2>
                            <button className="btn-icon" onClick={onClose}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <div className="filters-content">
                            {/* Age Range */}
                            <div className="filter-section">
                                <label>Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}</label>
                                <div className="range-inputs">
                                    <input
                                        type="range"
                                        min="13"
                                        max="100"
                                        value={filters.ageRange[0]}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            ageRange: [Number(e.target.value), prev.ageRange[1]]
                                        }))}
                                    />
                                    <input
                                        type="range"
                                        min="13"
                                        max="100"
                                        value={filters.ageRange[1]}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            ageRange: [prev.ageRange[0], Number(e.target.value)]
                                        }))}
                                    />
                                </div>
                            </div>

                            {/* Max Distance */}
                            <div className="filter-section">
                                <label>Maximum Distance: {filters.maxDistance}km</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="500"
                                    value={filters.maxDistance}
                                    onChange={(e) => setFilters(prev => ({
                                        ...prev,
                                        maxDistance: Number(e.target.value)
                                    }))}
                                    className="distance-slider"
                                />
                            </div>

                            {/* Interests */}
                            <div className="filter-section">
                                <label>Interests ({filters.interests.length} selected)</label>
                                <div className="interests-grid">
                                    {allInterests.map((interest) => (
                                        <button
                                            key={interest}
                                            className={`interest-chip ${filters.interests.includes(interest) ? 'selected' : ''}`}
                                            onClick={() => toggleInterest(interest)}
                                        >
                                            {interest}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="filters-actions">
                            <button className="btn-secondary" onClick={handleReset}>
                                Reset Filters
                            </button>
                            <button className="btn-primary" onClick={handleApply}>
                                Apply Filters
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FiltersModal;

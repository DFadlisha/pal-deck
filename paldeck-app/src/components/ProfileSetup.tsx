import { useState } from 'react';
import type { UserProfile } from '../types';
import './ProfileSetup.css';

interface ProfileSetupProps {
    onSave: (profile: UserProfile) => void;
    onBack: () => void;
    existingProfile: UserProfile | null;
}

const interestsList = [
    'Gaming', 'Music', 'Art', 'Travel', 'Photography', 'Fitness',
    'Cooking', 'Reading', 'Movies', 'Sports', 'Technology', 'Fashion',
    'Dancing', 'Hiking', 'Yoga', 'Coffee', 'Anime', 'K-pop',
    'Languages', 'Food', 'Blogging', 'Wine', 'Startups', 'Coding'
];

const ProfileSetup = ({ onSave, onBack, existingProfile }: ProfileSetupProps) => {
    const [name, setName] = useState<string>(existingProfile?.name || '');
    const [age, setAge] = useState<number>(existingProfile?.age || 18);
    const [location, setLocation] = useState<string>(existingProfile?.location || '');
    const [bio, setBio] = useState<string>(existingProfile?.bio || '');
    const [selectedInterests, setSelectedInterests] = useState<string[]>(existingProfile?.interests || []);
    // Using a default avatar if none exists
    const [photo] = useState<string>(existingProfile?.photo || `https://i.pravatar.cc/400?img=${Math.floor(Math.random() * 70)}`);

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSubmit = () => {
        if (name && age && location && bio && selectedInterests.length >= 3) {
            const profile: UserProfile = {
                id: existingProfile?.id || Date.now().toString(),
                name,
                age,
                location,
                bio,
                interests: selectedInterests,
                photo: photo
            };
            onSave(profile);
        } else {
            alert('Please fill all fields and select at least 3 interests');
        }
    };

    return (
        <div className="profile-setup-screen">
            <div className="screen-header">
                <button className="btn-icon" onClick={onBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2>{existingProfile ? 'Edit Profile' : 'Create Your Profile'}</h2>
                <div style={{ width: '44px' }}></div>
            </div>

            <div className="profile-setup-content">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        maxLength={50}
                    />
                </div>

                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        placeholder="18"
                        min={13}
                        max={100}
                    />
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, Country"
                    />
                </div>

                <div className="form-group">
                    <label>Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={4}
                        maxLength={300}
                    />
                    <span className="char-count">{bio.length}/300</span>
                </div>

                <div className="form-group">
                    <label>Interests (Select at least 3)</label>
                    <div className="interests-grid">
                        {interestsList.map((interest) => (
                            <button
                                key={interest}
                                className={`interest-chip ${selectedInterests.includes(interest) ? 'selected' : ''}`}
                                onClick={() => toggleInterest(interest)}
                            >
                                {interest}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="btn-primary btn-large" onClick={handleSubmit}>
                    {existingProfile ? 'Update Profile' : 'Continue'}
                </button>
            </div>
        </div>
    );
};

export default ProfileSetup;

import type { UserProfile } from '../types';

interface ProfileScreenProps {
    profile: UserProfile | null;
    onEdit: () => void;
}

const ProfileScreen = ({ profile, onEdit }: ProfileScreenProps) => {
    if (!profile) return null;

    return (
        <div className="profile-screen">
            <div className="profile-content">
                <div className="profile-header-section">
                    <div className="profile-photo-large">
                        <img src={profile.photo} alt={profile.name} />
                    </div>
                    <h2>{profile.name}, {profile.age}</h2>
                    <p>📍 {profile.location}</p>
                    <button className="btn-secondary" onClick={onEdit}>Edit Profile</button>
                </div>

                <div className="profile-section">
                    <h3>About Me</h3>
                    <p>{profile.bio}</p>
                </div>

                <div className="profile-section">
                    <h3>My Interests</h3>
                    <div className="interests-display">
                        {profile.interests.map((interest, idx) => (
                            <span key={idx} className="interest-tag">{interest}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;

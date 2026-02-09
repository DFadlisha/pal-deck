export const PalDeckLogo = ({ size = 120, className = '' }: { size?: number; className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {/* Two people hugging - representing friendship */}

        {/* Person 1 (darker blue) - Left */}
        <circle cx="45" cy="35" r="15" fill="#1e88e5" />
        <path
            d="M 30 55 Q 30 50 35 50 L 55 50 Q 60 50 60 55 L 60 85 Q 60 90 55 90 L 35 90 Q 30 90 30 85 Z"
            fill="#1e88e5"
        />

        {/* Person 2 (lighter blue) - Right */}
        <circle cx="75" cy="35" r="15" fill="#64b5f6" />
        <path
            d="M 60 55 Q 60 50 65 50 L 85 50 Q 90 50 90 55 L 90 85 Q 90 90 85 90 L 65 90 Q 60 90 60 85 Z"
            fill="#64b5f6"
        />

        {/* Hugging arms */}
        {/* Left person's arm (lighter blue) hugging right */}
        <path
            d="M 55 60 Q 70 55 80 65 L 80 75 Q 70 70 55 75 Z"
            fill="#90caf9"
            opacity="0.9"
        />

        {/* Right person's arm (darker blue) hugging left */}
        <path
            d="M 65 60 Q 50 55 40 65 L 40 75 Q 50 70 65 75 Z"
            fill="#42a5f5"
            opacity="0.9"
        />

        {/* Heart accent (optional - represents friendship/connection) */}
        <path
            d="M 60 45 L 63 42 Q 65 40 67 42 Q 69 40 71 42 L 74 45 L 67 52 L 60 45 Z"
            fill="#ffc4e1"
            opacity="0.8"
        />
    </svg>
);

export const PalDeckLogoSimple = ({ size = 40, className = '' }: { size?: number; className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {/* Simplified version for small sizes */}
        <circle cx="45" cy="40" r="12" fill="#1e88e5" />
        <circle cx="75" cy="40" r="12" fill="#64b5f6" />
        <rect x="35" y="55" width="20" height="35" rx="5" fill="#1e88e5" />
        <rect x="65" y="55" width="20" height="35" rx="5" fill="#64b5f6" />
        <path d="M 50 65 Q 60 60 70 65 L 70 75 Q 60 70 50 75 Z" fill="#90caf9" />
        <path d="M 70 65 Q 60 60 50 65 L 50 75 Q 60 70 70 75 Z" fill="#42a5f5" />
    </svg>
);

// Pastel version matching the new color scheme
export const PalDeckLogoPastel = ({ size = 120, className = '' }: { size?: number; className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {/* Person 1 (lavender) */}
        <circle cx="45" cy="35" r="15" fill="#b8a4e8" />
        <path
            d="M 30 55 Q 30 50 35 50 L 55 50 Q 60 50 60 55 L 60 85 Q 60 90 55 90 L 35 90 Q 30 90 30 85 Z"
            fill="#b8a4e8"
        />

        {/* Person 2 (light purple) */}
        <circle cx="75" cy="35" r="15" fill="#d4a5d8" />
        <path
            d="M 60 55 Q 60 50 65 50 L 85 50 Q 90 50 90 55 L 90 85 Q 90 90 85 90 L 65 90 Q 60 90 60 85 Z"
            fill="#d4a5d8"
        />

        {/* Hugging arms - pastel */}
        <path
            d="M 55 60 Q 70 55 80 65 L 80 75 Q 70 70 55 75 Z"
            fill="#d4c5f9"
            opacity="0.9"
        />

        <path
            d="M 65 60 Q 50 55 40 65 L 40 75 Q 50 70 65 75 Z"
            fill="#c4b5e8"
            opacity="0.9"
        />

        {/* Heart accent - pastel pink */}
        <path
            d="M 60 45 L 63 42 Q 65 40 67 42 Q 69 40 71 42 L 74 45 L 67 52 L 60 45 Z"
            fill="#ffc4e1"
            opacity="0.9"
        />
    </svg>
);

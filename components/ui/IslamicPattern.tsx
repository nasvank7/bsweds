'use client';

interface IslamicPatternProps {
  className?: string;
  opacity?: number;
  color?: string;
}

export default function IslamicPattern({
  className = '',
  opacity = 0.08,
  color = '#D4AF37',
}: IslamicPatternProps) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern id="islamicPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* 8-pointed star */}
          <polygon
            points="40,5 47,27 70,27 52,41 59,63 40,50 21,63 28,41 10,27 33,27"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
          />
          {/* Inner circle */}
          <circle cx="40" cy="40" r="8" fill="none" stroke={color} strokeWidth="0.6" />
          {/* Corner diamonds */}
          <polygon points="0,10 5,0 10,10 5,20" fill="none" stroke={color} strokeWidth="0.5" />
          <polygon points="70,10 75,0 80,10 75,20" fill="none" stroke={color} strokeWidth="0.5" />
          <polygon points="0,70 5,60 10,70 5,80" fill="none" stroke={color} strokeWidth="0.5" />
          <polygon points="70,70 75,60 80,70 75,80" fill="none" stroke={color} strokeWidth="0.5" />
          {/* Connecting lines */}
          <line x1="40" y1="5" x2="40" y2="0" stroke={color} strokeWidth="0.4" />
          <line x1="40" y1="75" x2="40" y2="80" stroke={color} strokeWidth="0.4" />
          <line x1="5" y1="40" x2="0" y2="40" stroke={color} strokeWidth="0.4" />
          <line x1="75" y1="40" x2="80" y2="40" stroke={color} strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamicPattern)" />
    </svg>
  );
}

export function IslamicBorderPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 40"
      className={`w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="borderPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="6" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <polygon points="20,4 24,16 36,16 27,24 30,36 20,29 10,36 13,24 4,16 16,16" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="400" height="40" fill="url(#borderPattern)" />
    </svg>
  );
}

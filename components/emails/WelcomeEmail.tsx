import * as React from 'react';

interface WelcomeEmailProps {
    name: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name }) => (
    <div style={{ fontFamily: 'sans-serif', color: '#333' }}>
        <h1 style={{ color: '#E50914' }}>Welcome to AI IMPACT MEDIA!</h1>
        <p>Hi {name},</p>
        <p>
            We are thrilled to have you on board. AI IMPACT MEDIA is revolutionizing the way casting and media production happen, and we&apos;re glad you&apos;re part of this journey.
        </p>
        <p>
            Explore our platform, discover new opportunities, and let our AI tools help you shine.
        </p>
        <br />
        <p>Best regards,</p>
        <p style={{ fontWeight: 'bold' }}>The AI IMPACT MEDIA Team</p>
    </div>
);

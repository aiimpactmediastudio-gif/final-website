import * as React from 'react';

interface PasswordChangedEmailProps {
    email: string;
}

export const PasswordChangedEmail: React.FC<PasswordChangedEmailProps> = ({ email }) => (
    <div style={{ fontFamily: 'sans-serif', color: '#333', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#E50914', marginBottom: '24px' }}>Password Changed Successfully</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Hello,
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            The password for your AI IMPACT MEDIA account associated with <strong>{email}</strong> has been successfully changed.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            If you did not make this change, please contact our support team immediately.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '32px 0' }} />

        <p style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>
            AI IMPACT MEDIA<br />
            Secure Casting Platform
        </p>
    </div>
);

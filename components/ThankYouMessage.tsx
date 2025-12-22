import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function ThankYouMessage() {
    return (
        <div className="flex items-center gap-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white border border-white/20 shadow-lg animate-fade-in">
            <CheckCircle className="h-5 w-5" />
            <p className="text-sm font-medium">Thank you for confirming your email! You can now log in.</p>
        </div>
    );
}

import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <Loader2 className="animate-spin text-white w-12 h-12" />
        </div>
    );
}

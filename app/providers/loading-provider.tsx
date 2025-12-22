"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import LoadingSpinner from "../../components/ui/loading-spinner";

interface LoadingContextProps {
    loading: boolean;
}

const LoadingContext = createContext<LoadingContextProps>({ loading: false });

export function useLoading() {
    return useContext(LoadingContext);
}

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Show spinner briefly on pathname change
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <LoadingContext.Provider value={{ loading }}>
            {loading && <LoadingSpinner />}
            {children}
        </LoadingContext.Provider>
    );
}

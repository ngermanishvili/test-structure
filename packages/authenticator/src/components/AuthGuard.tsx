'use client';

import { useClientAuth } from '../queries';
import { LoginForm } from './LoginForm';

type AuthGuardProps = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    requireAuth?: boolean;
};

export function AuthGuard({
    children,
    fallback,
    requireAuth = true
}: AuthGuardProps) {
    const { data: authData, isLoading } = useClientAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">ჩატვირთვა...</span>
            </div>
        );
    }

    if (requireAuth && (!authData?.isAuthenticated)) {
        return (
            <>{fallback || (
                <div className="max-w-md mx-auto mt-8">
                    <h1 className="text-2xl font-bold mb-6">ავტორიზაცია საჭიროა</h1>
                    <LoginForm />
                </div>
            )}</>
        );
    }

    return <>{children}</>;
}
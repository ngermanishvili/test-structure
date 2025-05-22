'use client';

import { useClientAuth, useLogoutMutation } from '../queries';

export function UserProfile() {
    const { data: authData, isLoading } = useClientAuth();
    const logoutMutation = useLogoutMutation();

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
        );
    }

    if (!authData?.isAuthenticated || !authData.user) {
        return null;
    }

    const { user } = authData;

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
            </div>

            <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
            </div>

            <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
                {logoutMutation.isPending ? 'გასვლა...' : 'გასვლა'}
            </button>
        </div>
    );
}
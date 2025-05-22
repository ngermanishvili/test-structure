'use client';

import { useClientAuth, useLogoutMutation } from '../queries';

export function useAuth() {
    const { data: authData, isLoading, error } = useClientAuth();
    const logoutMutation = useLogoutMutation();

    return {
        isAuthenticated: authData?.isAuthenticated || false,
        isLoading,
        user: authData?.user || null,
        error,
        logout: () => logoutMutation.mutate(),
        isLoggingOut: logoutMutation.isPending,
        hasValidSession: Boolean(authData?.isAuthenticated && authData.user),
    };
}
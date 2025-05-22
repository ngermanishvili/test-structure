'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from './types';

export const authQueryKeys = {
    session: ['auth', 'session'] as const,
    user: ['auth', 'user'] as const,
} as const;

export function useClientAuth() {
    return useQuery({
        queryKey: authQueryKeys.session,
        queryFn: async () => {
            try {
                const userInfoMatch = document.cookie.match(/user-info=([^;]+)/);
                if (!userInfoMatch) return null;

                const userInfo = JSON.parse(decodeURIComponent(userInfoMatch[1]));
                return {
                    isAuthenticated: true,
                    user: userInfo as User
                };
            } catch {
                return null;
            }
        },
        staleTime: 5 * 60 * 1000,
        retry: false,
    });
}

export function getClientApiToken(): string | null {
    try {
        const apiTokenMatch = document.cookie.match(/api-token=([^;]+)/);
        return apiTokenMatch ? decodeURIComponent(apiTokenMatch[1]) : null;
    } catch {
        return null;
    }
}

export function useLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            document.cookie = 'api-token=; Max-Age=0; path=/; SameSite=Lax';
            document.cookie = 'user-info=; Max-Age=0; path=/; SameSite=Lax';

            try {
                const { myVideoApiClient } = await import('@myvideo/api/src/myvideo-client');
                myVideoApiClient.setToken('');
                console.log('🔄 API client token cleared');
            } catch (error) {
                console.error('Error clearing API token:', error);
            }
            try {
                const { clearDashboardCache } = await import('@myvideo/api/src/dashboard');
                clearDashboardCache();
                console.log('🗑️ Dashboard cache cleared on logout');
            } catch (error) {
                console.error('Error clearing dashboard cache:', error);
            }

            try {
                const { logoutAction } = await import('./actions');
                await logoutAction();
            } catch (error) {
                console.error('Server logout failed:', error);
            }
        },
        onSuccess: () => {
            queryClient.clear();
            queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
            window.location.href = '/login';
        },
        onError: (error) => {
            console.error('Logout failed:', error);
            queryClient.clear();
            window.location.href = '/login';
        }
    });
}
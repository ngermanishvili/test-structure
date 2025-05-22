import { cache } from 'react';
import { cookies } from 'next/headers';
import { myVideoApiClient } from '@myvideo/api/src/myvideo-client';
import type { Session } from './types';

export const verifySession = cache(async (): Promise<Session | null> => {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('session-token')?.value;
        const userInfoCookie = cookieStore.get('user-info')?.value;

        if (!sessionToken) {
            console.log('🔍 No session token found');
            return null;
        }
        myVideoApiClient.setToken(sessionToken);
        try {
            await myVideoApiClient.get('/dashboard/mobile/main');
            console.log('✅ Session token verified');
        } catch (apiError) {
            console.log('❌ Session token invalid');
            return null;
        }
        let userInfo;
        try {
            userInfo = userInfoCookie ? JSON.parse(userInfoCookie) : null;
        } catch {
            userInfo = null;
        }

        return {
            userId: userInfo?.email || 'unknown',
            token: sessionToken,
            user: {
                id: userInfo?.email || 'unknown',
                email: userInfo?.email || 'unknown@example.com',
                name: userInfo?.name || 'User'
            }
        };

    } catch (error) {
        console.error('Session verification failed:', error);
        return null;
    }
});

export const getUser = cache(async () => {
    const session = await verifySession();
    return session?.user || null;
});

export const requireAuth = cache(async () => {
    const session = await verifySession();
    if (!session) {
        throw new Error('Authentication required');
    }
    return session;
});
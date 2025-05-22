'use client';

import { useClientAuth } from '@myvideo/authenticator/client';
import { useEffect, useState } from 'react';

export function AuthSync() {
    const { data: authData } = useClientAuth();
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        if (authData?.isAuthenticated) {
            import('@myvideo/api/src/myvideo-client').then(({ myVideoApiClient }) => {
                const sessionTokenMatch = document.cookie.match(/session-token=([^;]+)/);

                if (sessionTokenMatch) {
                    const token = decodeURIComponent(sessionTokenMatch[1]);
                    myVideoApiClient.setToken(token);
                    console.log('🔄 AuthSync: API token synced');
                } else {
                    console.log('⚠️ AuthSync: No session token found in cookies');
                }
            });
        } else {
            import('@myvideo/api/src/myvideo-client').then(({ myVideoApiClient }) => {
                myVideoApiClient.setToken('');
                console.log('🔄 AuthSync: API token cleared');
            });
        }
    }, [authData?.isAuthenticated, isClient]);

    return null;
}
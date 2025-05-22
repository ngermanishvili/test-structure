'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { myVideoApiClient } from '@myvideo/api/src/myvideo-client';
import type { LoginFormState } from './types';

export async function loginAction(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return {
            success: false,
            error: 'ელ. ფოსტა და პაროლი აუცილებელია'
        };
    }

    try {
        console.log('🔐 Starting server-side login for:', email);

        const tokenResponse = await myVideoApiClient.getAuthToken(
            email,
            password,
            '7',
            'BTf4tSzWBbhJoEQd7VmBftzNWHTXKywFDz8JUtGt'
        );

        if (!tokenResponse.access_token) {
            throw new Error('მცდარი credentials');
        }

        const cookieStore = await cookies();
        cookieStore.set('session-token', tokenResponse.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: tokenResponse.expires_in || 3600,
            path: '/'
        });
        cookieStore.set('api-token', tokenResponse.access_token, {
            httpOnly: false, // Client can read this
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: tokenResponse.expires_in || 3600,
            path: '/'
        });
        const userInfo = {
            email,
            name: email.split('@')[0].replace(/[._]/g, ' '),
            loginTime: new Date().toISOString()
        };

        cookieStore.set('user-info', JSON.stringify(userInfo), {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: tokenResponse.expires_in || 3600,
            path: '/'
        });

        console.log('✅ Login successful, cookies set (both HTTP-only and client-readable)');
        return { success: true };

    } catch (error: any) {
        console.error('❌ Login failed:', error.message);
        return {
            success: false,
            error: error.message || 'ავტორიზაცია ვერ მოხერხდა'
        };
    }
}

export async function logoutAction() {
    try {
        const cookieStore = await cookies();

        // Clear all auth cookies
        cookieStore.delete('session-token'); // HTTP-only
        cookieStore.delete('api-token');     // Client-readable
        cookieStore.delete('user-info');

        console.log('👋 Logout completed');

    } catch (error) {
        console.error('Logout error:', error);
    }

    redirect('/login');
}
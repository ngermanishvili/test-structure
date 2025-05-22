'use client';
import Header from '@myvideo/presentation/src/components/Header';
import { UserProfile, useAuth, getClientApiToken } from '@myvideo/authenticator/client';
import Link from 'next/link';
import { User } from 'lucide-react';
import { useEffect } from 'react';

const navigationItems = [
    { label: 'მთავარი', href: '/' },
    { label: 'ვიდეო', href: '/videos' },
    { label: 'სპორტი', href: '/sport' },


];

export default function LayoutHeader() {
    const { isAuthenticated } = useAuth();
    useEffect(() => {
        if (isAuthenticated) {
            const token = getClientApiToken();
            if (token) {
                import('@myvideo/api/src/myvideo-client').then(({ myVideoApiClient }) => {
                    myVideoApiClient.setToken(token);
                    console.log('🔄 LayoutHeader: API token synced');
                });
            }
        }
    }, [isAuthenticated]);

    return (
        <Header
            navigationItems={navigationItems.map(item => ({
                ...item,
                label: <Link href={item.href}>{item.label}</Link>
            }))}
            onSearch={(query) => console.log('Search:', query)}
            onUserClick={() => console.log('User clicked')}
            userSection={
                isAuthenticated ? (
                    <UserProfile />
                ) : (
                    <Link href="/login" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span className="hidden md:inline">შესვლა</span>
                    </Link>
                )
            }
        />
    );
}
'use client';
import Header from '@myvideo/presentation/src/components/Header';
import Link from 'next/link';

const navigationItems = [
    { label: 'მთავარი', href: '/' },
    { label: 'სპორტი', href: '/sport' },
    { label: 'არხები', href: '/channels' },
];
//
export default function LayoutHeader() {
    return (
        <Header
            navigationItems={navigationItems.map(item => ({
                ...item,
                label: <Link href={item.href}>{item.label}</Link>
            }))}
            onSearch={(query) => console.log('Search:', query)}
            onUserClick={() => console.log('User clicked')}
        />
    );
} 
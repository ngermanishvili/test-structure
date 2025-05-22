// packages/presentation/src/components/Header.tsx
import React from 'react';
import { Search, User } from 'lucide-react';

export type HeaderProps = {
    logo?: string;
    navigationItems?: Array<{ label: string; href?: string; active?: boolean }>;
    onSearch?: (query: string) => void;
    onUserClick?: () => void;
};

export default function Header({
    logo = "LOOOGO",
    navigationItems = [],
    onSearch,
    onUserClick
}: HeaderProps) {
    return (
        <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-8">
                <h1 className="text-[#002e5e] text-2xl font-bold">{logo}</h1>
                <nav>
                    <ul className="hidden md:flex items-center space-x-6">
                        {navigationItems.map((item, index) => (
                            <li
                                key={index}
                                className={item.active
                                    ? "bg-[#002e5e] text-white px-3 py-1 rounded text-sm"
                                    : "text-gray-700 text-sm cursor-pointer hover:text-[#002e5e]"
                                }
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="flex items-center space-x-2">
                <div className="relative">
                    <input
                        className="w-64 rounded-full bg-gray-100 pl-4 pr-10 py-1 text-sm outline-none"
                        placeholder="ძიება"
                        onChange={(e) => onSearch?.(e.target.value)}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                <div
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                    onClick={onUserClick}
                >
                    <User className="h-4 w-4 text-gray-700" />
                </div>
            </div>
        </header>
    );
}
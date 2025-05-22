import React from 'react';
import type { UserChannel } from '@myvideo/domain';

export type UserChannelGridProps = {
    title: string;
    userChannels: UserChannel[];
    onChannelClick?: (channel: UserChannel) => void;
    maxChannels?: number;
};

export default function UserChannelGrid({
    title,
    userChannels,
    onChannelClick,
    maxChannels
}: UserChannelGridProps) {

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    const displayChannels = maxChannels
        ? userChannels.slice(0, maxChannels)
        : userChannels;

    if (displayChannels.length === 0) {
        return (
            <section className="py-6 px-8">
                <h2 className="text-black text-xl mb-4">{title}</h2>
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📺</div>
                    <h3 className="text-xl font-bold text-gray-600 mb-2">
                        არ მოიძებნა არხები
                    </h3>
                    <p className="text-gray-500">
                        სცადეთ მოგვიანებით
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-6 px-8">
            <h2 className="text-black text-xl mb-4">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayChannels.map((channel) => (
                    <UserChannelCard
                        key={channel.id}
                        channel={channel}
                        onClick={() => onChannelClick?.(channel)}
                        formatNumber={formatNumber}
                    />
                ))}
            </div>
        </section>
    );
}

// ✅ Separate UserChannelCard component for better performance
const UserChannelCard = React.memo(function UserChannelCard({
    channel,
    onClick,
    formatNumber
}: {
    channel: UserChannel;
    onClick: () => void;
    formatNumber: (num: number) => string;
}) {
    return (
        <div
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            aria-label={`Open ${channel.name} channel`}
        >
            {/* Channel Cover */}
            <div className="relative h-48 bg-gray-200">
                {channel.cover ? (
                    <img
                        src={channel.cover}
                        alt={`${channel.name} cover`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                            // Fallback to gradient background
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                                parent.innerHTML = `
                                    <div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                        <span class="text-4xl font-bold text-white">${channel.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                `;
                            }
                        }}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                            {channel.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
            </div>

            {/* Channel Info */}
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {channel.name}
                </h3>

                {channel.description && (
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {channel.description}
                    </p>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-lg font-bold text-blue-600">
                            {formatNumber(channel.subscribers)}
                        </div>
                        <div className="text-xs text-gray-500">გამომწერი</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-green-600">
                            {formatNumber(channel.videos)}
                        </div>
                        <div className="text-xs text-gray-500">ვიდეო</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-purple-600">
                            {formatNumber(channel.views)}
                        </div>
                        <div className="text-xs text-gray-500">ნახვა</div>
                    </div>
                </div>

                {/* Channel URL */}
                {channel.url && (
                    <div className="mt-4 text-xs text-gray-400">
                        /@{channel.url}
                    </div>
                )}
            </div>
        </div>
    );
});
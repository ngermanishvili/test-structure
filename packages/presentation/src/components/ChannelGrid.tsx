'use client';
import React from 'react';
import type { Channel } from '@myvideo/domain';

export type ChannelGridProps = {
    channels: Channel[];
    onChannelClick?: (channel: Channel) => void;
    maxChannels?: number;
    loading?: boolean;
    error?: string;
};

export default function ChannelGrid({
    channels,
    onChannelClick,
    maxChannels = 8,
    loading = false,
    error
}: ChannelGridProps) {

    if (loading) {
        return (
            <section className="bg-[#191919] py-4 px-8">
                <div className="grid grid-cols-8 gap-4">
                    {Array.from({ length: maxChannels }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse" />
                            <div className="w-16 h-3 bg-gray-700 rounded mt-1 animate-pulse" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-[#191919] py-4 px-8">
                <div className="text-red-500 text-center">
                    შეცდომა: {error}
                </div>
            </section>
        );
    }

    if (!channels || channels.length === 0) {
        return (
            <section className="bg-[#191919] py-4 px-8">
                <div className="text-white text-center">არ მოიძებნა არხები</div>
            </section>
        );
    }

    const displayChannels = channels.slice(0, maxChannels);

    return (
        <section className="bg-[#191919] py-4 px-8">
            <div className="grid grid-cols-8 gap-4">
                {displayChannels.map((channel) => (
                    <ChannelItem
                        key={channel.id}
                        channel={channel}
                        onClick={() => onChannelClick?.(channel)}
                    />
                ))}
            </div>
        </section>
    );
}


const ChannelItem = React.memo(function ChannelItem({
    channel,
    onClick
}: {
    channel: Channel;
    onClick: () => void;
}) {
    const logoUrl = channel.logo?.url;
    const channelInitials = channel.name.substring(0, 2).toUpperCase();

    return (
        <div
            className="flex flex-col items-center cursor-pointer group"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            aria-label={`Select ${channel.name} channel`}
        >
            <div
                className={`
          w-12 h-12 rounded-full flex items-center justify-center overflow-hidden 
          transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg
          ${channel.active ? "bg-[#db1d27] ring-2 ring-red-300" : "bg-gray-700 group-hover:bg-gray-600"}
        `}
            >
                {logoUrl ? (
                    <img
                        src={logoUrl}
                        alt={`${channel.name} logo`}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                            const target = e.currentTarget;
                            const parent = target.parentElement;
                            if (parent) {
                                target.style.display = 'none';
                                parent.innerHTML = `<span class="text-white text-xs font-bold">${channelInitials}</span>`;
                            }
                        }}
                        loading="lazy"
                    />
                ) : (
                    <span className="text-white text-xs font-bold">
                        {channelInitials}
                    </span>
                )}
            </div>
            <span className="text-white text-xs mt-1 text-center truncate w-full group-hover:text-gray-300 transition-colors">
                {channel.name}
            </span>
        </div>
    );
});
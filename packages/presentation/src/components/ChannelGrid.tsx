import React from 'react';

export type Channel = {
    id: string;
    name: string;
    logo?: string;
    active?: boolean;
};

export type ChannelGridProps = {
    channels: Channel[];
    onChannelClick?: (channel: Channel) => void;
};

export default function ChannelGrid({ channels, onChannelClick }: ChannelGridProps) {
    return (
        <section className="bg-[#191919] py-4 px-8">
            <div className="grid grid-cols-8 gap-4">
                {channels.map((channel) => (
                    <div
                        key={channel.id}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => onChannelClick?.(channel)}
                    >
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${channel.active ? "bg-[#db1d27]" : "bg-gray-700"
                                }`}
                        >
                            <span className="text-white text-xs font-bold">
                                {channel.logo || channel.name.substring(0, 2)}
                            </span>
                        </div>
                        <span className="text-white text-xs mt-1">{channel.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
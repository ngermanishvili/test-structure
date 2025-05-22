// ===============================================
// packages/presentation/src/components/HeroSection.tsx - REPLACE ENTIRE FILE
// ===============================================

import React from 'react';
import { ThumbsUp, ThumbsDown, Volume2 } from 'lucide-react';
import type { Channel } from '@myvideo/domain';

export type HeroSectionProps = {
    channelInfo: Channel; // ✅ Use unified Channel type
    liveInfo: {
        time: string;
        date: string;
        isLive: boolean;
    };
    description: string;
    backgroundImage?: string;
    onSubscribe?: () => void;
    onLike?: () => void;
    onDislike?: () => void;
    onVolumeToggle?: () => void;
};

export default function HeroSection({
    channelInfo,
    liveInfo,
    description,
    backgroundImage,
    onSubscribe,
    onLike,
    onDislike,
    onVolumeToggle
}: HeroSectionProps) {
    // ✅ Handle new Channel logo structure
    const logoDisplay = channelInfo.logo?.url ? (
        <img
            src={channelInfo.logo.url}
            alt={`${channelInfo.name} logo`}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
                // Fallback to initials on error
                const target = e.currentTarget;
                const parent = target.parentElement;
                if (parent) {
                    const initials = channelInfo.name.substring(0, 2).toUpperCase();
                    target.style.display = 'none';
                    parent.innerHTML = `<span class="text-white font-bold text-xs">${initials}</span>`;
                }
            }}
        />
    ) : (
        <span className="text-white font-bold text-xs">
            {channelInfo.name.substring(0, 2).toUpperCase()}
        </span>
    );

    return (
        <section className="relative h-[400px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#191919] to-transparent z-10"></div>
            {backgroundImage && (
                <img
                    src={backgroundImage}
                    alt="Hero background"
                    className="object-cover w-full h-full"
                />
            )}

            {/* Channel Info */}
            <div className="absolute top-6 left-6 flex items-center space-x-3 z-20">
                <div className="bg-[#db1d27] rounded-full p-1 w-12 h-12 flex items-center justify-center">
                    {logoDisplay}
                </div>
                <div>
                    <h2 className="text-white font-bold">{channelInfo.name}</h2>
                    <div className="flex items-center text-gray-300 text-xs space-x-2">
                        {channelInfo.views && (
                            <>
                                <span>{channelInfo.views} ნახვა</span>
                                <span>•</span>
                            </>
                        )}
                        {channelInfo.duration && (
                            <>
                                <span>{channelInfo.duration} წუთი</span>
                                <span>•</span>
                            </>
                        )}
                        {channelInfo.subscribers && (
                            <span>{channelInfo.subscribers} გამომწერი</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Live Info */}
            <div className="absolute top-6 right-6 flex items-center space-x-3 z-20">
                <div className="flex items-center space-x-2">
                    <span className="text-white text-sm">{liveInfo.time}</span>
                    {liveInfo.isLive && (
                        <div className="bg-[#db1d27] text-white text-xs px-2 py-0.5 rounded">LIVE</div>
                    )}
                    <span className="text-white text-sm">{liveInfo.date}</span>
                </div>
            </div>

            {/* Description */}
            <div className="absolute bottom-16 left-6 max-w-xl z-20">
                <p className="text-white text-sm mb-4">{description}</p>
                <div className="flex items-center space-x-2">
                    <button
                        className="text-xs bg-white text-black hover:bg-gray-100 px-3 py-1 rounded transition-colors"
                        onClick={onSubscribe}
                    >
                        გამოწერა
                    </button>
                    <button
                        className="p-2 hover:bg-white/10 rounded transition-colors"
                        onClick={onLike}
                        aria-label="Like video"
                    >
                        <ThumbsUp className="h-4 w-4 text-white" />
                    </button>
                    <button
                        className="p-2 hover:bg-white/10 rounded transition-colors"
                        onClick={onDislike}
                        aria-label="Dislike video"
                    >
                        <ThumbsDown className="h-4 w-4 text-white" />
                    </button>
                </div>
            </div>

            {/* Volume Control */}
            <div className="absolute bottom-6 right-6 z-20">
                <button
                    className="text-white p-2 hover:bg-white/10 rounded transition-colors"
                    onClick={onVolumeToggle}
                    aria-label="Toggle volume"
                >
                    <Volume2 className="h-5 w-5" />
                </button>
            </div>
        </section>
    );
}
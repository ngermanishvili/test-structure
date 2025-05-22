'use client';
import React from 'react';
import type { HomeViewModel } from '@myvideo/domain/src/types';
import {
    HeroSection,
    ChannelGrid,
    VideoGrid,
    type Channel,
    type VideoItem
} from '@myvideo/presentation';

export default function HomeDashboard({ data }: { data: HomeViewModel }) {
    const handleChannelClick = (channel: Channel) => {
        console.log('Channel clicked:', channel);
    };

    const handleVideoClick = (video: VideoItem) => {
        console.log('Video clicked:', video);
    };

    const handleSubscribe = () => {
        console.log('Subscribe clicked');
    };

    const handleLike = () => {
        console.log('Like clicked');
    };

    const handleDislike = () => {
        console.log('Dislike clicked');
    };

    const handleVolumeToggle = () => {
        console.log('Volume toggled');
    };

    return (
        <div className="min-h-screen bg-white">
            <HeroSection
                channelInfo={data.heroSection.channelInfo}
                liveInfo={data.heroSection.liveInfo}
                description={data.heroSection.description}
                backgroundImage={data.heroSection.backgroundImage}
                onSubscribe={handleSubscribe}
                onLike={handleLike}
                onDislike={handleDislike}
                onVolumeToggle={handleVolumeToggle}
            />

            <ChannelGrid
                channels={data.channels}
                onChannelClick={handleChannelClick}
            />

            <VideoGrid
                title="ახალი ეფირები"
                videos={data.newBroadcasts}
                onVideoClick={handleVideoClick}
            />

            <VideoGrid
                title={data.channelVideos.channelName}
                videos={data.channelVideos.videos}
                onVideoClick={handleVideoClick}
                showChannelIcon={true}
            />
        </div>
    );
}
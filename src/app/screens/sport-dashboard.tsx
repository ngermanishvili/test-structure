'use client';
import React from 'react';
import type { SportViewModel } from '@myvideo/domain/src/types';
import { ChannelGrid, VideoGrid, type Channel, type VideoItem } from '@myvideo/presentation';

export default function SportDashboard({ data }: { data: SportViewModel }) {
    const handleChannelClick = (channel: Channel) => {
        console.log('Channel clicked:', channel);
    };

    const handleVideoClick = (video: VideoItem) => {
        console.log('Video clicked:', video);
    };

    return (
        <div className="min-h-screen bg-white">
            <div
                className="w-full h-96 flex items-center justify-center relative"
                style={{
                    backgroundColor: data.heroSection.backgroundColor || '#1e40af',
                    backgroundImage: data.heroSection.backgroundImage ? `url(${data.heroSection.backgroundImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative text-center text-white z-10">
                    <h1 className="text-4xl font-bold mb-4">{data.heroSection.title}</h1>
                    <p className="text-xl">{data.heroSection.subtitle}</p>
                </div>
            </div>

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
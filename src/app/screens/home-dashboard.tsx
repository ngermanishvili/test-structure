'use client';
import React from 'react';
import type { HomeViewModel, Channel, Video } from '@myvideo/domain';
import {
    HeroSection,
    ChannelGrid,
    VideoGrid,
} from '@myvideo/presentation';

export default function HomeDashboard({ data }: { data: HomeViewModel }) {

    const handleChannelClick = (channel: Channel) => {
        console.log('Channel clicked:', channel);
    };

    const handleVideoClick = (video: Video) => {
        console.log('Video clicked:', video);
    };

    return (
        <div className="min-h-screen bg-white">
            <HeroSection
                channelInfo={data.heroSection.channelInfo}
                liveInfo={data.heroSection.liveInfo}
                description={data.heroSection.description}
                backgroundImage={data.heroSection.backgroundImage}
                onSubscribe={() => console.log('Subscribe clicked')}
                onLike={() => console.log('Like clicked')}
                onDislike={() => console.log('Dislike clicked')}
                onVolumeToggle={() => console.log('Volume toggled')}
            />
            <ChannelGrid
                channels={data.channels}
                onChannelClick={handleChannelClick}
                maxChannels={8}
            />
            {data.featuredVideos.length > 0 && (
                <VideoGrid
                    title="რჩეული ვიდეოები"
                    videos={data.featuredVideos}
                    onVideoClick={handleVideoClick}
                />
            )}
        </div>
    );
}
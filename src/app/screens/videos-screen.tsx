'use client';
import React from 'react';
import type { VideosViewModel, UserChannel } from '@myvideo/domain';
import { UserChannelGrid, VideoGrid } from '@myvideo/presentation';

export default function VideosScreen({ data }: { data: VideosViewModel }) {

    const handleChannelClick = (channel: UserChannel) => {
        console.log('User channel clicked:', channel);
        // TODO: Navigate to user channel page
    };

    return (
        <div className="min-h-screen bg-white">
            {data.featuredVideos.length > 0 && (
                <VideoGrid
                    title="რჩეული ვიდეოები"
                    videos={data.featuredVideos}
                />
            )}
            <UserChannelGrid
                title="პოპულარული მომხმარებლების არხები"
                userChannels={data.popularUserChannels}
                onChannelClick={handleChannelClick}
                maxChannels={9}
            />

        </div>
    );
}
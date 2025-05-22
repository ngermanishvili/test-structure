import React from 'react';

export type VideoItem = {
    id: string;
    title: string;
    thumbnail: string;
    duration?: string;
    views?: string;
    publishedAt?: string;
    isLive?: boolean;
};

export type VideoGridProps = {
    title: string;
    videos: VideoItem[];
    onVideoClick?: (video: VideoItem) => void;
    showChannelIcon?: boolean;
    channelName?: string;
};

export default function VideoGrid({
    title,
    videos,
    onVideoClick,
    showChannelIcon,
    channelName
}: VideoGridProps) {
    return (
        <section className="py-6 px-8">
            <div className="flex items-center mb-4">
                {showChannelIcon && (
                    <div className="bg-[#db1d27] rounded-full p-1 w-10 h-10 flex items-center justify-center mr-2">
                        <span className="text-white font-bold text-xs">TV</span>
                    </div>
                )}
                <h2 className="text-black text-xl">{title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="space-y-2 cursor-pointer"
                        onClick={() => onVideoClick?.(video)}
                    >
                        <div className="relative rounded-md overflow-hidden">
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-[250px]"
                            />

                            {video.isLive && (
                                <div className="absolute top-2 right-2 bg-[#db1d27] text-white text-xs px-2 py-0.5 rounded">
                                    LIVE
                                </div>
                            )}

                            {video.duration && (
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                                    {video.duration}
                                </div>
                            )}

                            {!video.duration && !video.views && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                                    <p className="text-white text-xs">სამაუწყებლო დასახელება</p>
                                </div>
                            )}
                        </div>

                        {(video.views || video.publishedAt) && (
                            <>
                                <h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
                                <div className="flex text-gray-500 text-xs space-x-2">
                                    {video.views && <span>{video.views}</span>}
                                    {video.views && video.publishedAt && <span>•</span>}
                                    {video.publishedAt && <span>{video.publishedAt}</span>}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

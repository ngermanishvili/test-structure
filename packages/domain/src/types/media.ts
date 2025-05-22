export type VideoThumbnail = {
    id: string;
    title: string;
    thumbnailUrl: string;
    views: number;
    publishedAt: string;
    channelName?: string;
    duration?: number;
};

export type Channel = {
    id: string;
    name: string;
    avatarUrl: string;
    subscriberCount?: number;
};

export type VideoMetadata = {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    duration: number;
    views: number;
    likes: number;
    publishedAt: string;
    channel: Channel;
};
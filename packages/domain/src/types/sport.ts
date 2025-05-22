export type SportChannel = {
    id: string;
    name: string;
    logo?: string;
    active?: boolean;
};

export type SportVideo = {
    id: string;
    title: string;
    thumbnail: string;
    duration?: string;
    views?: string;
    publishedAt?: string;
    isLive?: boolean;
};

export type SportViewModel = {
    type: 'sport';
    navigation: Array<{ label: string; href?: string; active?: boolean }>;
    heroSection: {
        title: string;
        subtitle: string;
        backgroundImage?: string;
        backgroundColor?: string;
    };
    channels: SportChannel[];
    newBroadcasts: SportVideo[];
    channelVideos: {
        channelName: string;
        videos: SportVideo[];
    };
};
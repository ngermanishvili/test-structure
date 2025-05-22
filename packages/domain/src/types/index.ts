
export type HomeViewModel = {
    type: 'home';
    navigation: Array<{ label: string; href?: string; active?: boolean }>;
    heroSection: {
        channelInfo: {
            id: string;
            name: string;
            logo?: string;
            active?: boolean;
            views?: string;
            duration?: string;
            subscribers?: string;
        };
        liveInfo: {
            time: string;
            date: string;
            isLive: boolean;
        };
        description: string;
        backgroundImage?: string;
    };
    channels: Array<{
        id: string;
        name: string;
        logo?: string;
        active?: boolean;
        views?: string;
        duration?: string;
        subscribers?: string;
    }>;
    newBroadcasts: Array<{
        id: string;
        title: string;
        thumbnail: string;
        isLive?: boolean;
    }>;
    channelVideos: {
        channelName: string;
        videos: Array<{
            id: string;
            title: string;
            thumbnail: string;
            duration?: string;
            views?: string;
            publishedAt?: string;
        }>;
    };
};

export type VideoViewModel = {
    type: 'video';
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    duration: number;
    views: number;
    likes: number;
    publishedAt: string;
    channel: {
        id: string;
        name: string;
        avatarUrl: string;
    };
    relatedVideos: Array<{
        id: string;
        title: string;
        thumbnailUrl: string;
        duration: number;
        views: number;
        publishedAt: string;
        channelName: string;
    }>;
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
    channels: Array<{
        id: string;
        name: string;
        logo?: string;
        active?: boolean;
    }>;
    newBroadcasts: Array<{
        id: string;
        title: string;
        thumbnail: string;
        duration?: string;
        views?: string;
        publishedAt?: string;
        isLive?: boolean;
    }>;
    channelVideos: {
        channelName: string;
        videos: Array<{
            id: string;
            title: string;
            thumbnail: string;
            duration?: string;
            views?: string;
            publishedAt?: string;
            isLive?: boolean;
        }>;
    };
};

export type NotFoundViewModel = {
    type: 'not_found';
};

export type ViewModel = HomeViewModel | VideoViewModel | SportViewModel | NotFoundViewModel;
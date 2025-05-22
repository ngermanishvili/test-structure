export type Channel = {
    id: string;
    name: string;
    logo?: {
        url?: string;
    };
    views?: string;
    duration?: string;
    subscribers?: string;
    active?: boolean;
};

export type Video = {
    id: string;
    title: string;
    thumbnail: string;
    duration?: string;
    views?: string;
    publishedAt?: string;
    isLive?: boolean;
};

export type UserChannel = {
    id: string;
    name: string;
    cover?: string;
    subscribers: number;
    videos: number;
    views: number;
    url: string;
    description?: string;
};

// ✅ NAVIGATION TYPE
export type NavItem = {
    label: string;
    href?: string;
    active?: boolean;
};

export type DashboardSectionType = 'tvChannels' | 'featuredVideos' | 'popularUserChannels';

export type DashboardSection = {
    id: string;
    type: 'DashboardSection';
    attributes: {
        data_template: DashboardSectionType;
        data_type: 'tv_channel' | 'video' | 'user_channel';
        title: string;
        items_to_display?: number;
    };
    relationships?: {
        items?: {
            data: any[];
        };
    };
};

export type HeroSection = {
    channelInfo: Channel;
    liveInfo: {
        time: string;
        date: string;
        isLive: boolean;
    };
    description: string;
    backgroundImage?: string;
};


export type HomeViewModel = {
    type: 'home';
    navigation: NavItem[];
    heroSection: HeroSection;
    channels: Channel[];           // tvChannels section
    featuredVideos: Video[];       // featuredVideos section
};

export type VideosViewModel = {
    type: 'videos';
    navigation: NavItem[];
    channels: Channel[];
    featuredVideos: Video[];
    popularUserChannels: UserChannel[];
};

// ✅ NOT FOUND (fallback)
export type NotFoundViewModel = {
    type: 'not_found';
};

// ✅ MAIN VIEW MODEL (3 type ახლა)
export type ViewModel = HomeViewModel | VideosViewModel | NotFoundViewModel;
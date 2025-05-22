import {
    ViewModel,
    HomeViewModel,
    VideosViewModel,
    Channel,
    Video,
    UserChannel,
} from './types';

export function resolveViewModel(data: any): ViewModel {
    if (!data) {
        return { type: 'not_found' };
    }

    switch (data.type) {
        case 'home':
            return transformHomeData(data);
        case 'videos':
            return transformVideosData(data);
        default:
            return { type: 'not_found' };
    }
}

function extractChannels(dashboardData: any[]): Channel[] {
    const tvChannelsSection = dashboardData.find((section: any) =>
        section.type === 'DashboardSection' &&
        section.attributes?.data_template === 'tvChannels'
    );

    if (!tvChannelsSection?.relationships?.items?.data) {
        return [];
    }

    return tvChannelsSection.relationships.items.data
        .filter((item: any) => item?.type === 'Channel')
        .map((item: any, index: number) => {
            const logoUrl = item.relationships?.logo?.data?.relationships?.sizes?.data?.["100x100"]?.attributes?.url ||
                item.relationships?.logo?.data?.relationships?.sizes?.data?.["100x80"]?.attributes?.url ||
                item.relationships?.logo?.data?.relationships?.sizes?.data?.original?.attributes?.url;

            return {
                id: item.id,
                name: item.attributes?.name || 'Unknown Channel',
                logo: logoUrl ? { url: logoUrl } : undefined,
                active: index === 0
            };
        });
}

function extractFeaturedVideos(dashboardData: any[]): Video[] {
    const featuredVideosSection = dashboardData.find((section: any) =>
        section.type === 'DashboardSection' &&
        section.attributes?.data_template === 'featuredVideos'
    );

    if (!featuredVideosSection?.relationships?.items?.data) {
        return [];
    }

    return featuredVideosSection.relationships.items.data
        .filter((item: any) => item?.type === 'Video')
        .map((item: any) => {
            const thumbnailUrl = item.attributes?.thumb
                ? `https://thumbs01.myvideo.ge/430/${item.attributes.thumb}`
                : '/placeholder.svg?height=250&width=220';


            const duration = item.attributes?.duration
                ? formatVideoDuration(item.attributes.duration)
                : undefined;


            const views = item.attributes?.views
                ? formatViewsCount(item.attributes.views)
                : undefined;


            const publishedAt = item.attributes?.uploadDate
                ? formatUploadDate(item.attributes.uploadDate)
                : undefined;

            return {
                id: item.id,
                title: item.attributes?.title || 'Unknown Video',
                thumbnail: thumbnailUrl,
                duration,
                views,
                publishedAt,
                isLive: false
            };
        });
}

function extractPopularUserChannels(dashboardData: any[]): UserChannel[] {
    const userChannelsSection = dashboardData.find((section: any) =>
        section.type === 'DashboardSection' &&
        section.attributes?.data_template === 'popularUserChannels'
    );

    if (!userChannelsSection?.relationships?.items?.data) {
        return [];
    }

    return userChannelsSection.relationships.items.data
        .filter((item: any) => item?.type === 'UserChannel')
        .map((item: any) => ({
            id: item.id,
            name: item.attributes?.name || 'Unknown Channel',
            cover: item.attributes?.cover || '',
            subscribers: item.attributes?.subscribers || 0,
            videos: item.attributes?.videos || 0,
            views: item.attributes?.views || 0,
            url: item.attributes?.url || '',
            description: item.attributes?.description || ''
        }));
}

function formatVideoDuration(duration: number): string {
    if (!duration || duration <= 0) return '0:00';

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatViewsCount(views: number): string {
    if (!views || views <= 0) return '0 ნახვა';

    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M ნახვა`;
    } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K ნახვა`;
    }

    return `${views} ნახვა`;
}

function formatUploadDate(uploadDate: string): string {
    if (!uploadDate) return '';

    try {
        const date = new Date(uploadDate);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffHours < 24) {
            return `${diffHours} საათის წინ`;
        } else if (diffDays === 1) {
            return 'გუშინ';
        } else if (diffDays < 7) {
            return `${diffDays} დღის წინ`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} კვირის წინ`;
        } else {
            const months = Math.floor(diffDays / 30);
            return `${months} თვის წინ`;
        }
    } catch (error) {
        return '';
    }
}


function transformHomeData(data: any): HomeViewModel {
    let channels: Channel[] = [];
    let featuredVideos: Video[] = [];

    if (data.realApiData?.data && Array.isArray(data.realApiData.data)) {
        channels = extractChannels(data.realApiData.data);
        featuredVideos = extractFeaturedVideos(data.realApiData.data);
    }

    return {
        type: 'home',
        navigation: [
            { label: 'მთავარი', href: '/', active: true },
            { label: 'ვიდეოები', href: '/videos', active: false },
            { label: 'სპორტი', href: '/sport', active: false },
        ],
        heroSection: {
            channelInfo: channels[0] || {
                id: 'unknown',
                name: 'Unknown Channel',
                active: false
            },
            liveInfo: {
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString(),
                isLive: true
            },
            description: `${channels.length} channels • ${featuredVideos.length} featured videos`,
            backgroundImage: channels[0]?.logo?.url
        },
        channels,
        featuredVideos
    };
}

function transformVideosData(data: any): VideosViewModel {
    let channels: Channel[] = [];
    let featuredVideos: Video[] = [];
    let popularUserChannels: UserChannel[] = [];

    if (data.realApiData?.data && Array.isArray(data.realApiData.data)) {
        channels = extractChannels(data.realApiData.data);
        featuredVideos = extractFeaturedVideos(data.realApiData.data);
        popularUserChannels = extractPopularUserChannels(data.realApiData.data);
    }

    return {
        type: 'videos',
        navigation: [
            { label: 'მთავარი', href: '/', active: false },
            { label: 'ვიდეოები', href: '/videos', active: true },
            { label: 'სპორტი', href: '/sport', active: false },
        ],
        channels,
        featuredVideos,
        popularUserChannels
    };
}
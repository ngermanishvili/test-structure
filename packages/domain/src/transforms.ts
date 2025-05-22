import {
    ViewModel,
    HomeViewModel,
    SportViewModel,
} from './types';

export function resolveViewModel(data: any): ViewModel {
    if (!data) {
        return { type: 'not_found' };
    }

    switch (data.type) {
        case 'home':
            return transformHomeData(data);
        case 'sport':
            return transformSportData(data);
        default:
            return { type: 'not_found' };
    }
}

function transformHomeData(data: any): HomeViewModel {
    return {
        type: 'home',
        navigation: data.navigation || [],
        heroSection: {
            channelInfo: data.heroSection?.channelInfo || {
                id: 'unknown',
                name: 'Unknown Channel',
                logo: 'TV',
                active: false
            },
            liveInfo: data.heroSection?.liveInfo || {
                time: '00:00',
                date: '00/00',
                isLive: false
            },
            description: data.heroSection?.description || 'No description available',
            backgroundImage: data.heroSection?.backgroundImage
        },
        channels: data.channels || [],
        newBroadcasts: data.newBroadcasts || [],
        channelVideos: {
            channelName: data.channelVideos?.channelName || 'Unknown Channel',
            videos: data.channelVideos?.videos || []
        }
    };
}

function transformSportData(data: any): SportViewModel {
    return {
        type: 'sport',
        navigation: data.navigation || [],
        heroSection: {
            title: data.heroSection?.title || 'სპორტი',
            subtitle: data.heroSection?.subtitle || 'სპორტული კონტენტი',
            backgroundImage: data.heroSection?.backgroundImage,
            backgroundColor: data.heroSection?.backgroundColor || '#1e40af'
        },
        channels: data.channels || [],
        newBroadcasts: data.newBroadcasts || [],
        channelVideos: {
            channelName: data.channelVideos?.channelName || 'Unknown Channel',
            videos: data.channelVideos?.videos || []
        }
    };
}



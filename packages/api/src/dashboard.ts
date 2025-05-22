import { myVideoApiClient } from './myvideo-client';

export interface DashboardApiResponse {
    data: Array<{
        type: string;
        id: string;
        attributes?: {
            data_template?: string;
            data_type?: string;
            title?: string;
            items_to_display?: number;
        };
        relationships?: {
            items?: {
                data: any[];
            };
        };
    }>;
}

let dashboardCache: {
    data: DashboardApiResponse | null;
    timestamp: number;
} = {
    data: null,
    timestamp: 0
};

const CACHE_DURATION = 5 * 60 * 1000;

export async function fetchDashboard(token?: string): Promise<DashboardApiResponse | null> {
    const startTime = performance.now();

    const now = Date.now();
    if (dashboardCache.data && (now - dashboardCache.timestamp) < CACHE_DURATION) {
        console.log('💾 Using cached dashboard data');
        return dashboardCache.data;
    }

    try {
        if (token) {
            myVideoApiClient.setToken(token);
        }

        console.log('🚀 Starting dashboard API call...');
        const response = await myVideoApiClient.get<DashboardApiResponse>('/dashboard/mobile/main');
        const endTime = performance.now();
        if (!response?.data || !Array.isArray(response.data)) {
            console.warn('❌ Invalid dashboard response structure');
            return null;
        }

        const optimizedResponse: DashboardApiResponse = {
            data: response.data.map(section => {
                if (!section.relationships?.items?.data) return section;
                let maxItems = 8;
                switch (section.attributes?.data_template) {
                    case 'tvChannels':
                        maxItems = 8;
                        break;
                    case 'featuredVideos':
                        maxItems = 6;
                        break;
                    case 'popularUserChannels':
                        maxItems = 4;
                        break;
                    case 'lastUploadedVideosMain':
                        maxItems = 4;
                        break;
                }

                return {
                    ...section,
                    relationships: {
                        ...section.relationships,
                        items: {
                            data: section.relationships.items.data.slice(0, maxItems)
                        }
                    }
                };
            })
        };

        const originalSize = JSON.stringify(response).length;
        const optimizedSize = JSON.stringify(optimizedResponse).length;

        console.log(`📊 Original size: ${(originalSize / 1024).toFixed(2)} KB`);
        console.log(`📊 Optimized size: ${(optimizedSize / 1024).toFixed(2)} KB`);
        console.log(`🎯 Size reduction: ${(((originalSize - optimizedSize) / originalSize) * 100).toFixed(1)}%`);

        optimizedResponse.data.forEach((section, index) => {
            const itemsCount = section.relationships?.items?.data?.length || 0;
            console.log(`📋 Section ${index}: ${section.attributes?.data_template} (${itemsCount} items)`);
        });

        dashboardCache = {
            data: optimizedResponse,
            timestamp: now
        };

        return optimizedResponse;

    } catch (error) {
        const endTime = performance.now();
        return null;
    }
}

export function clearDashboardCache() {
    dashboardCache = { data: null, timestamp: 0 };
}

export function getMockDashboardData() {
    console.log('📝 Returning mock dashboard data (instant)');
    return {
        type: 'home',
        navigation: [
            { label: 'მთავარი', href: '/', active: true },
            { label: 'სპორტი', href: '/sport', active: false },
            { label: 'კინო', href: '/movies', active: false },
        ],
        heroSection: {
            channelInfo: { id: '1', name: 'TV პირველი', active: true },
            liveInfo: {
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString(),
                isLive: true
            },
            description: 'Live broadcast from MyVideo'
        },
        channels: [
            { id: '1', name: 'TV პირველი', active: true },
            { id: '2', name: 'იმედი', active: false },
            { id: '3', name: 'DISCOVER', active: false },
            { id: '4', name: 'GDS', active: false },
            { id: '5', name: 'კავკასია', active: false },
            { id: '6', name: 'აჭარა TV', active: false },
            { id: '7', name: 'ტელე', active: false },
            { id: '8', name: 'იმედი 2', active: false },
        ],
        featuredVideos: []
    };
}
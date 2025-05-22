// Analytics wrapper for tracking events

type EventData = Record<string, any>;

class Analytics {
    private static instance: Analytics;
    private isInitialized = false;

    private constructor() {
        // Private constructor to enforce singleton
    }

    public static getInstance(): Analytics {
        if (!Analytics.instance) {
            Analytics.instance = new Analytics();
        }
        return Analytics.instance;
    }

    public init(): void {
        // In a real implementation, this would initialize the analytics provider
        console.log('Analytics initialized');
        this.isInitialized = true;
    }

    public trackPageView(path: string, title?: string): void {
        if (!this.isInitialized) {
            console.warn('Analytics not initialized');
            return;
        }

        console.log(`Page view: ${path}${title ? ` (${title})` : ''}`);
        // In a real implementation, this would call the analytics provider's page tracking method
    }

    public trackEvent(eventName: string, data?: EventData): void {
        if (!this.isInitialized) {
            console.warn('Analytics not initialized');
            return;
        }

        console.log(`Event: ${eventName}`, data);
        // In a real implementation, this would call the analytics provider's event tracking method
    }
}

export const analytics = Analytics.getInstance();

// Event tracking helper functions
export function trackVideoView(videoId: string, title: string): void {
    analytics.trackEvent('video_view', { videoId, title });
}

export function trackVideoProgress(videoId: string, progress: number): void {
    analytics.trackEvent('video_progress', { videoId, progress });
}

export function trackSearch(query: string, resultCount: number): void {
    analytics.trackEvent('search', { query, resultCount });
}
export function generateThumbnailUrl(videoId: string, thumb: string): string {
    if (!thumb || !videoId) {
        return '/placeholder.svg?height=250&width=220';
    }

    const baseUrl = 'https://thumbs01.myvideo.ge/430/';

    const filename = thumb.includes('/') ? thumb.split('/').pop() : thumb;

    return `${baseUrl}${filename}`;
}

export function generateVideoUrl(videoId: string, temporary?: string): string {
    if (!videoId) return '';
    return `https://stream.myvideo.ge/video/${videoId}`;
}

export function formatVideoDuration(duration: number): string {
    if (!duration || duration <= 0) return '0:00';

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


export function formatViewsCount(views: number): string {
    if (!views || views <= 0) return '0 ნახვა';

    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M ნახვა`;
    } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K ნახვა`;
    }

    return `${views} ნახვა`;
}

export function formatUploadDate(uploadDate: string): string {
    if (!uploadDate) return '';

    try {
        const date = new Date(uploadDate);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffMinutes < 60) {
            return `${diffMinutes} წუთის წინ`;
        } else if (diffHours < 24) {
            return `${diffHours} საათის წინ`;
        } else if (diffDays === 1) {
            return 'გუშინ';
        } else if (diffDays < 7) {
            return `${diffDays} დღის წინ`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} კვირის წინ`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} თვის წინ`;
        } else {
            const years = Math.floor(diffDays / 365);
            return `${years} წლის წინ`;
        }
    } catch (error) {
        console.error('Error formatting upload date:', error);
        return '';
    }
}
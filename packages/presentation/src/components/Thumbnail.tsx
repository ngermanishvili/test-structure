import React from 'react';
import Image from 'next/image';

type ThumbnailProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
};

export default function Thumbnail({
    src,
    alt,
    width = 320,
    height = 180,
    className = '',
}: ThumbnailProps) {
    return (
        <div className={`relative overflow-hidden rounded ${className}`}>
            {/* Placeholder for when image is loading */}
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />

            {/* Actual image */}
            <div className="relative w-full h-full">
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Play button overlay for video thumbnails */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="bg-black bg-opacity-40 rounded-full p-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
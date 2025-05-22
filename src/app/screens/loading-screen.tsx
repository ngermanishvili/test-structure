import React from 'react';

export default function LoadingScreen() {
    return (
        <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <h2 className="text-xl font-medium text-gray-700">Loading...</h2>
            </div>
        </div>
    );
}
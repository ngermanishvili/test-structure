import React from 'react';
import Link from 'next/link';

export default function NotFoundScreen({ error }: { error?: Error }) {
    return (
        <div className="container mx-auto p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="mb-6">The page you are looking for does not exist.</p>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 text-left">
                    <h2 className="text-xl font-semibold text-red-700 mb-2">Error details:</h2>
                    <p className="text-red-600">{error.message}</p>
                </div>
            )}

            <Link href="/" className="text-blue-600 hover:underline">
                Return to Home
            </Link>
        </div>
    );
}
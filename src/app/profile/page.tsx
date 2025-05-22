'use client';
import { AuthGuard, useAuth } from '@myvideo/authenticator/client';

export default function ProfilePage() {
    return (
        <div className="container mx-auto py-8">
            <AuthGuard>
                <ProfileContent />
            </AuthGuard>
        </div>
    );
}

function ProfileContent() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">მომხმარებლის პროფილი</h1>

            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">ID: {user.id}</p>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <button
                        onClick={() => logout()}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        ანგარიშიდან გასვლა
                    </button>
                </div>
            </div>
        </div>
    );
}